import * as gemini from "./adapters/geminiAdapter.js";

// Change provider via ENV
const PROVIDER = process.env.LLM_PROVIDER || "gemini";

let activeProvider = null;

/**
 * Initialize active LLM provider
 */
export function initLLM() {
  const apiKey = process.env.LLM_API_KEY;

  switch (PROVIDER) {
    case "gemini":
      gemini.init(apiKey, process.env.LLM_MODEL || "gemini-2.5-flash");
      activeProvider = gemini;
      break;

    default:
      throw new Error(`Unsupported LLM provider: ${PROVIDER}`);
  }

  console.log(`🎛️ Active LLM Provider: ${PROVIDER}`);
}

/**
 * Unified generate method
 */
export async function generate(prompt) {
  if (!activeProvider) {
    throw new Error("LLM not initialized. Call initLLM() first.");
  }

  return await activeProvider.generate(prompt);
}
