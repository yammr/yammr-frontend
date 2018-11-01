import { AsyncStorage } from 'react-native';

export const userService = {
  login,
  logout,
  getUser,
};

const AUTHENTICATION = '/users/authenticate';

async function login(username, password) {
  console.log('logging in');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  const userToken = 'inaibfiubau8y0e8h';

  // For when successfully implemented
  //user = await fetch(AUTHENTICATION, requestOptions);

  if (userToken)
    await AsyncStorage.setItem('userToken', JSON.stringify(userToken));
  console.log('returning ' + userToken);
  return userToken;
}

async function logout() {
  console.log('removing token');
  return await AsyncStorage.removeItem('userToken');
}

async function getUser() {
  return await AsyncStorage.getItem('userToken');
}
