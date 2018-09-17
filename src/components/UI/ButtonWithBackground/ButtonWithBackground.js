import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const buttonWithBackground = props => {
  const content = (
    <View style={[
      styles.button, 
      { backgroundColor: props.color }, 
      props.disabled ? styles.disabled : null 
      ]}
    >
      <Text style={props.disabled ? styles.disabledText : styles.text} >
        {props.children}
      </Text>
    </View>
  );
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  disabledText: {
    color: '#aaa'
  }
})

export default buttonWithBackground;
