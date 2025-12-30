
import { GoogleGenAI } from "@google/genai";

/**
 * Centralized client initialization for Google GenAI.
 * Ensures consistent API key usage from environment variables.
 */
export const getGeminiClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Ensure process.env.API_KEY is populated via your .env file or environment variables.");
  }

  return new GoogleGenAI({ apiKey: apiKey || '' });
};
