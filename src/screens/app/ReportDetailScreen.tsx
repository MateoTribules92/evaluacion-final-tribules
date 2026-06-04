// src/screens/app/ReportDetailScreen.tsx
import React from "react";
import {
  View, Text, Image, ScrollView,
  StatusBar, TouchableOpacity, Linking, Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { reportDetailStyles as styles } from "../../styles/appStyle";

type Props = StackScreenProps<AppStackParamList, "ReportDetail">;

// ── Configs ───────────────────────────────────────────────────────
const PRIORIDAD: Record<string, { color: string; bg: string }> = {
  Alta:  { color: "#F85149", bg: "rgba(248,81,73,0.12)"  },
  Media: { color: "#D29922", bg: "rgba(210,153,34,0.12)" },
  Baja:  { color: "#3FB950", bg: "rgba(63,185,80,0.12)"  },
};

const ESTADO: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  pendiente:  { color: "#D29922", bg: "rgba(210,153,34,0.12)", label: "Pendiente",  icon: "⏳" },
  en_proceso: { color: "#58A6FF", bg: "rgba(88,166,255,0.12)", label: "En proceso", icon: "🔧" },
  resuelto:   { color: "#3FB950", bg: "rgba(63,185,80,0.12)",  label: "Resuelto",   icon: "✅" },
};

const CATEGORIA_EMOJI: Record<string, string> = {
  "Basura acumulada":     "🗑️",
  "Bache o daño vial":    "🚧",
  "Luminaria dañada":     "💡",
  "Fuga de agua":         "💧",
  "Grafiti o vandalismo": "🎨",
  "Señalética dañada":    "🚦",
  "Árbol caído":          "🌳",
  "Otro":                 "📍",
};

// ── Helpers ───────────────────────────────────────────────────────
function formatearFecha(timestamp: any): string {
  if (!timestamp) return "Sin fecha";
  try {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-EC", {
      weekday: "long", day: "2-digit",
      month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return "Sin fecha"; }
}

// ── Subcomponentes ────────────────────────────────────────────────
function InfoRow({ label, value, valueColor }: {
  label: string; value: string; valueColor?: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : {}]}>
        {value}
      </Text>
    </View>
  );
}

// ── Pantalla principal ────────────────────────────────────────────
export function ReportDetailScreen({ route }: Props) {
  const { reporte } = route.params;

  const prio   = PRIORIDAD[reporte.priority] || PRIORIDAD.Media;
  const estado = ESTADO[reporte.status]      || ESTADO.pendiente;
  const emoji  = CATEGORIA_EMOJI[reporte.category] || "📍";

  const abrirMapa = () => {
    if (!reporte.latitude || reporte.latitude === 0) return;
    const url = Platform.OS === "ios"
      ? `maps://?q=${reporte.latitude},${reporte.longitude}`
      : `geo:${reporte.latitude},${reporte.longitude}?q=${reporte.latitude},${reporte.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Foto hero ── */}
        {reporte.imageUrl ? (
          <Image source={{ uri: reporte.imageUrl }} style={styles.heroImage} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={{ fontSize: 60 }}>{emoji}</Text>
          </View>
        )}

        <View style={styles.content}>

          {/* ── Cabecera ── */}
          <View style={styles.headerSection}>
            <View style={styles.emojiBox}>
              <Text style={{ fontSize: 32 }}>{emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.categoria}>
                {reporte.category || "Sin categoría"}
              </Text>
              <View style={styles.badgesRow}>
                <View style={[styles.badge, { backgroundColor: prio.bg }]}>
                  <Text style={[styles.badgeText, { color: prio.color }]}>
                    ⚡ Prioridad {reporte.priority || "Media"}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: estado.bg }]}>
                  <Text style={[styles.badgeText, { color: estado.color }]}>
                    {estado.icon} {estado.label}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── Descripción ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Descripción</Text>
            <Text style={styles.sectionBody}>
              {reporte.description || "Sin descripción disponible."}
            </Text>
          </View>

          {/* ── Recomendación IA ── */}
          {reporte.recommendation && (
            <View style={[styles.section, styles.recomBox]}>
              <Text style={styles.recomTitle}>✅ Recomendación de la IA</Text>
              <Text style={styles.recomBody}>{reporte.recommendation}</Text>
            </View>
          )}

          {/* ── Detalles ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Detalles del reporte</Text>
            <View style={styles.infoCard}>
              <InfoRow
                label="Categoría"
                value={reporte.category || "—"}
              />
              <View style={styles.infoDiv} />
              <InfoRow
                label="Prioridad"
                value={reporte.priority || "—"}
                valueColor={prio.color}
              />
              <View style={styles.infoDiv} />
              <InfoRow
                label="Estado"
                value={`${estado.icon} ${estado.label}`}
                valueColor={estado.color}
              />
              <View style={styles.infoDiv} />
              <InfoRow
                label="Registrado"
                value={formatearFecha(reporte.createdAt)}
              />
              {reporte.address ? (
                <>
                  <View style={styles.infoDiv} />
                  <InfoRow label="Dirección" value={reporte.address} />
                </>
              ) : null}
            </View>
          </View>

          {/* ── Ubicación GPS ── */}
          {reporte.latitude !== undefined && reporte.latitude !== 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📍 Ubicación GPS</Text>
              <TouchableOpacity
                style={styles.gpsCard}
                onPress={abrirMapa}
                activeOpacity={0.8}
              >
                <View style={styles.gpsCoords}>
                  <View>
                    <Text style={styles.gpsLabel}>Latitud</Text>
                    <Text style={styles.gpsValue}>
                      {Number(reporte.latitude).toFixed(6)}
                    </Text>
                  </View>
                  <View style={styles.gpsDivider} />
                  <View>
                    <Text style={styles.gpsLabel}>Longitud</Text>
                    <Text style={styles.gpsValue}>
                      {Number(reporte.longitude).toFixed(6)}
                    </Text>
                  </View>
                </View>
                <View style={styles.gpsBtn}>
                  <Text style={styles.gpsBtnText}>🗺️ Abrir en mapa</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* ── ID ── */}
          <View style={styles.idRow}>
            <Text style={styles.idText}>ID: {reporte.id}</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}