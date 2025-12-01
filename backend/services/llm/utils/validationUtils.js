import { DEPARTMENTS } from "../../utils.js";

/**
 * Validates, normalizes, and cleans structured LLM output.
 * Ensures consistent schema even if model output is incomplete.
 */
export function validateAndCleanResult(result = {}) {
  const validDepartments = DEPARTMENTS;

  const clean = (v) => (typeof v === "string" ? v.trim() : v);

  return {
    title: clean(result.title) || "Untitled Document",
    purpose: clean(result.purpose) || "Not specified",
    assigned_departments: Array.isArray(result.departments)
      ? result.departments.filter((d) => validDepartments.includes(d))
      : [],
    priority: ["NORMAL", "LOW", "MEDIUM", "HIGH"].includes(
      result.priority?.toLowerCase()
    )
      ? result.priority.toLowerCase()
      : "NORMAL",
    deadlines: clean(result.deadlines) || "Not applicable",
    document_category: clean(result.document_category) || "general",
    short_summary_en: clean(result.short_summary) || "Summary not available.",
    detailed_summary_en: Array.isArray(result.detailed_summary)
      ? result.detailed_summary.map((s) => clean(s))
      : ["Content analysis unavailable."],
    key_entities: Array.isArray(result.key_entities)
      ? result.key_entities.slice(0, 10)
      : [],
  };
}
