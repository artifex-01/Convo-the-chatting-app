export interface ClientChatSession {
  personaName: string;
  history: Array<{ text: string; isOwn: boolean }>;
}

/**
 * Creates a new chat session object for the client.
 * @param personaName The name of the person the AI is mimicking.
 * @returns A client chat session object.
 */
export const createChatSession = (personaName: string): ClientChatSession => {
  return {
    personaName,
    history: [],
  };
};

/**
 * Sends a message to the backend API endpoint which proxies to Gemini safely.
 * @param session The active client chat session.
 * @param message The user's message.
 * @returns The AI's text response.
 */
export const sendMessageToGemini = async (
  session: ClientChatSession | null | any,
  message: string
): Promise<string> => {
  try {
    const personaName = session?.personaName || 'Contact';
    const history = session?.history || [];

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personaName,
        message,
        history,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.text || "👍";

    if (session && Array.isArray(session.history)) {
      session.history.push({ text: message, isOwn: true });
      session.history.push({ text: reply, isOwn: false });
    }

    return reply;
  } catch (error) {
    console.error("Gemini API Client Error:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};
