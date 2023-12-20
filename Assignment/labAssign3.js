import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.log('Error getting location:', error);
      }
    };

    getUserLocation();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: userLocation?.latitude || 0,
        longitude: userLocation?.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {userLocation && (
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Your Location"
          description="This is your current location"
          pinColor="blue"
        />
      )}
      <Marker
        coordinate={{ latitude: 33.7103, longitude: 72.9778 }}
        title="COMSATS Attock"
        description="COMSATS University Attock Campus"
        pinColor="green"
      />
    </MapView>
  );
};

export default App;
