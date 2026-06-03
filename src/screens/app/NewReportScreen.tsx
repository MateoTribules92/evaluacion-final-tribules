// src/screens/app/MyReportsScreen.tsx
import React, { useState, useCallback } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, RefreshControl, StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { obtenerMisReportes } from "../../services/reportesService";
import { myReportsStyles as styles } from "../../styles/appStyle"; // ← ajusta si tu archivo se llama distinto

const PRIORIDAD_CONFIG: Record<string, { color: string; icon: string }> = {
  Alta:  { color: "#F85149", icon: "🔴" },
  Media: { color: "#D29922", icon: "🟡" },
  Baja:  { color: "#3FB950", icon: "🟢" },
};
const ESTADO_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  pendiente:  { label: "Pendiente",  color: "#D29922", icon: "⏳" },
  en_proceso: { label: "En proceso", color: "#58A6FF", icon: "🔧" },
  resuelto:   { label: "Resuelto",   color: "#3FB950", icon: "✅" },
};
const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada": "🗑️", "Bache o daño vial": "🚧",
  "Luminaria dañada": "💡", "Fuga de agua": "💧",
  "Grafiti o vandalismo": "🎨", "Señalética dañada": "🚦",
  "Árbol caído": "🌳", "Otro": "📍",
};

function formatearFecha(timestamp: any): string {
  if (!timestamp) return "Sin fecha";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("es-EC", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function ReporteCard({ reporte }: { reporte: any }) {
  const prio = PRIORIDAD_CONFIG[reporte.prioridad] || PRIORIDAD_CONFIG.Media;
  const estado = ESTADO_CONFIG[reporte.estado] || ESTADO_CONFIG.pendiente;
  const emoji = CATEGORIA_EMOJI[reporte.categoria] || "📍";

  return (
    <View style={styles.card}>
      {reporte.fotoUrl ? (
        <Image source={{ uri: reporte.fotoUrl }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
          <Text style={{ fontSize: 28 }}>{emoji}</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.categoriaText} numberOfLines={1}>
            {emoji} {reporte.categoria}
          </Text>
          <View style={[styles.estadoBadge, { backgroundColor: estado.color + "22" }]}>
            <Text style={[styles.estadoText, { color: estado.color }]}>
              {estado.icon} {estado.label}
            </Text>
          </View>
        </View>
        <Text style={styles.descripcion} numberOfLines={2}>{reporte.descripcionIA}</Text>
        <View style={styles.cardFooter}>
          <Text style={[styles.prioridadText, { color: prio.color }]}>
            {prio.icon} {reporte.prioridad}
          </Text>
          <Text style={styles.fechaText}>{formatearFecha(reporte.fechaCreacion)}</Text>
        </View>
        {reporte.latitud !== 0 && (
          <Text style={styles.coordText}>
            📍 {reporte.latitud?.toFixed(4)}, {reporte.longitud?.toFixed(4)}
          </Text>
        )}
      </View>
    </View>
  );
}

function ResumenStats({ reportes }: { reportes: any[] }) {
  const stats = [
    { label: "Total",       value: reportes.length,                                       color: "#58A6FF" },
    { label: "Pendientes",  value: reportes.filter(r => r.estado === "pendiente").length,  color: "#D29922" },
    { label: "Resueltos",   value: reportes.filter(r => r.estado === "resuelto").length,   color: "#3FB950" },
    { label: "Alta prior.", value: reportes.filter(r => r.prioridad === "Alta").length,    color: "#F85149" },
  ];
  return (
    <View style={styles.statsRow}>
      {stats.map((s) => (
        <View key={s.label} style={[styles.statBox, { borderColor: s.color + "44" }]}>
          <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function MyReportsScreen({ navigation }: any) {
  const [reportes, setReportes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarReportes = useCallback(async () => {
    try {
      const data = await obtenerMisReportes();
      setReportes(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCargando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCargando(true);
      cargarReportes();
    }, [cargarReportes])
  );

  if (cargando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3FB950" />
        <Text style={styles.loadingText}>Cargando tus reportes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={cargarReportes}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); cargarReportes(); }}
            tintColor="#3FB950"
          />
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.screenTitle}>🌱 Mis Reportes</Text>
            {reportes.length > 0 && <ResumenStats reportes={reportes} />}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 64, marginBottom: 16 }}>📭</Text>
            <Text style={styles.emptyTitle}>Sin reportes aún</Text>
            <Text style={styles.emptySubtitle}>
              Usa el botón + para reportar un problema urbano
            </Text>
            <TouchableOpacity
              style={styles.btnNuevo}
              onPress={() => navigation.navigate("NewReport")}
            >
              <Text style={styles.btnNuevoText}>+ Crear primer reporte</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => <ReporteCard reporte={item} />}
      />
      {reportes.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("NewReport")}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}