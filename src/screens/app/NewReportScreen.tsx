// src/screens/app/NewReportScreen.tsx
import React, { useState } from "react";
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, ActivityIndicator, Alert, StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { imageUriToBase64, analizarImagenUrbana, AnalisisIA } from "../../services/geminiService";
import { useReportes } from "../../hooks/useReportes";
import { newReportStyles as styles } from "../../styles/appStyle";



const PRIORIDAD_COLOR: Record<string, string> = {
  Alta: "#F85149", Media: "#D29922", Baja: "#3FB950",
};
const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada": "🗑️", "Bache o daño vial": "🚧",
  "Luminaria dañada": "💡", "Fuga de agua": "💧",
  "Grafiti o vandalismo": "🎨", "Señalética dañada": "🚦",
  "Árbol caído": "🌳", "Otro": "📍",
};

type Etapa = "inicio" | "procesando" | "resultado" | "guardando";

export function NewReportScreen({ navigation }: any) {
  const { guardarReporte } = useReportes();
  const [etapa, setEtapa] = useState<Etapa>("inicio");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState<{ latitude: number; longitude: number } | null>(null);
  const [analisis, setAnalisis] = useState<AnalisisIA | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Obtener ubicación ─────────────────────────────────────────
  const obtenerUbicacion = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUbicacion(loc.coords);
        return loc.coords;
      }
    } catch {}
    return { latitude: 0, longitude: 0 };
  };

  // ── Procesar imagen ───────────────────────────────────────────
  const procesarImagen = async (uri: string) => {
    setEtapa("procesando");
    setError(null);
    try {
      const coords = await obtenerUbicacion();
      setUbicacion(coords);
      const base64 = await imageUriToBase64(uri);
      const resultado = await analizarImagenUrbana(base64);
      setAnalisis(resultado);
      setEtapa("resultado");
    } catch (e: any) {
      setError(e.message || "Error al procesar la imagen");
      setEtapa("inicio");
    }
  };

  // ── Abrir cámara ──────────────────────────────────────────────
  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoUri(uri);
      await procesarImagen(uri);
    }
  };

  // ── Abrir galería ─────────────────────────────────────────────
  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoUri(uri);
      await procesarImagen(uri);
    }
  };

  // ── Guardar reporte ───────────────────────────────────────────
  const handleGuardar = async () => {
    if (!analisis || !fotoUri) return;
    setEtapa("guardando");
    try {
      await guardarReporte({
        imageUrl: "",
        category: analisis.category,
        description: analisis.description,
        priority: analisis.priority,
        recommendation: analisis.recommendation,
        latitude: ubicacion?.latitude || 0,
        longitude: ubicacion?.longitude || 0,
        address: "",
      }, fotoUri);
      Alert.alert(
        "✅ Reporte guardado",
        `Categoría: ${analisis.category}`,
        [{ text: "Ver mis reportes", onPress: () => navigation.navigate("MyReports") }]
      );
      resetear();
    } catch (e: any) {
      Alert.alert("Error", e.message);
      setEtapa("resultado");
    }
  };

  const resetear = () => {
    setFotoUri(null); setAnalisis(null);
    setUbicacion(null); setEtapa("inicio"); setError(null);
  };

  // ── Render: Inicio ────────────────────────────────────────────
  if (etapa === "inicio") {
    return (
      <View style={styles.centered}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.cameraTitle}>🌱 Nuevo Reporte</Text>
        <Text style={styles.cameraHint}>
          Toma o elige una foto del problema urbano para analizarlo con IA
        </Text>
        {error && <Text style={styles.errorBanner}>{error}</Text>}
        <TouchableOpacity
          style={[styles.btnPrimary, { width: "100%", marginTop: 40 }]}
          onPress={abrirCamara}
        >
          <Text style={styles.btnText}>📷 Abrir Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnSecondary, { width: "100%", marginTop: 12 }]}
          onPress={abrirGaleria}
        >
          <Text style={styles.btnSecondaryText}>🖼️ Elegir de Galería</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Render: Procesando ────────────────────────────────────────
  if (etapa === "procesando") {
    return (
      <View style={styles.centered}>
        {fotoUri && <Image source={{ uri: fotoUri }} style={styles.previewSmall} />}
        <ActivityIndicator size="large" color="#3FB950" style={{ marginTop: 24 }} />
        <Text style={styles.processingTitle}>Analizando imagen...</Text>
        <Text style={styles.processingSteps}>
          📍 Obteniendo ubicación{"\n"}
          🤖 Consultando Gemini Vision{"\n"}
          📊 Clasificando incidente
        </Text>
      </View>
    );
  }

  // ── Render: Resultado ─────────────────────────────────────────
  if (etapa === "resultado" && analisis) {
    const emoji = CATEGORIA_EMOJI[analisis.category] || "📍";
    const prioColor = PRIORIDAD_COLOR[analisis.priority] || "#D29922";
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.resultHeader}>Análisis completado</Text>
        {fotoUri && <Image source={{ uri: fotoUri }} style={styles.previewFull} />}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardCategoria}>{analisis.category}</Text>
              <View style={[styles.badge, { backgroundColor: prioColor + "22" }]}>
                <Text style={[styles.badgeText, { color: prioColor }]}>
                  ⚡ Prioridad {analisis.priority}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.label}>📝 Descripción</Text>
          <Text style={styles.value}>{analisis.description}</Text>
          <Text style={[styles.label, { marginTop: 12 }]}>✅ Recomendación</Text>
          <Text style={styles.value}>{analisis.recommendation}</Text>
          {ubicacion && ubicacion.latitude !== 0 && (
            <>
              <Text style={[styles.label, { marginTop: 12 }]}>📍 Ubicación GPS</Text>
              <Text style={styles.value}>
                {ubicacion.latitude.toFixed(5)}, {ubicacion.longitude.toFixed(5)}
              </Text>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleGuardar}>
          <Text style={styles.btnText}>💾 Guardar reporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={resetear}>
          <Text style={styles.btnSecondaryText}>🔄 Tomar otra foto</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ── Render: Guardando ─────────────────────────────────────────
  if (etapa === "guardando") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3FB950" />
        <Text style={styles.processingTitle}>Guardando reporte...</Text>
        <Text style={styles.processingSteps}>
          ☁️ Subiendo foto{"\n"}🗄️ Guardando en Firestore
        </Text>
      </View>
    );
  }

  return null;
}