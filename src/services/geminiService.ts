import * as FileSystem from "expo-file-system/legacy";
import { callGeminiVision } from "../api/geminiApi";


export interface AnalisisIA {
  category: string;
  priority: "Alta" | "Media" | "Baja";
  description: string;
  recommendation: string;
}

const PROMPT = `
Eres un asistente de monitoreo urbano. Analiza esta imagen y responde ÚNICAMENTE con un JSON válido (sin markdown, sin texto extra) con esta estructura exacta:

{
  "category": "una de estas: Basura acumulada | Bache o daño vial | Luminaria dañada | Fuga de agua | Grafiti o vandalismo | Señalética dañada | Árbol caído | Otro",
  "priority": "Alta | Media | Baja",
  "description": "descripción breve del problema visible en la imagen (máximo 2 oraciones)",
  "recommendation": "acción recomendada para resolver el problema"
}
`;

export async function imageUriToBase64(uri: string): Promise<string> {
  return await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
}

export async function analizarImagenUrbana(base64Image: string): Promise<AnalisisIA> {
  try {
    const text = await callGeminiVision(base64Image, PROMPT);
    const clean = text.replace(/```json|```/gi, "").trim();
    return JSON.parse(clean) as AnalisisIA;
  } catch {
    return {
      category: "Otro",
      priority: "Media",
      description: "No se pudo clasificar automáticamente.",
      recommendation: "Revisar manualmente el reporte.",
    };
  }
}