import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = (props) => (
  <TextInput 
    style={styles.input} 
    underlineColorAndroid="transparent" 
    {...props}
  />
);

const styles = StyleSheet.create({
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#0D876D',
      padding: 10,
      margin: 10
    }
})

export default defaultInput;