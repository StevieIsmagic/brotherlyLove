import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';

class PlaceInput extends Component {
  state = {
    placeName: '',
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.props.onPlaceAdded(this.state.placeName)
  }

  render(){
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Where Ya At?"
          value={this.state.placeName}
          style={styles.placeInput}
          onChangeText={this.placeNameChangedHandler}
          />
        <Button 
          title="ADD"
          style={styles.placeButton}
          onPress={this.placeSubmitHandler}
          />
      </View>
      )
    }
}

const styles = StyleSheet.create({
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
})

export default PlaceInput;