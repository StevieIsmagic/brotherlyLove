import React from 'react';
import { StyleSheet, View } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput.js';
import PlaceList from './src/components/PlaceList/PlaceList.js';
import placeImage from './src/assets/Heart.jpg';

export default class App extends React.Component {
  state = {
    places: []
  }

  placeAddedHandler = (placeName) => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(), 
          name: placeName,
          image: {
            uri: 'https://i.pinimg.com/236x/d3/61/cc/d361cc194b7cd8309d373cac8b8c54fe--fraternity-gifts-greek-crafts.jpg'
          }
        })
      }
    })
  }

  placeDeletedHandler = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== key;
        })
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemDeleted={this.placeDeletedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#BCF5E9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
