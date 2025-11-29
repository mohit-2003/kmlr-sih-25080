import { GoogleGenerativeAI } from "@google/generative-ai";

let model = null;
let activeModelName = null;

/**
 * Initialize Gemini model
 * @param {string} apiKey
 * @param {string} modelName
 */
export function init(apiKey, modelName = "gemini-2.5-flash") {
  if (!apiKey) throw new Error("GEMINI_API_KEY is required");

  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: modelName });

  activeModelName = modelName;

  console.log(`🤖 Gemini initialized with model: ${modelName}`);
}

/**
 * Unified generate method
 * @param {string} prompt
 * @returns {Promise<{text: string, usage: object}>}
 */
export async function generate(prompt) {
  if (!model) throw new Error("Gemini model not initialized.");

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = response.text();
    const usage = response.usageMetadata || {};

    if (!text) throw new Error("Empty response from Gemini");

    const finalUsageData = {
      model_used: activeModelName,
      input_tokens: usage.promptTokenCount,
      output_tokens: usage.candidatesTokenCount,
      total_tokens: usage.totalTokenCount,
    };

    return {
      text: text.trim(),
      usage: finalUsageData,
    };
  } catch (error) {
    console.error("❌ Gemini generate() error:", error);
    throw new Error(`Gemini Error: ${error.message}`);
  }
}
