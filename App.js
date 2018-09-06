import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

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
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.placeInput}
          placeholder="Where Ya At?"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          />
          <Button 
            style={styles.placeButton}
            title="ADD"
          />
        </View>
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
  inputContainer: {
    width: "100%",
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});
