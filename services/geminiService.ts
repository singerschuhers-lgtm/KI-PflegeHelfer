import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { Language } from '../types';

// Initialize the client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[],
  language: Language = 'ru'
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Adjust system instruction based on language context if needed, 
    // or simply append a direction to the user prompt.
    // Here we append a steering instruction to the last message invisible to the user history 
    // but visible to the model in the immediate call context if we were using a different API structure.
    // With GoogleGenAI, we can modify the system instruction or the prompt.
    
    const langInstruction = language === 'ru' 
      ? " (Отвечай на русском языке)" 
      : " (Antworte bitte auf Deutsch)";
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + `\n\nIMPORTANT: The user is currently viewing the app in ${language === 'ru' ? 'Russian' : 'German'}. Ensure your response is in ${language === 'ru' ? 'Russian' : 'German'}.`,
        temperature: 0.4,
      },
      history: history,
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: userMessage + langInstruction
    });

    return result.text || (language === 'ru' ? "Извините, я не смог сформировать ответ." : "Entschuldigung, ich konnte keine Antwort formulieren.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ru' 
      ? "Произошла ошибка при соединении с ассистентом. Пожалуйста, проверьте интернет."
      : "Ein Verbindungsfehler ist aufgetreten. Bitte überprüfen Sie Ihre Internetverbindung.";
  }
};