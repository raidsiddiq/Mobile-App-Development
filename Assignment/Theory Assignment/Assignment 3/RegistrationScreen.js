import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { saveUserData } from './AsyncStorageService';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      await saveUserData(username, { username, password });
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving user data:', error);
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
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;
