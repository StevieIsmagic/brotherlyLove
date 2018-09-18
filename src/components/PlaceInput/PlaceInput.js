import React from 'react';
import { StyleSheet } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => (
  <DefaultInput 
    placeholder='Place Name'
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
    autoCorrect={false}
  />
);

export default placeInput;