import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { getAuthStatus } from './src/services/authService';
import { ActivityIndicator, View } from 'react-native';

// Contexto para login/logout acessível globalmente
export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    getAuthStatus().then(setIsAuthenticated);
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{
      login: () => setIsAuthenticated(true),
      logout: () => setIsAuthenticated(false),
    }}>
      <NavigationContainer>
        {isAuthenticated ? (
          <AppNavigator />
        ) : (
          <AuthNavigator onLogin={() => setIsAuthenticated(true)} />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
