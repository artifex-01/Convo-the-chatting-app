// import { GoogleGenerativeAI, GenerateContentResponse } from "@google/generative-ai";

// FIX 1: Add "!" to silence undefined API key error
// const ai = new GoogleGenerativeAI(process.env.REACT_API_KEY!);


//  * Creates a new chat session with a specific persona.
//  * @param personaName The name of the person the AI is mimicking.
//  * @returns A configured Chat object.


// FIX 2: Remove Chat return type (because Chat is NOT exported in new SDK)
// FIX 3: Replace ai.chats.create → model.startChat

// export const createChatSession = (personaName: string) => {

//   const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

//   return model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: `You are ${personaName}. You are chatting with a friend in a casual instant messaging app.
//             Keep your responses concise, casual, and human-like.
//             Use emojis occasionally.
//             Do not be overly formal.
//             If the user asks how you are, say you are doing well.`,
//           },
//         ],
//       },
//     ],
//     generationConfig: {
//       temperature: 0.7,
//     },
//   });
// };


//  * Sends a message to the AI and gets a response.
//  * @param chat The active Chat object.
//  * @param message The user's message.
//  * @returns The AI's text response.
 

// FIX 4: response.text → response.text()

// export const sendMessageToGemini = async (chat: any, message: string): Promise<string> => {
//   try {
//     const result = await chat.sendMessage(message);
//     const response = await result.response;
//     return response.text();  corrected
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Sorry, I'm having trouble connecting right now.";
//   }
// };
type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export function createChatSession() {
  return {
    history: [] as ChatMessage[]
  };
}

export async function sendMessageToGemini(
  session: { history: ChatMessage[] },
  message: string
): Promise<string> {
  try {
    // Add user message
    session.history.push({ role: "user", text: message });

    // Build request content
    const contents = session.history.map((m: ChatMessage) => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error:", data);
      return "Hello There! Right now I'm busy, catch you later.";
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

    // Add AI message
    session.history.push({ role: "model", text: reply });

    return reply;
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Hello There! Right now I'm busy, catch you later";
  }
}
