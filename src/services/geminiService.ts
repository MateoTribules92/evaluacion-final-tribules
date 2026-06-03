import * as FileSystem from "expo-file-system";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface AnalisisIA {
  categoria: string;
  prioridad: "Alta" | "Media" | "Baja";
  descripcion: string;
  recomendacion: string;
}

export async function imageUriToBase64(uri: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",  
  });
  return base64;
}

export async function analizarImagenUrbana(base64Image: string): Promise<AnalisisIA> {
  const prompt = `
Eres un asistente de monitoreo urbano. Analiza esta imagen y responde ÚNICAMENTE con un JSON válido (sin markdown, sin texto extra) con esta estructura exacta:

{
  "categoria": "una de estas: Basura acumulada | Bache o daño vial | Luminaria dañada | Fuga de agua | Grafiti o vandalismo | Señalética dañada | Árbol caído | Otro",
  "prioridad": "Alta | Media | Baja",
  "descripcion": "descripción breve del problema visible en la imagen (máximo 2 oraciones)",
  "recomendacion": "acción recomendada para resolver el problema"
}
`;

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            { inline_data: { mime_type: "image/jpeg", data: base64Image } },
          ],
        },
      ],
      generationConfig: { temperature: 0.2, maxOutputTokens: 300 },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Gemini error: ${err?.error?.message || response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const clean = text.replace(/```json|```/gi, "").trim();

  try {
    return JSON.parse(clean) as AnalisisIA;
  } catch {
    return {
      categoria: "Otro",
      prioridad: "Media",
      descripcion: "No se pudo clasificar automáticamente.",
      recomendacion: "Revisar manualmente el reporte.",
    };
  }
}