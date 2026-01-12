import { GoogleGenAI, Type } from "@google/genai";

// Use an empty string fallback to prevent initialization errors; 
// the service methods already check for existence before calling.
const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const analyzeMedicalOrder = async (order: string) => {
  if (!apiKey) {
    return { error: "AI Engine Configuration Missing: Please add API_KEY to Netlify environment variables." };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a clinical pharmacist assistant. Analyze the following medical order and provide the calculation steps, total dose, and any clinical warnings. 
      Order: "${order}"
      
      Respond in JSON format with fields:
      - calculationSteps (array of strings)
      - resultValue (string)
      - warnings (array of strings)
      - confidence (number 0-1)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            calculationSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            resultValue: { type: Type.STRING },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidence: { type: Type.NUMBER }
          },
          required: ["calculationSteps", "resultValue", "warnings", "confidence"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { error: "The clinical engine is currently unavailable. Please verify the API key is active." };
  }
};

export const getClinicalBrief = async (calcId: string, value: string) => {
  if (!apiKey) return "Clinical intelligence engine not configured.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Briefly explain the clinical significance of a ${calcId} result of ${value}. Use professional medical language. Keep it under 50 words.`
    });
    return response.text;
  } catch (e) {
    return "Clinical brief unavailable at this time.";
  }
};