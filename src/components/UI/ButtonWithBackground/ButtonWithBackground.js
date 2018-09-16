import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const buttonWithBackground = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={[styles.button, {backgroundColor: props.color}]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#b9e5d3',
  },
  text: {
    color: 'white'
  }
})

export default buttonWithBackground;
