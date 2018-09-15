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
      borderColor: '#0D876D',
      borderRadius: 20,
      padding: 10,
      margin: 10
    }
})

export default defaultInput;