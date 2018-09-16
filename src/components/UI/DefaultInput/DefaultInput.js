import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = (props) => (
  <TextInput 
    underlineColorAndroid="transparent" 
    {...props}
    style={[styles.input, props.style]} 
  />
);

const styles = StyleSheet.create({
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ed192c',
      borderRadius: 5,
      padding: 10,
      margin: 10
    }
})

export default defaultInput;