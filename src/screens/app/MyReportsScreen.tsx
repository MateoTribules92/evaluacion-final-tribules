// src/screens/app/MyReportsScreen.tsx
import React, { useState, useCallback } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, RefreshControl, StatusBar, Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useReportes } from "../../hooks/useReportes";
import { myReportsStyles as styles } from "../../styles/appStyle";

// ── Configs ───────────────────────────────────────────────────────
const PRIORIDAD_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  Alta:  { color: "#F85149", bg: "rgba(248,81,73,0.12)",  icon: "🔴" },
  Media: { color: "#D29922", bg: "rgba(210,153,34,0.12)", icon: "🟡" },
  Baja:  { color: "#3FB950", bg: "rgba(63,185,80,0.12)",  icon: "🟢" },
};

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pendiente:  { label: "Pendiente",  color: "#D29922", bg: "rgba(210,153,34,0.12)", icon: "⏳" },
  en_proceso: { label: "En proceso", color: "#58A6FF", bg: "rgba(88,166,255,0.12)", icon: "🔧" },
  resuelto:   { label: "Resuelto",   color: "#3FB950", bg: "rgba(63,185,80,0.12)",  icon: "✅" },
};

const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada":    "🗑️",
  "Bache o daño vial":   "🚧",
  "Luminaria dañada":    "💡",
  "Fuga de agua":        "💧",
  "Grafiti o vandalismo":"🎨",
  "Señalética dañada":   "🚦",
  "Árbol caído":         "🌳",
  "Otro":                "📍",
};

// ── Helpers ───────────────────────────────────────────────────────
function formatearFecha(timestamp: any): string {
  if (!timestamp) return "Sin fecha";
  try {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return "Ahora mismo";
    if (mins < 60) return `Hace ${mins} min`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;

    return date.toLocaleDateString("es-EC", {
      day: "2-digit", month: "short", year: "numeric",
    });
  } catch {
    return "Sin fecha";
  }
}

// ── Tarjeta de reporte ─────────────────────────────────────────────
function ReporteCard({ reporte, onPress }: { reporte: any; onPress: () => void }) {
  const prio  = PRIORIDAD_CONFIG[reporte.priority] || PRIORIDAD_CONFIG.Media;
  const estado = ESTADO_CONFIG[reporte.status]    || ESTADO_CONFIG.pendiente;
  const emoji  = CATEGORIA_EMOJI[reporte.category] || "📍";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Borde izquierdo de prioridad */}
      <View style={[styles.priorityBar, { backgroundColor: prio.color }]} />

      {/* Thumbnail */}
      {reporte.imageUrl ? (
        <Image source={{ uri: reporte.imageUrl }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
          <Text style={{ fontSize: 30 }}>{emoji}</Text>
        </View>
      )}

      {/* Contenido */}
      <View style={styles.cardContent}>
        {/* Fila superior */}
        <View style={styles.cardRow}>
          <Text style={styles.categoriaText} numberOfLines={1}>
            {emoji}  {reporte.category || "Sin categoría"}
          </Text>
          <View style={[styles.estadoBadge, { backgroundColor: estado.bg }]}>
            <Text style={[styles.estadoText, { color: estado.color }]}>
              {estado.icon} {estado.label}
            </Text>
          </View>
        </View>

        {/* Descripción */}
        <Text style={styles.descripcion} numberOfLines={2}>
          {reporte.description || "Sin descripción disponible"}
        </Text>

        {/* Pie */}
        <View style={styles.cardFooter}>
          <View style={[styles.prioBadge, { backgroundColor: prio.bg }]}>
            <Text style={[styles.prioridadText, { color: prio.color }]}>
              {prio.icon} {reporte.priority || "Media"}
            </Text>
          </View>
          <Text style={styles.fechaText}>{formatearFecha(reporte.createdAt)}</Text>
        </View>

        {/* Coordenadas */}
        {reporte.latitude !== undefined && reporte.latitude !== 0 && (
          <Text style={styles.coordText}>
            📍 {Number(reporte.latitude).toFixed(4)}, {Number(reporte.longitude).toFixed(4)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ── Stats ──────────────────────────────────────────────────────────
function ResumenStats({ reportes }: { reportes: any[] }) {
  const stats = [
    { label: "Total",      value: reportes.length,                                         color: "#58A6FF" },
    { label: "Pendientes", value: reportes.filter(r => r.status === "pendiente").length,   color: "#D29922" },
    { label: "Resueltos",  value: reportes.filter(r => r.status === "resuelto").length,    color: "#3FB950" },
    { label: "Alta prior.",value: reportes.filter(r => r.priority === "Alta").length,      color: "#F85149" },
  ];
  return (
    <View style={styles.statsRow}>
      {stats.map((s) => (
        <View key={s.label} style={[styles.statBox, { borderColor: s.color + "33" }]}>
          <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

// ── Pantalla principal ─────────────────────────────────────────────
export function MyReportsScreen({ navigation }: any) {
  const { reportes, loading, error, cargarReportes } = useReportes();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      cargarReportes();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarReportes();
    setRefreshing(false);
  };

  // Loading
  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3FB950" />
        <Text style={styles.loadingText}>Cargando reportes...</Text>
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>⚠️</Text>
        <Text style={styles.errorTitle}>Error al cargar</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={cargarReportes}>
          <Text style={styles.retryText}>🔄 Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />

      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3FB950"
          />
        }
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.screenTitle}>Mis Reportes</Text>
                <Text style={styles.screenSubtitle}>
                  {reportes.length} incidente{reportes.length !== 1 ? "s" : ""} registrado{reportes.length !== 1 ? "s" : ""}
                </Text>
              </View>
              <View style={styles.headerIcon}>
                <Text style={{ fontSize: 24 }}>🌱</Text>
              </View>
            </View>

            {/* Stats */}
            {reportes.length > 0 && <ResumenStats reportes={reportes} />}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <Text style={{ fontSize: 40 }}>📭</Text>
            </View>
            <Text style={styles.emptyTitle}>Sin reportes aún</Text>
            <Text style={styles.emptySubtitle}>
              Reporta tu primer problema urbano y la IA lo clasificará automáticamente
            </Text>
            <TouchableOpacity
              style={styles.btnNuevo}
              onPress={() => navigation.navigate("NewReport")}
            >
              <Text style={styles.btnNuevoText}>📷 Crear primer reporte</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <ReporteCard
            reporte={item}
            onPress={() => navigation.navigate("ReportDetail", { reporte: item })}
          />
        )}
      />

      {/* FAB */}
      {reportes.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("NewReport")}
          activeOpacity={0.85}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}