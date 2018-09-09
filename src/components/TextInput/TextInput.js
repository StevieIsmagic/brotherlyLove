import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const textInput = (props) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.placeInput}
      placeholder="Where Ya At?"
      value={this.state.placeName}
      onChangeText={props.changedHandler}
    />
    <Button 
      style={styles.placeButton}
      title="ADD"
      onPress={this.placeSubmitHandler}
    />
  </View>
)

export default textInput;