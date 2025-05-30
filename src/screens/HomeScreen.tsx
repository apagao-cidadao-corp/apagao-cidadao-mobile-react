import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { loadData, clearStorage } from '../services/storageService';
import { EventoApagao } from '../types';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../../App';

export default function HomeScreen({ navigation }) {
  const [eventos, setEventos] = useState<EventoApagao[]>([]);
  const { logout } = useContext(AuthContext);

  const carregarEventos = async () => {
    const dados = await loadData('eventos');
    setEventos(dados || []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarEventos();
      navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 30, marginRight: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Localização')}>
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Localização</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Tempo Interrupção')}>
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prejuízo')}>
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Prejuízo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Recomendação')}>
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Recomendação</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Sair</Text>
            </TouchableOpacity>
          </View>
        ),
      });
    });

    return unsubscribe;
  }, [navigation]);


  const limparTudo = () => {
    const confirmado = window.confirm('Deseja realmente apagar todos os registros?');
    if (confirmado) {
      clearStorage().then(() => {
        setEventos([]);
        window.alert('Todos os dados foram apagados!');
      });
    }
  };

  const handleLogout = () => {
    logout(); // Atualiza estado global e volta para Login
  };

  return (
    <View style={styles.container}>
      <CustomButton title="Registrar Evento" onPress={() => navigation.navigate('Cadastrar Evento')} />
      <Text style={styles.title}>Eventos Registrados</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Informação', { evento: item })}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.localizacao}</Text>
              <Text style={styles.cardDate}>{item.data}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <CustomButton title="Limpar Tudo" color="red" onPress={limparTudo} disabled={eventos.length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  cardDate: { fontSize: 12, color: '#666', textAlign: 'center' },
});
