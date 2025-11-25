import { GoogleGenerativeAI } from "@google/generative-ai";

let model = null;

/**
 * Initialize Gemini model
 * @param {string} apiKey
 * @param {string} modelName
 */
export function init(apiKey, modelName = "gemini-2.5-flash") {
  if (!apiKey) throw new Error("GEMINI_API_KEY is required");

  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: modelName });

  console.log(`🤖 Gemini initialized with model: ${modelName}`);
}

/**
 * Unified generate method
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generate(prompt) {
  if (!model) throw new Error("Gemini model not initialized.");

  try {
    const result = await model.generateContent(prompt);
    const text = result?.response?.text();

    if (!text) throw new Error("Empty response from Gemini");

    return text.trim();
  } catch (error) {
    console.error("❌ Gemini generate() error:", error);
    throw new Error(`Gemini Error: ${error.message}`);
  }
}
