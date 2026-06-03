import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigation/typeNavigation';
import { detailStyles } from '../../styles/appStyle';
import { useCountryDetail } from '../../hooks/useCountries';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

type Props = StackScreenProps<AppStackParamList, 'CountryDetail'>;

export const DetailScreen = ({ route }: Props) => {
  const { code } = route.params;
  const { country, loading, error } = useCountryDetail(code);
  const [imgError, setImgError] = useState(false);

  if (loading) return <LoadingSpinner message='Cargando detalle...' />;
  if (error) return (
    <View style={detailStyles.errorContainer}>
      <Text style={detailStyles.errorText}>{error || 'País no encontrado'}</Text>
    </View>
  );

  const languages = Object.values(country?.languages ?? {}).join(', ');
  const currencies = Object.values(country?.currencies ?? {})
    .map(c => `${c.name} (${c.symbol})`)
    .join(', ');

  return (
    <ScrollView style={detailStyles.container} contentContainerStyle={detailStyles.content}>

      <Image
        source={
          imgError
            ? require('../../../assets/placeholder.png')
            : { uri: country?.flags.png }
        }
        style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 20, backgroundColor: '#EEF2FF' }}
        resizeMode="contain"
        onError={() => setImgError(true)}
      />

      <View style={detailStyles.meta}>
        <View style={detailStyles.badge}>
          <Text style={detailStyles.badgeText}>{country?.cca3}</Text>
        </View>
        <Text style={detailStyles.userId}>🌍 {country?.region}</Text>
      </View>

      <Text style={detailStyles.title}>{country?.name.common}</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>Nombre Oficial</Text>
      <Text style={detailStyles.body}>{country?.name.official}</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>🏙 Capital</Text>
      <Text style={detailStyles.body}>{country?.capital?.[0] ?? 'N/A'}</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>👥 Población</Text>
      <Text style={detailStyles.body}>{country?.population.toLocaleString()}</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>📐 Área</Text>
      <Text style={detailStyles.body}>{country?.area.toLocaleString()} km²</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>🗣 Idiomas</Text>
      <Text style={detailStyles.body}>{languages || 'N/A'}</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>💰 Monedas</Text>
      <Text style={detailStyles.body}>{currencies || 'N/A'}</Text>

    </ScrollView>
  );
};