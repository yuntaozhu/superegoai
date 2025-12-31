
import { GoogleGenAI } from "@google/genai";

/**
 * Centralized client initialization for Google GenAI.
 * Ensures consistent API key usage from environment variables.
 * Creates a new instance on every call to support dynamic key switching (e.g. Veo).
 */
export const getGeminiClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("❌ Gemini API Key is missing. Ensure process.env.API_KEY is populated via your .env file or environment variables.");
  } else {
    // Safe Debug: Log the first 4 characters to help verify if the new key is loaded.
    // If this prints the OLD key's prefix, you must restart the dev server.
    console.log(`🔑 initializing Gemini Client with Key: ${apiKey.substring(0, 4)}...******`);
  }

  return new GoogleGenAI({ apiKey: apiKey || '' });
};
