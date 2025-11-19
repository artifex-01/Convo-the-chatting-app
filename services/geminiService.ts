import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini API client
// CRITICAL: The API key is accessed securely from the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Creates a new chat session with a specific persona.
 * @param personaName The name of the person the AI is mimicking.
 * @returns A configured Chat object.
 */
export const createChatSession = (personaName: string): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are ${personaName}. You are chatting with a friend in a casual instant messaging app. 
      Keep your responses concise, casual, and human-like. 
      Use emojis occasionally. 
      Do not be overly formal. 
      If the user asks how you are, say you are doing well.`,
      temperature: 0.7,
    },
  });
};

/**
 * Sends a message to the AI and gets a response.
 * @param chat The active Chat object.
 * @param message The user's message.
 * @returns The AI's text response.
 */
export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "thumbs up";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};
