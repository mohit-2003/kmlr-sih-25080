const { generate } = require("../utils/geminiClient");
const { DEPARTMENTS } = require("./utils");

async function analyzeDocument(text) {
  try {
    // Create a comprehensive prompt for document analysis
    const prompt = `
Analyze the following document text and extract structured information. Return the response in valid JSON format only, no additional text.

Document Text:
"""
${text}
"""

Please extract and return the following information in this exact JSON structure:

{
  "title": "string - main title or subject of the document",
  "purpose": "string - main purpose (information, request, directive, approval, complaint, etc.)",
  "departments": ["array of relevant departments from this list: Engineering, HR, Finance, Safety, Legal, Procurement, Operations, IT, Administration"],
  "priority": "string - none, low, medium, high, or critical based on urgency and importance",
  "deadlines": "string - any specific dates or deadlines mentioned, or 'Not applicable' if none",
  "document_category": "string - policy, procedure, request, report, directive, etc.",
  "short_summary": "string - 2-3 sentence summary of the document",
  "detailed_summary": ["array of strings - key points in bullet format"],
  "key_entities": ["array of important names, places, amounts, dates, or organizations mentioned"]
}

Rules:
- Only include departments that are actually relevant to the document content
- Be accurate with priority assessment based on language used (urgent, immediate, ASAP = high/critical)
- Extract actual deadlines with specific dates when mentioned
- Keep summaries concise but informative
- Include only the most important entities, not every minor detail
- Return only valid JSON, no markdown formatting or additional text
`;

    console.log("🤖 Sending document to Gemini for analysis...");

    // Get response from Gemini
    const response = await generate(prompt);

    console.log("📝 Received response from Gemini");

    // Parse the JSON response
    let analysisResult;
    try {
      // Clean the response in case there's any extra formatting
      const cleanedResponse = response
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("❌ Failed to parse Gemini response as JSON:", parseError);
      console.log("Raw response:", response);

      // Return fallback structure if parsing fails
      return getFallbackAnalysis(text);
    }

    // Validate and clean the response
    const validatedResult = validateAndCleanResult(analysisResult);

    console.log("✅ Document analysis completed successfully");
    return validatedResult;
  } catch (error) {
    console.error("❌ Gemini analysis error:", error);

    // Return fallback analysis instead of throwing
    return getFallbackAnalysis(text);
  }
}

// Helper function to validate and clean Gemini response
function validateAndCleanResult(result) {
  const validDepartments = DEPARTMENTS;

  return {
    title: result.title || "Untitled Document",
    purpose: result.purpose || "Not specified",
    departments: Array.isArray(result.departments)
      ? result.departments.filter((dept) => validDepartments.includes(dept))
      : ["Administration"], // default department
    priority: ["low", "medium", "high", "critical"].includes(
      result.priority?.toLowerCase()
    )
      ? result.priority.toLowerCase()
      : "medium",
    deadlines: result.deadlines || "Not applicable",
    document_category: result.document_category || "general",
    short_summary: result.short_summary || "Document summary not available",
    detailed_summary: Array.isArray(result.detailed_summary)
      ? result.detailed_summary
      : ["Content analysis not available"],
    key_entities: Array.isArray(result.key_entities)
      ? result.key_entities.slice(0, 10) // limit to 10 entities
      : [],
  };
}

// Fallback analysis when Gemini fails
function getFallbackAnalysis(text) {
  console.log("📋 Using fallback analysis...");

  const words = text.toLowerCase().split(/\s+/);
  const wordCount = words.length;

  // Simple keyword-based department detection
  const departmentKeywords = {
    HR: [
      "employee",
      "staff",
      "hiring",
      "salary",
      "leave",
      "hr",
      "human resource",
    ],
    Finance: [
      "budget",
      "payment",
      "invoice",
      "cost",
      "financial",
      "money",
      "expense",
    ],
    Engineering: [
      "technical",
      "development",
      "system",
      "software",
      "hardware",
      "engineering",
    ],
    Legal: [
      "contract",
      "agreement",
      "legal",
      "compliance",
      "law",
      "regulation",
    ],
    Safety: ["safety", "security", "risk", "hazard", "accident", "emergency"],
    Procurement: [
      "purchase",
      "vendor",
      "supplier",
      "procurement",
      "buying",
      "order",
    ],
  };

  const detectedDepartments = [];
  for (const [dept, keywords] of Object.entries(departmentKeywords)) {
    if (keywords.some((keyword) => text.toLowerCase().includes(keyword))) {
      detectedDepartments.push(dept);
    }
  }

  // Simple priority detection
  let priority = "medium";
  const urgentWords = ["urgent", "immediate", "asap", "critical", "emergency"];
  const highWords = ["important", "priority", "soon", "quickly"];

  if (urgentWords.some((word) => text.toLowerCase().includes(word))) {
    priority = "critical";
  } else if (highWords.some((word) => text.toLowerCase().includes(word))) {
    priority = "high";
  }

  return {
    title: "Document Analysis (Fallback)",
    purpose: "Analysis incomplete",
    departments:
      detectedDepartments.length > 0 ? detectedDepartments : ["Administration"],
    priority: priority,
    deadlines: "Not applicable",
    document_category: "general",
    short_summary: `Document contains approximately ${wordCount} words. Automated analysis was limited.`,
    detailed_summary: [
      `Document length: ${wordCount} words`,
      "Detailed analysis unavailable due to processing limitations",
      "Manual review recommended for complete analysis",
    ],
    key_entities: [],
  };
}

// Function for generating summaries (if you want to use it separately)
async function generateSummary(text, type = "short") {
  try {
    const prompt =
      type === "short"
        ? `Provide a 2-3 sentence summary of this document:\n\n${text}`
        : `Provide a detailed bullet-point summary of this document:\n\n${text}`;

    const summary = await generate(prompt);
    return summary;
  } catch (error) {
    console.error("Summary generation error:", error);
    return type === "short"
      ? "Summary not available"
      : ["Summary not available"];
  }
}

module.exports = {
  analyzeDocument,
  generateSummary,
};
