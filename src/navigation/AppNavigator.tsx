import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Apagão Cidadão" component={HomeScreen} />
      <Stack.Screen name="Cadastrar Evento" component={FormScreen} />
      <Stack.Screen name="Informação" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
