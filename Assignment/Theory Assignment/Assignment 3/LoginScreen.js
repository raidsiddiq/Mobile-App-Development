import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getUserData } from './AsyncStorageService';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedData = await getUserData(username);
      if (storedData && password === storedData.password) {
        navigation.navigate('CVForm', { userData: storedData });
      } else {
        console.error('Incorrect password or user not found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
