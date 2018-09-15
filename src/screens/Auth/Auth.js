import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={}>
          <MainText>
            <HeadingText> Please Log In </HeadingText>
          </MainText>
          <Button title="Switch to Login" />
          <View style={styles.inputContainer}>
            <DefaultInput placeholder='Your Email Address' style={styles.input} />
            <DefaultInput placeholder='Your Password' style={styles.input} />
            <DefaultInput placeholder='Reconfirm Password' style={styles.input} />
          </View>
          <Button title="Submit" onPress={this.loginHandler}/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee'
  }
})

export default AuthScreen;