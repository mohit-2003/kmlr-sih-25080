/**
 * Builds the structured analysis prompt for the LLM.
 * Keeps prompt consistent and easy to maintain.
 */
export function buildAnalysisPrompt(text) {
  return `
  Analyze the following document and extract structured information.
  Return ONLY a valid JSON object (no markdown, no explanation).
  
  Document Text:
  """
  ${text}
  """
  
  Expected JSON structure:
  {
    "title": "string",
    "purpose": "string",
    "departments": ["Engineering", "HR", "Finance", "Safety", "Legal", "Procurement", "Operations", "IT", "Administration"],
    "priority": "none | low | medium | high | critical",
    "deadlines": "string or 'Not applicable'",
    "document_category": "policy | procedure | request | report | directive | general",
    "short_summary": "2-3 sentence summary",
    "detailed_summary": ["bullet list of key points"],
    "key_entities": ["important names, dates, or organizations"]
  }
  Rules:
  - Strict JSON only
  - Identify actual departments from text
  - Set realistic priority based on tone and urgency
  - Be concise but accurate.
  `;
}
