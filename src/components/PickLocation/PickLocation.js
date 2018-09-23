import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps'

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: 
        Dimensions.get('window').width / 
        Dimensions.get('window').height * 0.0122
    },
    locationChosen: false
  };

  picklLocationHandler = event => {
    const coordinates = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        },
        locationChosen: true
      }
    })
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }

    return (
      <View style={styles.container}>
        
         <MapView 
          // provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          region={this.state.focusedLocation}
          onPress={this.picklLocationHandler}
          style={styles.map}
         >
          {marker}
         </MapView>

        <View style={styles.button}>
          <Button title='Locate Me' onPress={() => alert('you pressed the button!')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  },
});

export default PickLocation;