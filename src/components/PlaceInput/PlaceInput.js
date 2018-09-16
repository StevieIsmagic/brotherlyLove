import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

class PlaceInput extends Component {
  state = {
    placeName: '',
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  }

  // placeSubmitHandler = () => {
  //   if (this.state.placeName.trim() === "") {
  //     return;
  //   }

  //   this.props.onPlaceAdded(this.state.placeName)
  // }

  render(){
    return (
      <DefaultInput 
        placeholder='Place Name'
        value={this.state.placeName}
        onChangeText={this.placeNameChangedHandler}
      />
    )
  }
}

const styles = StyleSheet.create({
   
})

export default PlaceInput;