import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  state = {
    placeName: ''
  }

  placeNameChangedHandler = (val) => {
    this.setState({ placeName: val })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ width: 300 }} 
          placeholder="Where Ya At?"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
