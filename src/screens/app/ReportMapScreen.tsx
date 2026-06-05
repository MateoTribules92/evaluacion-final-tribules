// src/screens/app/ReportMapScreen.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import MapView, {
  Marker,
  Callout,
  Region,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { useReportes } from "../../hooks/useReportes";
import { reportMapStyles as styles } from "../../styles/appStyle";

type Props = StackScreenProps<AppStackParamList, "ReportMap">;

const PRIORIDAD_COLOR: Record<string, string> = {
  Alta: "#F85149",
  Media: "#D29922",
  Baja: "#3FB950",
};

function tieneUbicacionValida(reporte: any) {
  const lat = Number(reporte.latitude);
  const lng = Number(reporte.longitude);

  return lat !== 0 && lng !== 0 && !Number.isNaN(lat) && !Number.isNaN(lng);
}

export function ReportMapScreen({ navigation }: Props) {
  const mapRef = useRef<MapView | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const { reportes, loading, cargarReportes } = useReportes();

  useFocusEffect(
    useCallback(() => {
      cargarReportes();
    }, [])
  );

  const reportesConUbicacion = useMemo(() => {
    return reportes.filter(tieneUbicacionValida);
  }, [reportes]);

  const initialRegion: Region = useMemo(() => {
    const primero = reportesConUbicacion[0];

    if (primero) {
      return {
        latitude: Number(primero.latitude),
        longitude: Number(primero.longitude),
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      };
    }

    return {
      latitude: -0.180653,
      longitude: -78.467834,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    };
  }, [reportesConUbicacion]);

  const ajustarPines = () => {
    if (!mapRef.current || reportesConUbicacion.length === 0) return;

    const coordinates = reportesConUbicacion.map((reporte: any) => ({
      latitude: Number(reporte.latitude),
      longitude: Number(reporte.longitude),
    }));

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 160,
        right: 60,
        bottom: 120,
        left: 60,
      },
      animated: true,
    });
  };

  if (loading && reportes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3FB950" />
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F1E9" />

      <MapView
        ref={mapRef}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={initialRegion}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton
        toolbarEnabled={false}
        loadingEnabled
        loadingIndicatorColor="#3FB950"
        loadingBackgroundColor="#F4F1E9"
        onMapReady={() => {
          setMapReady(true);
          setTimeout(ajustarPines, 500);
        }}
      >
        {reportesConUbicacion.map((reporte: any, index: number) => (
          <Marker
            key={reporte.id ?? `marker-${index}`}
            coordinate={{
              latitude: Number(reporte.latitude),
              longitude: Number(reporte.longitude),
            }}
            pinColor={PRIORIDAD_COLOR[reporte.priority] || "#D29922"}
            title={reporte.category || "Sin categoría"}
            description={reporte.description || "Sin descripción"}
          >
            <Callout onPress={() => navigation.navigate("ReportDetail", { reporte })}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>
                  {reporte.category || "Sin categoría"}
                </Text>

                <Text style={styles.calloutDescription} numberOfLines={3}>
                  {reporte.description || "Sin descripción"}
                </Text>

                <Text style={styles.calloutPriority}>
                  Prioridad {reporte.priority || "Media"}
                </Text>

                <Text style={styles.calloutLink}>Toca para ver detalle</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.topCard}>
        <Text style={styles.topTitle}>Mapa de reportes</Text>
        <Text style={styles.topSubtitle}>
          {reportesConUbicacion.length} incidente
          {reportesConUbicacion.length !== 1 ? "s" : ""} con ubicación GPS
        </Text>
      </View>

      {!mapReady && (
        <View style={styles.mapLoadingBadge}>
          <ActivityIndicator color="#3FB950" />
          <Text style={styles.mapLoadingText}>Cargando mapa...</Text>
        </View>
      )}

      {reportesConUbicacion.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Sin ubicaciones todavía</Text>
          <Text style={styles.emptyText}>
            Crea reportes con GPS para verlos en el mapa.
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={ajustarPines}
        style={styles.centerButton}
        activeOpacity={0.85}
      >
        <Text style={styles.centerButtonText}>⌖</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        activeOpacity={0.85}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
    </View>
  );
}