import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  View, Text, TouchableOpacity, Alert,
  ScrollView, StatusBar,
} from 'react-native';
import { AppStackParamList } from '../../navigation/typeNavigation';
import { homeStyles } from '../../styles/appStyle';
import { logout } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

type HomeScreenNavigationProp = StackScreenProps<AppStackParamList, 'Home'>;

const MVP_STEPS = [
  { num: "1", emoji: "📷", title: "Captura",     desc: "Toma foto del problema" },
  { num: "2", emoji: "📍", title: "Ubicación",   desc: "GPS automático" },
  { num: "3", emoji: "🤖", title: "Analiza IA",  desc: "Gemini Vision" },
  { num: "4", emoji: "☁️", title: "Guarda",      desc: "Firestore + Storage" },
];

const QUICK_STATS = [
  { emoji: "🗑️", label: "Basura" },
  { emoji: "🚧", label: "Baches" },
  { emoji: "💡", label: "Luminarias" },
  { emoji: "💧", label: "Fugas" },
  { emoji: "🎨", label: "Grafiti" },
  { emoji: "🚦", label: "Señales" },
];

export const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const userName = user?.email?.split('@')[0] || 'Usuario';

  return (
    <View style={{ flex: 1, backgroundColor: '#080C10' }}>
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={homeStyles.header}>
          <View>
            <Text style={homeStyles.greeting}>¡Hola, {userName}! 👋</Text>
            <Text style={homeStyles.email} numberOfLines={1}>{user?.email}</Text>
          </View>
          <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
            <Text style={homeStyles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        {/* ── Hero Banner ── */}
        <View style={homeStyles.heroBanner}>
          <View style={homeStyles.heroLeft}>
            <Text style={homeStyles.heroTag}>🌱 EcoMapa IA</Text>
            <Text style={homeStyles.heroTitle}>Reporta problemas{'\n'}urbanos con IA</Text>
            <Text style={homeStyles.heroSub}>
              Captura, analiza y registra incidentes en tu ciudad
            </Text>
          </View>
          <Text style={homeStyles.heroEmoji}>🏙️</Text>
        </View>

        {/* ── Botones principales ── */}
        <View style={homeStyles.mainButtons}>
          <TouchableOpacity
            style={homeStyles.btnMain}
            onPress={() => navigation.navigate('NewReport')}
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
            onPress={() => navigation.navigate('MyReports')}
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
        </View>

        {/* ── Flujo MVP ── */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionLabel}>¿CÓMO FUNCIONA?</Text>
          <View style={homeStyles.stepsRow}>
            {MVP_STEPS.map((s, i) => (
              <View key={s.num} style={{ alignItems: 'center', flex: 1 }}>
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

        {/* ── Categorías ── */}
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

        {/* ── Footer badge ── */}
        <View style={homeStyles.footerBadge}>
          <Text style={homeStyles.footerBadgeText}>
            🔒 Firebase Auth · Firestore · Gemini Vision
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};