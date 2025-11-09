import { GoogleGenerativeAI } from "@google/generative-ai";

let model = null;

function initGemini(apiKey, modelName = "gemini-2.5-flash") {
  if (!apiKey) throw new Error("GEMINI_API_KEY is required");
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: modelName });
}

async function generate(prompt, options = {}) {
  if (!model)
    throw new Error("Gemini model not initialized. Call initGemini first.");
  // generateContent usage (keeps interface simple)
  const result = await model.generateContent(prompt, options);
  return result.response.text().trim();
}

export { initGemini, generate };
