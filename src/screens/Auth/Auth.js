import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/man.png';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeadingText> Welcome Brother </HeadingText>
          </MainText>
          <ButtonWithBackground color='#53c294' onPress={() => alert('Login')}>Switch To Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder='Your Email Address' style={styles.input} />
            <DefaultInput placeholder='Your Password' style={styles.input} />
            <DefaultInput placeholder='Reconfirm Password' style={styles.input} />
          </View>
          <ButtonWithBackground color='#53c294' onPress={this.loginHandler}>Submit</ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage:{
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee'
  }
})

export default AuthScreen;