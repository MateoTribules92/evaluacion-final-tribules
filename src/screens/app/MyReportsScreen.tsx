// src/screens/app/NewReportScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, ActivityIndicator, Alert, StatusBar,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { imageUriToBase64, analizarImagenUrbana, AnalisisIA } from "../../services/geminiService";
import { subirFoto, crearReporte } from "../../services/reportesService";
import { newReportStyles as styles } from "../../styles/appStyle"; // ← ajusta si tu archivo se llama distinto

const PRIORIDAD_COLOR: Record<string, string> = {
  Alta: "#F85149", Media: "#D29922", Baja: "#3FB950",
};
const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada": "🗑️", "Bache o daño vial": "🚧",
  "Luminaria dañada": "💡", "Fuga de agua": "💧",
  "Grafiti o vandalismo": "🎨", "Señalética dañada": "🚦",
  "Árbol caído": "🌳", "Otro": "📍",
};

type Etapa = "camara" | "procesando" | "resultado" | "guardando";

export function NewReportScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState(false);
  const [etapa, setEtapa] = useState<Etapa>("camara");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState<{ latitude: number; longitude: number } | null>(null);
  const [analisis, setAnalisis] = useState<AnalisisIA | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    })();
  }, []);

  const tomarFoto = async () => {
    if (!cameraRef.current) return;
    try {
      const foto = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setFotoUri(foto.uri);
      await procesarReporte(foto.uri);
    } catch (e: any) {
      setError("No se pudo tomar la foto: " + e.message);
    }
  };

  const procesarReporte = async (uri: string) => {
    setEtapa("procesando");
    setError(null);
    try {
      let coords = { latitude: 0, longitude: 0 };
      if (locationPermission) {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        coords = loc.coords;
      }
      setUbicacion(coords);
      const base64 = await imageUriToBase64(uri);
      const resultado = await analizarImagenUrbana(base64);
      setAnalisis(resultado);
      setEtapa("resultado");
    } catch (e: any) {
      setError(e.message || "Error al procesar la imagen");
      setEtapa("camara");
    }
  };

  const guardarReporte = async () => {
    if (!analisis || !fotoUri) return;
    setEtapa("guardando");
    try {
      const fotoUrl = await subirFoto(fotoUri);
      await crearReporte({
        fotoUrl,
        categoria: analisis.categoria,
        descripcionIA: analisis.descripcion,
        prioridad: analisis.prioridad,
        recomendacion: analisis.recomendacion,
        latitud: ubicacion?.latitude || 0,
        longitud: ubicacion?.longitude || 0,
      });
      Alert.alert(
        "✅ Reporte guardado",
        `Categoría: ${analisis.categoria}`,
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
    setUbicacion(null); setEtapa("camara"); setError(null);
  };

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>📷 Se necesita acceso a la cámara</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={requestPermission}>
          <Text style={styles.btnText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (etapa === "camara") {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <CameraView style={styles.camera} facing="back" ref={cameraRef}>
          <View style={styles.overlayTop}>
            <Text style={styles.cameraTitle}>🌱 Nuevo Reporte</Text>
            <Text style={styles.cameraHint}>Apunta al problema y toma la foto</Text>
          </View>
          <View style={styles.frameguide} />
          <View style={styles.overlayBottom}>
            {error && <Text style={styles.errorBanner}>{error}</Text>}
            <TouchableOpacity style={styles.captureBtn} onPress={tomarFoto}>
              <View style={styles.captureBtnInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
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
    const emoji = CATEGORIA_EMOJI[analisis.categoria] || "📍";
    const prioColor = PRIORIDAD_COLOR[analisis.prioridad] || "#D29922";
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.resultHeader}>Análisis completado</Text>
        {fotoUri && <Image source={{ uri: fotoUri }} style={styles.previewFull} />}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardCategoria}>{analisis.categoria}</Text>
              <View style={[styles.badge, { backgroundColor: prioColor + "22" }]}>
                <Text style={[styles.badgeText, { color: prioColor }]}>
                  ⚡ Prioridad {analisis.prioridad}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.label}>📝 Descripción</Text>
          <Text style={styles.value}>{analisis.descripcion}</Text>
          <Text style={[styles.label, { marginTop: 12 }]}>✅ Recomendación</Text>
          <Text style={styles.value}>{analisis.recomendacion}</Text>
          {ubicacion && ubicacion.latitude !== 0 && (
            <>
              <Text style={[styles.label, { marginTop: 12 }]}>📍 Ubicación GPS</Text>
              <Text style={styles.value}>
                {ubicacion.latitude.toFixed(5)}, {ubicacion.longitude.toFixed(5)}
              </Text>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.btnPrimary} onPress={guardarReporte}>
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
          ☁️ Subiendo foto{"\n"}🗄️ Guardando en Firestore
        </Text>
      </View>
    );
  }

  return null;
}