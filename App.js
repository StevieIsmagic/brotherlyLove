import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem.js';

export default class App extends React.Component {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangedHandler = (val) => {
    this.setState({ placeName: val })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      }
    })
  }

  render() {
    const placesOutput = this.state.places.map((place, i) => ( 
      <ListItem key={i} placeName={place} /> 
    ));
    return (
      <View style={styles.container}>  
        <TextInput 
          submitHandler={this.placeSubmitHandler} 
          changedHandler={this.placeNameChangedHandler}
        />
        <View style={styles.listContainer}>
          {placesOutput}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: "100%",
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
  listContainer: {
    width: "100%"
  }
});
