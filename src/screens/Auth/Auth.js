import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Please Log In</Text>
        <Button title="Switch to Login" />
        <View style={styles.inputContainer}>
          <TextInput placeholder='Your Email Address' style={styles.input} underlineColorAndroid="transparent" />
          <TextInput placeholder='Your Password' style={styles.input} underlineColorAndroid="transparent" />
          <TextInput placeholder='Reconfirm Password' style={styles.input} underlineColorAndroid="transparent" />
        </View>
        <Button title="Submit" onPress={this.loginHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
})

export default AuthScreen;