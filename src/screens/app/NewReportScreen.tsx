// src/screens/app/NewReportScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import {
  imageUriToBase64,
  analizarImagenUrbana,
  AnalisisIA,
} from "../../services/geminiService";
import { useReportes } from "../../hooks/useReportes";
import { newReportStyles as styles } from "../../styles/appStyle";

const PRIORIDAD_COLOR: Record<string, string> = {
  Alta: "#F85149",
  Media: "#D29922",
  Baja: "#3FB950",
};

const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada": "🗑️",
  "Bache o daño vial": "🚧",
  "Luminaria dañada": "💡",
  "Fuga de agua": "💧",
  "Grafiti o vandalismo": "🎨",
  "Señalética dañada": "🚦",
  "Árbol caído": "🌳",
  Otro: "📍",
};

type Etapa = "inicio" | "procesando" | "resultado" | "guardando";

type Coordenadas = {
  latitude: number;
  longitude: number;
};

export function NewReportScreen({ navigation }: any) {
  const { guardarReporte } = useReportes();

  const [etapa, setEtapa] = useState<Etapa>("inicio");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState<Coordenadas | null>(null);
  const [direccion, setDireccion] = useState<string>("");
  const [analisis, setAnalisis] = useState<AnalisisIA | null>(null);
  const [error, setError] = useState<string | null>(null);

  const obtenerDireccion = async (coords: Coordenadas): Promise<string> => {
    try {
      const resultado = await Location.reverseGeocodeAsync(coords);

      if (!resultado.length) return "";

      const lugar = resultado[0];

      return [
        lugar.street,
        lugar.name,
        lugar.district,
        lugar.city,
        lugar.region,
        lugar.country,
      ]
        .filter(Boolean)
        .join(", ");
    } catch {
      return "";
    }
  };

  const obtenerUbicacion = async (): Promise<Coordenadas | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso de ubicación requerido",
          "No se pudo obtener la ubicación del reporte."
        );
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      setUbicacion(coords);

      const address = await obtenerDireccion(coords);
      setDireccion(address);

      return coords;
    } catch (e) {
      console.error("Error obteniendo ubicación:", e);
      return null;
    }
  };

  const procesarImagen = async (uri: string) => {
    setEtapa("procesando");
    setError(null);

    try {
      await obtenerUbicacion();

      const base64 = await imageUriToBase64(uri);
      const resultado = await analizarImagenUrbana(base64);

      setAnalisis(resultado);
      setEtapa("resultado");
    } catch (e: any) {
      console.error("Error procesando imagen:", e);
      setError(e.message || "Error al procesar la imagen");
      setEtapa("inicio");
    }
  };

  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoUri(uri);
      await procesarImagen(uri);
    }
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsEditing: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoUri(uri);
      await procesarImagen(uri);
    }
  };

  const handleGuardar = async () => {
    if (!analisis || !fotoUri) return;

    setEtapa("guardando");

    try {
      let coords = ubicacion;

      if (!coords) {
        coords = await obtenerUbicacion();
      }

      if (!coords) {
        Alert.alert(
          "Ubicación no disponible",
          "No se pudo obtener la ubicación. El reporte se guardará sin coordenadas reales."
        );
      }

      await guardarReporte(
        {
          imageUrl: "",
          category: analisis.category,
          description: analisis.description,
          priority: analisis.priority,
          recommendation: analisis.recommendation,
          latitude: coords?.latitude ?? 0,
          longitude: coords?.longitude ?? 0,
          address: direccion,
        },
        fotoUri
      );

      Alert.alert("Reporte guardado", `Categoría: ${analisis.category}`, [
        {
          text: "Ver mis reportes",
          onPress: () => navigation.navigate("MyReports"),
        },
      ]);

      resetear();
    } catch (e: any) {
      console.error("Error guardando reporte:", e);
      Alert.alert("Error", e.message || "No se pudo guardar el reporte.");
      setEtapa("resultado");
    }
  };

  const resetear = () => {
    setFotoUri(null);
    setAnalisis(null);
    setUbicacion(null);
    setDireccion("");
    setEtapa("inicio");
    setError(null);
  };

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

          {ubicacion && (
            <>
              <Text style={[styles.label, { marginTop: 12 }]}>📍 Ubicación GPS</Text>
              <Text style={styles.value}>
                {ubicacion.latitude.toFixed(6)}, {ubicacion.longitude.toFixed(6)}
              </Text>
            </>
          )}

          {!!direccion && (
            <>
              <Text style={[styles.label, { marginTop: 12 }]}>🏙️ Dirección aproximada</Text>
              <Text style={styles.value}>{direccion}</Text>
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

  if (etapa === "guardando") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3FB950" />

        <Text style={styles.processingTitle}>Guardando reporte...</Text>
        <Text style={styles.processingSteps}>
          ☁️ Subiendo foto{"\n"}
          🗄️ Guardando en Firestore
        </Text>
      </View>
    );
  }

  return null;
}