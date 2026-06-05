import * as FileSystem from "expo-file-system/legacy";
import { callGeminiVision } from "../api/geminiApi";

export interface AnalisisIA {
  category: string;
  priority: "Alta" | "Media" | "Baja";
  description: string;
  recommendation: string;
}

const PROMPT = `
Analiza la imagen y responde solo este JSON válido:

{
  "category": "Basura acumulada | Bache o daño vial | Luminaria dañada | Fuga de agua | Grafiti o vandalismo | Señalética dañada | Árbol caído | Otro",
  "priority": "Alta | Media | Baja",
  "description": "máximo 1 oración",
  "recommendation": "máximo 1 oración"
}

Usa exactamente una categoría y una prioridad de las opciones dadas. Sin markdown. Sin texto extra.
`;

export async function imageUriToBase64(uri: string): Promise<string> {
  return await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
}

export async function analizarImagenUrbana(base64Image: string): Promise<AnalisisIA> {
  try {
    const text = await callGeminiVision(base64Image, PROMPT);

    console.log("Respuesta cruda Gemini:", text);

    const clean = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("Respuesta limpia Gemini:", clean);

    const jsonMatch = clean.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Gemini no devolvió un JSON válido");
    }

    return JSON.parse(jsonMatch[0]) as AnalisisIA;
  } catch (error) {
    console.error("Error analizando imagen urbana:", error);

    return {
      category: "Otro",
      priority: "Media",
      description: "No se pudo clasificar automáticamente.",
      recommendation: "Revisar manualmente el reporte.",
    };
  }
}