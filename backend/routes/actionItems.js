const express = require("express");
const { generate } = require("../utils/geminiClient");
const {
  actionItemPrompt,
  allowedDepartments,
} = require("../prompts/actionItemPrompts");

const router = express.Router();

function normalizeDepartment(dep) {
  if (!dep) return null;
  // Try to match ignoring case and common synonyms
  const normalized = dep.trim().toLowerCase();
  for (const a of allowedDepartments) {
    if (a.toLowerCase() === normalized) return a;
    // handle quick synonyms
    if (
      a.toLowerCase().includes("engineering") &&
      normalized.includes("engineer")
    )
      return "Engineering";
    if (
      a.toLowerCase().includes("hr") &&
      (normalized.includes("human") || normalized.includes("hr"))
    )
      return "HR";
    if (a.toLowerCase().includes("procure") && normalized.includes("purchase"))
      return "Procurement";
  }
  // last resort: pick first allowed if ambiguous (but better to return null)
  return null;
}

router.post("/", async (req, res) => {
  try {
    const { ocrText } = req.body;
    if (!ocrText) return res.status(400).json({ error: "ocrText is required" });

    // Primary attempt
    const prompt = actionItemPrompt(ocrText);
    let aiText = await generate(prompt);

    // try parse
    let parsed = null;
    try {
      parsed = JSON.parse(aiText);
    } catch (e) {
      // Retry with an even stricter instruction asking ONLY for JSON
      const strictPrompt = `
You previously returned invalid output. AGAIN, return ONLY VALID JSON in exact structure:

{"actionItem": { "description":"...", "deadline":"...", "priority":"High|Medium|Low", "department":"${allowedDepartments.join(
        "|"
      )}" } }

If no explicit actionable is found, create a generic action item such as ‘Review and acknowledge document’ and assign it to Administration with Low priority.

Now analyze this OCR and return ONLY the JSON:
---- OCR ----
${ocrText}
---- END ----
`;
      const retryText = await generate(strictPrompt);
      try {
        parsed = JSON.parse(retryText);
      } catch (err) {
        console.warn("Action item parse failed on retry:", err);
        parsed = null;
      }
    }

    if (!parsed || typeof parsed !== "object") {
      // Fallback: no structured data
      return res.json({ actionItem: null, raw: aiText });
    }

    // If actionItem is null in returned JSON, return it directly
    if (!parsed.actionItem) return res.json({ actionItem: null });

    // Validate & normalize fields
    let item = parsed.actionItem;
    const description = (item.description || "").toString().trim();
    let deadline = (item.deadline || "").toString().trim();
    let priority = (item.priority || "").toString().trim();
    let department = (item.department || "").toString().trim();

    if (!description) {
      // if description empty treat as no action
      return res.json({ actionItem: null });
    }

    if (!deadline) deadline = "Not available";
    // Normalize priority
    const p = priority.toLowerCase();
    if (p.includes("high") || p.includes("urgent") || p.includes("immediate"))
      priority = "High";
    else if (
      p.includes("medium") ||
      p.includes("should") ||
      p.includes("recommended")
    )
      priority = "Medium";
    else priority = "Low";

    // Normalize department to allowed list
    const normDept =
      normalizeDepartment(department) ||
      normalizeDepartment(description) ||
      null;
    const finalDept = normDept || "Administration"; // fallback to Administration to avoid empty
    // If normDept was null but description implies something else, we used fallback.

    const finalItem = {
      description,
      deadline: deadline || "Not available",
      priority,
      department: finalDept,
    };

    res.json({ actionItem: finalItem });
  } catch (err) {
    console.error("Action items error:", err);
    res.status(500).json({ error: "Failed to extract action item" });
  }
});

module.exports = router;
