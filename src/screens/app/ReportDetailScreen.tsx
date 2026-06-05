// src/screens/app/ReportDetailScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { doc, updateDoc } from "firebase/firestore";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { db } from "../../config/firebase";
import { reportDetailStyles as styles } from "../../styles/appStyle";

type Props = StackScreenProps<AppStackParamList, "ReportDetail">;

type EstadoReporte = "Pendiente" | "En proceso" | "Resuelto";

const PRIORIDAD: Record<string, { color: string; bg: string }> = {
  Alta: { color: "#F85149", bg: "rgba(248,81,73,0.12)" },
  Media: { color: "#D29922", bg: "rgba(210,153,34,0.12)" },
  Baja: { color: "#3FB950", bg: "rgba(63,185,80,0.12)" },
};

const ESTADO: Record<EstadoReporte, { color: string; bg: string; label: string; icon: string }> = {
  Pendiente: {
    color: "#D29922",
    bg: "rgba(210,153,34,0.12)",
    label: "Pendiente",
    icon: "⏳",
  },
  "En proceso": {
    color: "#58A6FF",
    bg: "rgba(88,166,255,0.12)",
    label: "En proceso",
    icon: "🔧",
  },
  Resuelto: {
    color: "#3FB950",
    bg: "rgba(63,185,80,0.12)",
    label: "Resuelto",
    icon: "✅",
  },
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

function normalizarEstado(status: any): EstadoReporte {
  if (status === "pendiente") return "Pendiente";
  if (status === "en_proceso") return "En proceso";
  if (status === "resuelto") return "Resuelto";

  if (status === "Pendiente") return "Pendiente";
  if (status === "En proceso") return "En proceso";
  if (status === "Resuelto") return "Resuelto";

  return "Pendiente";
}

function obtenerFechaRegistro(reporte: any) {
  return reporte.createdAt || reporte.fechaCreacion;
}

function formatearFecha(value: any): string {
  if (!value) return "Sin fecha";

  try {
    const date = value?.toDate ? value.toDate() : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Sin fecha";
    }

    return date.toLocaleString("es-EC", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Sin fecha";
  }
}

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
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

export function ReportDetailScreen({ route }: Props) {
  const { reporte } = route.params;

  const [estadoActual, setEstadoActual] = useState<EstadoReporte>(
    normalizarEstado(reporte.status || reporte.estado)
  );
  const [actualizandoEstado, setActualizandoEstado] = useState(false);

  const prio = PRIORIDAD[reporte.priority] || PRIORIDAD.Media;
  const estado = ESTADO[estadoActual];
  const emoji = CATEGORIA_EMOJI[reporte.category] || "📍";

  const abrirMapa = () => {
    if (!reporte.latitude || reporte.latitude === 0) return;

    const url =
      Platform.OS === "ios"
        ? `maps://?q=${reporte.latitude},${reporte.longitude}`
        : `geo:${reporte.latitude},${reporte.longitude}?q=${reporte.latitude},${reporte.longitude}`;

    Linking.openURL(url);
  };

  const cambiarEstado = async (nuevoEstado: EstadoReporte) => {
    if (!reporte.id) {
      Alert.alert("Error", "No se encontró el ID del reporte.");
      return;
    }

    try {
      setActualizandoEstado(true);

      await updateDoc(doc(db, "reportes", reporte.id), {
        status: nuevoEstado,
        updatedAt: new Date().toISOString(),
      });

      setEstadoActual(nuevoEstado);

      Alert.alert(
        "Estado actualizado",
        `El reporte ahora está en estado: ${nuevoEstado}.`
      );
    } catch (e: any) {
      console.error("Error actualizando estado:", e);
      Alert.alert("Error", e.message || "No se pudo actualizar el estado.");
    } finally {
      setActualizandoEstado(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {reporte.imageUrl ? (
          <Image source={{ uri: reporte.imageUrl }} style={styles.heroImage} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={{ fontSize: 60 }}>{emoji}</Text>
          </View>
        )}

        <View style={styles.content}>
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Descripción</Text>
            <Text style={styles.sectionBody}>
              {reporte.description || "Sin descripción disponible."}
            </Text>
          </View>

          {reporte.recommendation && (
            <View style={[styles.section, styles.recomBox]}>
              <Text style={styles.recomTitle}>✅ Recomendación de la IA</Text>
              <Text style={styles.recomBody}>{reporte.recommendation}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📌 Actualizar estado</Text>

            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
              {(["Pendiente", "En proceso", "Resuelto"] as EstadoReporte[]).map(
                (item) => {
                  const config = ESTADO[item];
                  const activo = estadoActual === item;

                  return (
                    <TouchableOpacity
                      key={item}
                      disabled={actualizandoEstado}
                      onPress={() => cambiarEstado(item)}
                      activeOpacity={0.85}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 9,
                        borderRadius: 18,
                        borderWidth: 1,
                        borderColor: activo ? config.color : "rgba(255,255,255,0.14)",
                        backgroundColor: activo ? config.bg : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Text
                        style={{
                          color: activo ? config.color : "#C9D1D9",
                          fontWeight: activo ? "700" : "500",
                          fontSize: 13,
                        }}
                      >
                        {config.icon} {config.label}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Detalles del reporte</Text>

            <View style={styles.infoCard}>
              <InfoRow label="Categoría" value={reporte.category || "—"} />

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
                value={formatearFecha(obtenerFechaRegistro(reporte))}
              />

              {reporte.address ? (
                <>
                  <View style={styles.infoDiv} />
                  <InfoRow label="Dirección" value={reporte.address} />
                </>
              ) : null}
            </View>
          </View>

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

          <View style={styles.idRow}>
            <Text style={styles.idText}>ID: {reporte.id || "Sin ID"}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}