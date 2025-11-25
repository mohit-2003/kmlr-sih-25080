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
    console.log("validatedResult", validatedResult);

    console.log("Document analysis completed successfully");
    return validatedResult;
  } catch (error) {
    console.error("Document analysis failed:", error);
    return getFallbackAnalysis(text, error.message);
  }
}
