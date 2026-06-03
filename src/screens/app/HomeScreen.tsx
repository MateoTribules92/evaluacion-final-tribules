import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AppStackParamList } from '../../navigation/typeNavigation';
import { homeStyles } from '../../styles/appStyle';
import { logout } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

type HomeScreenNavigationProp = StackScreenProps<AppStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', 'Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <View style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.greeting}>¡Hola!</Text>
          <Text style={homeStyles.email} numberOfLines={1}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* EcoMapa */}
      <View style={homeStyles.ecomapaContainer}>
        <Text style={homeStyles.ecomapaTitle}>🌱 EcoMapa IA</Text>
        <Text style={homeStyles.ecomapaSubtitle}>
          Reporta problemas urbanos con inteligencia artificial
        </Text>
        <View style={homeStyles.ecomapaButtons}>
          <TouchableOpacity
            style={homeStyles.ecomapaBtn}
            onPress={() => navigation.navigate('NewReport')}
          >
            <Text style={homeStyles.ecobtnEmoji}>📷</Text>
            <Text style={homeStyles.ecobtnText}>Nuevo Reporte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[homeStyles.ecomapaBtn, homeStyles.ecobtnOutline]}
            onPress={() => navigation.navigate('MyReports')}
          >
            <Text style={homeStyles.ecobtnEmoji}>📋</Text>
            <Text style={[homeStyles.ecobtnText, homeStyles.ecobtnOutlineText]}>
              Mis Reportes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};