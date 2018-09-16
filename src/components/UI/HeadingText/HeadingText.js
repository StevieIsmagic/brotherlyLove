import React from 'react';
import { Text, StyleSheet } from 'react-native';

const headingText = props => (
  <Text 
    { ...props } 
    style={[styles.textHeading, props.style]}
  >
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 38,
    fontWeight: 'bold',
    // textDecorationStyle: 'double',
    // textDecorationColor: 'grey',
  }
});

export default headingText;