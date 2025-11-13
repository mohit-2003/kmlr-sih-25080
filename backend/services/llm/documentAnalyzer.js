import { generate } from "./llmAdapter.js";
import { buildAnalysisPrompt } from "./utils/promptBuilder.js";
import { parseLLMResponse } from "./utils/responseParser.js";
import { validateAndCleanResult } from "./utils/validationUtils.js";
import { getFallbackAnalysis } from "./utils/fallbackAnalyzer.js";

/**
 * Main entrypoint for document analysis.
 * Uses LLM via adapter, safely parses response, and validates structure.
 */
export async function analyzeDocument(text) {
  try {
    if (!text || text.trim().length < 10) {
      throw new Error("Document text is empty or too short for analysis.");
    }

    console.log("🤖 Sending document to LLM for analysis...");

    const prompt = buildAnalysisPrompt(text);
    const rawResponse = await generate(prompt);

    console.log("📝 LLM response received, parsing...");

    const jsonResult = parseLLMResponse(rawResponse);
    const validatedResult = validateAndCleanResult(jsonResult);

    console.log("Document analysis completed successfully");
    return validatedResult;
  } catch (error) {
    console.error("Document analysis failed:", error);
    return getFallbackAnalysis(text, error.message);
  }
}

/**
 * Lightweight utility to generate short or detailed summaries
 */
export async function generateSummary(text, type = "short") {
  try {
    const prompt =
      type === "short"
        ? `Provide a concise 2-3 sentence summary:\n\n${text}`
        : `Provide a detailed bullet summary:\n\n${text}`;

    const response = await generate(prompt);
    return type === "short"
      ? response.trim()
      : response.split(/\n|•|- /).filter(Boolean);
  } catch (error) {
    console.error("Summary generation error:", error);
    return type === "short"
      ? "Summary not available"
      : ["Summary not available"];
  }
}
