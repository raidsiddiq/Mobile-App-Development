import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { saveUserData, getUserData } from './AsyncStorageService';

const CVFormScreen = ({ route }) => {
  const { userData } = route.params;
  const [cvData, setCVData] = useState('');

  useEffect(() => {
    setCVData(userData.cvData || '');
  }, [userData]);

  const handleSaveCVData = async () => {
    try {
      await saveUserData(userData.username, { ...userData, cvData });
    } catch (error) {
      console.error('Error saving CV data:', error);
    }
  };

  return (
    <View>
      <Text>Welcome, {userData.username}!</Text>
      <TextInput
        placeholder="Enter CV Data"
        multiline
        value={cvData}
        onChangeText={setCVData}
      />
      <Button title="Save" onPress={handleSaveCVData} />
    </View>
  );
};

export default CVFormScreen;
