import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = (props) => (
  <TextInput 
    underlineColorAndroid="transparent" 
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]} 
  />
);

const styles = StyleSheet.create({
    input: {
      width: '100%',
      borderWidth: 0.5,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      marginTop: 8,
      marginBottom: 8
    },
    invalid: {
      backgroundColor: '#f9c0c0',
      borderColor: 'red'
    }
})

export default defaultInput;