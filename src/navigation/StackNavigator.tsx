import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const StackNavigator = () => {

  const{user, loading} = useAuth();

  if(loading) return <LoadingSpinner message="Inicando aplicación..."/>

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack/>}      
    </NavigationContainer>
  );
};

