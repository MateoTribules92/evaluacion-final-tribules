const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function callGeminiVision(base64Image: string, prompt: string): Promise<string> {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: "image/jpeg", data: base64Image } },
        ],
      }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 300 },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Gemini error: ${err?.error?.message || response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}