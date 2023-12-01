import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getUserData } from './AsyncStorageService';

const CVDisplayScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await getUserData(username);
        setUserData(storedData);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <View>
      {userData ? (
        <>
          <Text>{`Username: ${userData.username}`}</Text>
          <Text>{`CV Data: ${userData.cvData || 'No CV data available'}`}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button
        title="Go Back to CV Form"
        onPress={() => navigation.navigate('CVForm', { userData })}
      />
    </View>
  );
};

export default CVDisplayScreen;
