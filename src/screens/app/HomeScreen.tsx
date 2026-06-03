import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AppStackParamList } from '../../navigation/typeNavigation';
import { homeStyles, countryCardStyles, searchStyles } from '../../styles/appStyle';
import { logout } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useCountries } from '../../hooks/useCountries';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Country } from '../../types/api';

type HomeScreenNavigationProp = StackScreenProps<AppStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {
  const { user } = useAuth();
  const { countries, loading, error, search, setSearch } = useCountries();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', 'Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => logout() },
    ]);
  };

  if (loading) return <LoadingSpinner message='Cargando países...' />;
  if (error) return (
    <View style={homeStyles.errorContainer}>
      <Text style={homeStyles.errorText}>{error}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={countryCardStyles.card}
      onPress={() => navigation.navigate('CountryDetail', { code: item.cca3 })}
    >
      <Image source={{ uri: item.flags.png }} style={countryCardStyles.flag} />
      <View style={countryCardStyles.info}>
        <Text style={countryCardStyles.name}>{item.name.common}</Text>
        <Text style={countryCardStyles.sub}>🌍 {item.region}</Text>
        <Text style={countryCardStyles.sub}>🏙 {item.capital?.[0] ?? 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.greeting}>¡Hola!</Text>
          <Text style={homeStyles.email} numberOfLines={1}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={homeStyles.sectionTitle}>Países</Text>

      <View style={searchStyles.container}>
        <TextInput
          style={searchStyles.input}
          placeholder="Buscar país..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {countries.length === 0 ? (
        <Text style={countryCardStyles.noResults}>No se encontraron resultados</Text>
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item) => item.cca3}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homeStyles.list}
        />
      )}
    </View>
  );
};