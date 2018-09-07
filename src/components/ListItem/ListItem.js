import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const listItem = (props) => (
  <View styles={styles.listItem}>
    <Text>
      {props.placeName}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    color: "red"
  }
});

export default listItem;