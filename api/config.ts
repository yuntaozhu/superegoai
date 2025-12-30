
/**
 * System-wide configuration for AI Models.
 * Follows the AI First Course guidelines for model selection.
 */
export const GEMINI_CONFIG = {
  models: {
    // Basic Text Tasks (e.g., summarization, simple Q&A)
    default: 'gemini-3-flash-preview',
    
    // Complex Text Tasks (e.g., reasoning, coding, STEM)
    pro: 'gemini-3-pro-preview',
    
    // High-Quality Image Generation
    image: 'gemini-3-pro-image-preview',
    
    // Video Generation
    video: 'veo-3.1-fast-generate-preview',
    
    // Audio/Speech
    audio: 'gemini-2.5-flash-native-audio-preview-09-2025'
  },
  thinkingBudget: {
    default: 2048,
    complex: 4096
  }
};
