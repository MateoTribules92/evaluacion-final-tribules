import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { homeStyles } from "../../styles/appStyle";
import { logout } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useReportes } from "../../hooks/useReportes";

type HomeScreenNavigationProp = StackScreenProps<AppStackParamList, "Home">;

const MVP_STEPS = [
  { num: "1", emoji: "📷", title: "Captura", desc: "Toma foto del problema" },
  { num: "2", emoji: "📍", title: "Ubicación", desc: "GPS automático" },
  { num: "3", emoji: "🤖", title: "Analiza IA", desc: "Gemini Vision" },
  { num: "4", emoji: "☁️", title: "Guarda", desc: "Firestore + Storage" },
];

const QUICK_STATS = [
  { emoji: "🗑️", label: "Basura" },
  { emoji: "🚧", label: "Baches" },
  { emoji: "💡", label: "Luminarias" },
  { emoji: "💧", label: "Fugas" },
  { emoji: "🎨", label: "Grafiti" },
  { emoji: "🚦", label: "Señales" },
];

function normalizarEstado(reporte: any): string {
  const status = reporte.status || reporte.estado || "Pendiente";

  if (status === "pendiente") return "Pendiente";
  if (status === "en_proceso") return "En proceso";
  if (status === "resuelto") return "Resuelto";

  return status;
}

function obtenerFecha(reporte: any) {
  return reporte.createdAt || reporte.fechaCreacion;
}

function formatearFecha(value: any): string {
  if (!value) return "Sin fecha";

  try {
    const date = value?.toDate ? value.toDate() : new Date(value);
    const diff = new Date().getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return "Ahora";
    if (mins < 60) return `Hace ${mins} min`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;

    return date.toLocaleDateString("es-EC");
  } catch {
    return "Sin fecha";
  }
}

export const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {
  const { user } = useAuth();
  const { reportes, loading, cargarReportes } = useReportes();

  useFocusEffect(
    useCallback(() => {
      cargarReportes();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: () => logout() },
    ]);
  };

  const userName = user?.email?.split("@")[0] || "Usuario";

  const pendientes = reportes.filter((r: any) => normalizarEstado(r) === "Pendiente").length;
  const enProceso = reportes.filter((r: any) => normalizarEstado(r) === "En proceso").length;
  const resueltos = reportes.filter((r: any) => normalizarEstado(r) === "Resuelto").length;
  const altaPrioridad = reportes.filter((r: any) => r.priority === "Alta").length;

  const ultimoReporte = [...reportes].sort((a: any, b: any) => {
    const fechaA = obtenerFecha(a)?.toDate ? obtenerFecha(a).toDate() : new Date(obtenerFecha(a) || 0);
    const fechaB = obtenerFecha(b)?.toDate ? obtenerFecha(b).toDate() : new Date(obtenerFecha(b) || 0);
    return fechaB.getTime() - fechaA.getTime();
  })[0];

  return (
    <View style={{ flex: 1, backgroundColor: "#080C10" }}>
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={homeStyles.header}>
          <View>
            <Text style={homeStyles.greeting}>¡Hola, {userName}! 👋</Text>
            <Text style={homeStyles.email} numberOfLines={1}>{user?.email}</Text>
          </View>

          <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
            <Text style={homeStyles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.heroBanner}>
          <View style={homeStyles.heroLeft}>
            <Text style={homeStyles.heroTag}>🌱 EcoMapa IA</Text>
            <Text style={homeStyles.heroTitle}>
              Reporta problemas{"\n"}urbanos con IA
            </Text>
            <Text style={homeStyles.heroSub}>
              Captura, analiza y registra incidentes en tu ciudad
            </Text>
          </View>
          <Text style={homeStyles.heroEmoji}>🏙️</Text>
        </View>


        <View style={homeStyles.mainButtons}>
          <TouchableOpacity
            style={homeStyles.btnMain}
            onPress={() => navigation.navigate("NewReport")}
            activeOpacity={0.85}
          >
            <View style={homeStyles.btnMainIcon}>
              <Text style={{ fontSize: 28 }}>📷</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={homeStyles.btnMainTitle}>Nuevo Reporte</Text>
              <Text style={homeStyles.btnMainDesc}>Toma una foto y analiza con IA</Text>
            </View>
            <Text style={homeStyles.btnMainArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.btnSecond}
            onPress={() => navigation.navigate("MyReports")}
            activeOpacity={0.85}
          >
            <View style={homeStyles.btnSecondIcon}>
              <Text style={{ fontSize: 24 }}>📋</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={homeStyles.btnSecondTitle}>Mis Reportes</Text>
              <Text style={homeStyles.btnSecondDesc}>Ver historial de incidentes</Text>
            </View>
            <Text style={homeStyles.btnSecondArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.btnSecond}
            onPress={() => navigation.navigate("ReportMap")}
            activeOpacity={0.85}
          >
            <View style={homeStyles.btnSecondIcon}>
              <Text style={{ fontSize: 24 }}>🗺️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={homeStyles.btnSecondTitle}>Mapa de Reportes</Text>
              <Text style={homeStyles.btnSecondDesc}>Ver incidencias por ubicación</Text>
            </View>
            <Text style={homeStyles.btnSecondArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {ultimoReporte && (
          <View style={homeStyles.section}>
            <Text style={homeStyles.sectionLabel}>ÚLTIMO REPORTE</Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate("ReportDetail", { reporte: ultimoReporte })}
              style={{
                padding: 16,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "rgba(63,185,80,0.28)",
                backgroundColor: "rgba(63,185,80,0.08)",
              }}
            >
              <Text style={{ color: "#F0F6FC", fontSize: 16, fontWeight: "800" }}>
                {ultimoReporte.category || "Sin categoría"}
              </Text>

              <Text
                style={{ color: "#8B949E", fontSize: 13, marginTop: 6 }}
                numberOfLines={2}
              >
                {ultimoReporte.description || "Sin descripción disponible"}
              </Text>

              <Text style={{ color: "#3FB950", fontSize: 12, marginTop: 10, fontWeight: "700" }}>
                {normalizarEstado(ultimoReporte)} · {formatearFecha(obtenerFecha(ultimoReporte))}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionLabel}>¿CÓMO FUNCIONA?</Text>
          <View style={homeStyles.stepsRow}>
            {MVP_STEPS.map((s, i) => (
              <View key={s.num} style={{ alignItems: "center", flex: 1 }}>
                <View style={homeStyles.stepBox}>
                  <Text style={{ fontSize: 20 }}>{s.emoji}</Text>
                </View>
                <Text style={homeStyles.stepTitle}>{s.title}</Text>
                <Text style={homeStyles.stepDesc}>{s.desc}</Text>
                {i < MVP_STEPS.length - 1 && (
                  <Text style={homeStyles.stepArrow}>›</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionLabel}>CATEGORÍAS DETECTADAS</Text>
          <View style={homeStyles.categoriesGrid}>
            {QUICK_STATS.map((c) => (
              <View key={c.label} style={homeStyles.categoryChip}>
                <Text style={{ fontSize: 18 }}>{c.emoji}</Text>
                <Text style={homeStyles.categoryLabel}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={homeStyles.footerBadge}>
          <Text style={homeStyles.footerBadgeText}>
            🔒 Firebase Auth · Firestore · Gemini Vision
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};