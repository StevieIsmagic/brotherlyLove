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
      borderColor: '#53c294',
      borderRadius: 5,
      padding: 10,
      marginTop: 8,
      marginBottom: 8
    }
})

export default defaultInput;