import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import MapView, { Marker} from'react-native-maps';
//N9Z9QLAWypDUl5H5fX46TfSqeGJxoruG

function Map ({route}) {
  const {addressToShow} = route.params;
  
  const [address, setAddress] = useState(addressToShow);
  const [position, setPosition] = useState(null);
  const [markerAddress, setMarkerAddress] = useState({street: '', city: ''});
  
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=N9Z9QLAWypDUl5H5fX46TfSqeGJxoruG&inFormat=kvp&outFormat=json&location=Finland%2C+${address}&thumbMaps=false`
  
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPosition({latitude: data.results[0].locations[0].latLng.lat, longitude: data.results[0].locations[0].latLng.lng});
        setMarkerAddress({street: data.results[0].locations[0].street, city: data.results[0].locations[0].adminArea5});
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!position) {
    return (
      <View style={styles.container}>
        <Text>Loading map...</Text>
      </View>
    );
  } else {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.mapViewStyle}
            region={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta:0.0032,
              longitudeDelta:0.0021,
            }}>
            <Marker
              coordinate={{
              latitude: position.latitude,
              longitude: position.longitude}}
              title=''
              onPress={() =>
                Alert.alert(
                  `${markerAddress.street}, ${markerAddress.city}`,
                )}
            />
          </MapView>
          <StatusBar style="auto" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapViewStyle: {
    flex: 1,
    height: 300,
    width: 360
  },
});

export default Map;