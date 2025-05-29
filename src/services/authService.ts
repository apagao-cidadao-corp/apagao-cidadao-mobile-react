import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (email: string, senha: string) => {
  const users = JSON.parse(await AsyncStorage.getItem('users') || '{}');
  if (users[email]) return false;
  users[email] = senha;
  await AsyncStorage.setItem('users', JSON.stringify(users));
  return true;
};

export const loginUser = async (email: string, senha: string) => {
  const users = JSON.parse(await AsyncStorage.getItem('users') || '{}');
  if (users[email] && users[email] === senha) {
    await AsyncStorage.setItem('loggedIn', 'true');
    return true;
  }
  return false;
};

export const getAuthStatus = async () => {
  const status = await AsyncStorage.getItem('loggedIn');
  return status === 'true';
};

export const logout = async () => {
  await AsyncStorage.removeItem('loggedIn');
};
