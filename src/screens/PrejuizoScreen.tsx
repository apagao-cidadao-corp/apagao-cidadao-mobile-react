import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { saveData } from '../services/storageService';
import CustomButton from '../components/CustomButton';

export default function PrejuizoScreen() {
  const [prejuizo, setPrejuizo] = useState('');

  const salvarPrejuizo = async () => {
    if (prejuizo.trim() === '') return window.alert('Descreva os prejuízos!');
    await saveData('prejuizos', prejuizo);
    window.alert('Prejuízo salvo com sucesso!');
    setPrejuizo('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Descreva o(s) prejuízo(s):</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          numberOfLines={4}
          value={prejuizo}
          onChangeText={setPrejuizo}
          placeholder="Ex: Alimentos estragados, perda de vendas, etc."
        />
        <CustomButton title="Salvar Prejuízo" onPress={salvarPrejuizo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 16,
  },
});
