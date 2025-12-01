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
  "departments": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
  "priority": "NORMAL | LOW | MEDIUM | HIGH",
  "deadlines": "string or 'Not applicable'",
  "document_category": "policy | procedure | request | report | directive | general",
  "short_summary": "2-3 sentence summary",
  "detailed_summary": ["bullet list of key points"],
  "key_entities": ["important names, dates, or organizations"]
}
Rules:
- Strict JSON only
- The 'department_ids' field MUST contain an array of integers (IDs) based ONLY on the relevance to the departments listed below.
- Do NOT use department names, ONLY the integer ID(s).
- Set realistic priority based on tone and urgency.
- Be concise but accurate.

Department List (Use ONLY these IDs):
0: Global Headquarters
1: Metro Operations
2: Rolling Stock (Maintenance)
3: Signaling & Telecom (S&T)
4: Civil Engineering
5: Electrical (Traction)
6: Human Resources (HR)
7: Finance & Accounts
8: IT & Systems
9: Safety & Security
10: Customer Service
`;
}
