import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps'
import SigEpHeart from '../../assets/Heart.jpg'; 

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 25.96,
      longitude: -80.238892,
      latitudeDelta: 0.0122,
      longitudeDelta: 
        Dimensions.get('window').width / 
        Dimensions.get('window').height * 0.0122
    },
    locationChosen: false
  };

  picklLocationHandler = event => {
    const coordinates = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    })
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        },
        locationChosen: true
      };
    });
    this.props.onLocationPick({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    })
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordinatesEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.picklLocationHandler(coordinatesEvent);
    },
    err => {
      console.log(err);
      alert('Fetching the Position failed, please pick one manually!');
    })
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = 
        <MapView.Marker 
          coordinate={this.state.focusedLocation}
        > 
          <Image 
            source={SigEpHeart}  
            style={styles.marker}
          />
        </MapView.Marker>
    }

    return (
      <View style={styles.container}>
        
         <MapView 
          // provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.picklLocationHandler}
          ref={ref => this.map = ref}
         >
          {marker}
         </MapView>

        <View style={styles.button}>
          <Button title='Locate Me' onPress={this.getLocationHandler}/>
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
  marker: {
    height: 45,
    width: 45
  }
});

export default PickLocation;