/**
 * Heuristic fallback analysis when LLM fails or times out.
 * Uses keyword detection and simple rules to infer metadata.
 */
export function getFallbackAnalysis(text, reason = "LLM failure") {
  console.log("📋 Using fallback keyword-based analysis...");

  const lower = text.toLowerCase();
  const wordCount = lower.split(/\s+/).length;

  const deptKeywords = {
    HR: ["employee", "staff", "hiring", "salary", "leave", "hr"],
    Finance: ["budget", "payment", "invoice", "cost", "finance", "money"],
    Engineering: ["design", "technical", "maintenance", "engineering"],
    Legal: ["law", "contract", "agreement", "regulation"],
    Safety: ["safety", "accident", "emergency", "risk"],
    Procurement: ["purchase", "vendor", "supplier", "procurement", "order"],
  };

  const detected = [];
  for (const [dept, keywords] of Object.entries(deptKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) detected.push(dept);
  }

  const urgency = {
    critical: ["urgent", "immediate", "asap", "emergency"],
    high: ["important", "priority", "soon"],
  };

  let priority = "medium";
  if (urgency.critical.some((w) => lower.includes(w))) priority = "critical";
  else if (urgency.high.some((w) => lower.includes(w))) priority = "high";

  return {
    title: "Document Analysis (Fallback)",
    purpose: `Automated fallback analysis due to ${reason}`,
    departments: detected.length ? detected : ["Administration"],
    priority,
    deadlines: "Not applicable",
    document_category: "general",
    short_summary: `Document contains approximately ${wordCount} words. Manual review recommended.`,
    detailed_summary: [
      `Word count: ${wordCount}`,
      "Unable to complete LLM analysis",
      "Fallback keyword-based summary applied",
    ],
    key_entities: [],
  };
}
