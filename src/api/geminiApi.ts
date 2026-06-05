const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Falta EXPO_PUBLIC_GEMINI_API_KEY en .env");
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function callGeminiVision(
  base64Image: string,
  prompt: string,
): Promise<string> {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 800,
        responseMimeType: "application/json",
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);

    if (response.status === 429) {
      throw new Error(
        "Se agotó la cuota gratuita de Gemini. Intenta más tarde o revisa tu plan/billing en Google AI Studio.",
      );
    }

    throw new Error(data.error?.message || `Gemini error: ${response.status}`);
  }

  console.log("Respuesta completa Gemini:", JSON.stringify(data));

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.error("Respuesta inesperada de Gemini:", data);
    throw new Error("Gemini no devolvió texto");
  }

  return text;
}
