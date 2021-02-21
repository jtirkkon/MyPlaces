import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import{ Input, Button } from'react-native-elements';
import{ ListItem } from'react-native-elements';

function MyPlaces({ navigation }) {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const saveAddress = () => {
    setAddressList([...addressList, address]);
    setAddress('');
  }

  const deleteAddress = (index) => {
    setAddressList(addressList.filter((item, i) => i !== index));
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('Map', {addressToShow: item})}  onLongPress={() => deleteAddress(index)}>
      <ListItem.Content >
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content>  
        <ListItem.Subtitle>show on map</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainerStyle}>
        <Input placeholder = 'Type in address' label = 'PLACEFINDER' onChangeText={text => setAddress(text)} value={address}/>
        <Button icon={{name: 'save'}} title='SAVE' onPress={saveAddress} buttonStyle={{width: 200}}></Button>
      </View>

      <FlatList 
          data={addressList}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={renderItem} 
        />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    paddingTop: 30
  },
  inputContainerStyle: {
    alignItems: 'center',  
  },
});

export default MyPlaces;