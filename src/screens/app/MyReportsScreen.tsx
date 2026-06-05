// src/screens/app/MyReportsScreen.tsx
import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useReportes } from "../../hooks/useReportes";
import { myReportsStyles as styles } from "../../styles/appStyle";

const PRIORIDAD_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  Alta: { color: "#F85149", bg: "rgba(248,81,73,0.12)", icon: "🔴" },
  Media: { color: "#D29922", bg: "rgba(210,153,34,0.12)", icon: "🟡" },
  Baja: { color: "#3FB950", bg: "rgba(63,185,80,0.12)", icon: "🟢" },
};

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  Pendiente: { label: "Pendiente", color: "#D29922", bg: "rgba(210,153,34,0.12)", icon: "⏳" },
  "En proceso": { label: "En proceso", color: "#58A6FF", bg: "rgba(88,166,255,0.12)", icon: "🔧" },
  Resuelto: { label: "Resuelto", color: "#3FB950", bg: "rgba(63,185,80,0.12)", icon: "✅" },
};

const CATEGORIAS = [
  "Todas",
  "Basura acumulada",
  "Bache o daño vial",
  "Luminaria dañada",
  "Fuga de agua",
  "Grafiti o vandalismo",
  "Señalética dañada",
  "Árbol caído",
  "Otro",
];

const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada": "🗑️",
  "Bache o daño vial": "🚧",
  "Luminaria dañada": "💡",
  "Fuga de agua": "💧",
  "Grafiti o vandalismo": "🎨",
  "Señalética dañada": "🚦",
  "Árbol caído": "🌳",
  Otro: "📍",
  Todas: "📋",
};

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

    if (Number.isNaN(date.getTime())) return "Sin fecha";

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
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Sin fecha";
  }
}

function ReporteCard({ reporte, onPress }: { reporte: any; onPress: () => void }) {
  const estadoKey = normalizarEstado(reporte);
  const prio = PRIORIDAD_CONFIG[reporte.priority] || PRIORIDAD_CONFIG.Media;
  const estado = ESTADO_CONFIG[estadoKey] || ESTADO_CONFIG.Pendiente;
  const emoji = CATEGORIA_EMOJI[reporte.category] || "📍";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.priorityBar, { backgroundColor: prio.color }]} />

      {reporte.imageUrl ? (
        <Image source={{ uri: reporte.imageUrl }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
          <Text style={{ fontSize: 30 }}>{emoji}</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.categoriaText} numberOfLines={1}>
            {emoji} {reporte.category || "Sin categoría"}
          </Text>

          <View style={[styles.estadoBadge, { backgroundColor: estado.bg }]}>
            <Text style={[styles.estadoText, { color: estado.color }]}>
              {estado.icon} {estado.label}
            </Text>
          </View>
        </View>

        <Text style={styles.descripcion} numberOfLines={2}>
          {reporte.description || "Sin descripción disponible"}
        </Text>

        <View style={styles.cardFooter}>
          <View style={[styles.prioBadge, { backgroundColor: prio.bg }]}>
            <Text style={[styles.prioridadText, { color: prio.color }]}>
              {prio.icon} {reporte.priority || "Media"}
            </Text>
          </View>

          <Text style={styles.fechaText}>{formatearFecha(obtenerFecha(reporte))}</Text>
        </View>

        {Number(reporte.latitude) !== 0 && Number(reporte.longitude) !== 0 && (
          <Text style={styles.coordText}>
            📍 {Number(reporte.latitude).toFixed(5)}, {Number(reporte.longitude).toFixed(5)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function ResumenStats({ reportes }: { reportes: any[] }) {
  const stats = [
    {
      label: "Total",
      value: reportes.length,
      color: "#58A6FF",
    },
    {
      label: "Pendientes",
      value: reportes.filter((r) => normalizarEstado(r) === "Pendiente").length,
      color: "#D29922",
    },
    {
      label: "Resueltos",
      value: reportes.filter((r) => normalizarEstado(r) === "Resuelto").length,
      color: "#3FB950",
    },
    {
      label: "Alta prior.",
      value: reportes.filter((r) => r.priority === "Alta").length,
      color: "#F85149",
    },
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

function FiltroCategorias({
  categoriaActiva,
  onChange,
}: {
  categoriaActiva: string;
  onChange: (categoria: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 12 }}
    >
      {CATEGORIAS.map((categoria) => {
        const activa = categoriaActiva === categoria;

        return (
          <TouchableOpacity
            key={categoria}
            onPress={() => onChange(categoria)}
            activeOpacity={0.85}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: activa ? "#3FB950" : "rgba(255,255,255,0.14)",
              backgroundColor: activa ? "rgba(63,185,80,0.16)" : "rgba(255,255,255,0.04)",
            }}
          >
            <Text
              style={{
                color: activa ? "#3FB950" : "#C9D1D9",
                fontWeight: activa ? "700" : "500",
                fontSize: 13,
              }}
            >
              {CATEGORIA_EMOJI[categoria] || "📍"} {categoria}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export function MyReportsScreen({ navigation }: any) {
  const { reportes, loading, error, cargarReportes } = useReportes();
  const [refreshing, setRefreshing] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  useFocusEffect(
  useCallback(() => {
    cargarReportes();
  }, [])
);

  const reportesFiltrados = useMemo(() => {
    if (categoriaActiva === "Todas") return reportes;
    return reportes.filter((reporte: any) => reporte.category === categoriaActiva);
  }, [reportes, categoriaActiva]);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarReportes();
    setRefreshing(false);
  };

  if (loading && !refreshing && reportes.length === 0) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#3FB950" />
      <Text style={styles.loadingText}>Cargando reportes...</Text>
    </View>
  );
}

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
        data={reportesFiltrados}
        keyExtractor={(item, index) => item.id ?? `reporte-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3FB950" />
        }
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.screenTitle}>Mis Reportes</Text>
                <Text style={styles.screenSubtitle}>
                  {reportesFiltrados.length} de {reportes.length} incidente
                  {reportes.length !== 1 ? "s" : ""} registrado
                  {reportes.length !== 1 ? "s" : ""}
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Text style={{ fontSize: 24 }}>🌱</Text>
              </View>
            </View>

            {reportes.length > 0 && <ResumenStats reportes={reportes} />}

            {reportes.length > 0 && (
              <FiltroCategorias
                categoriaActiva={categoriaActiva}
                onChange={setCategoriaActiva}
              />
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <Text style={{ fontSize: 40 }}>
                {categoriaActiva === "Todas" ? "📭" : "🔎"}
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              {categoriaActiva === "Todas" ? "Sin reportes aún" : "Sin resultados"}
            </Text>

            <Text style={styles.emptySubtitle}>
              {categoriaActiva === "Todas"
                ? "Reporta tu primer problema urbano y la IA lo clasificará automáticamente"
                : `No tienes reportes en la categoría ${categoriaActiva}.`}
            </Text>

            {categoriaActiva === "Todas" ? (
              <TouchableOpacity
                style={styles.btnNuevo}
                onPress={() => navigation.navigate("NewReport")}
              >
                <Text style={styles.btnNuevoText}>📷 Crear primer reporte</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnNuevo}
                onPress={() => setCategoriaActiva("Todas")}
              >
                <Text style={styles.btnNuevoText}>Ver todas las categorías</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <ReporteCard
            reporte={item}
            onPress={() => navigation.navigate("ReportDetail", { reporte: item })}
          />
        )}
      />

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