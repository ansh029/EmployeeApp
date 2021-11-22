import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import {NavigationContainer} from '@react-navigation/native';

const Providers = () => {
  return (
    <NavigationContainer>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </NavigationContainer>
  );
}

export default Providers;