import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/man.png';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };

  constructor(props){
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }
  updateStyles = (dimensions) => {
    this.setState({
      viewMode: dimensions.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  loginHandler = () => {
    startMainTabs();
  }

  render() {
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText> Welcome Brother </HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color='#f6b12d' onPress={() => alert('Login')}>Switch To Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput 
              placeholder='Your Email Address' 
              style={styles.input} 
            />
            <View 
              style={
                this.state.viewMode === 'portrait' 
                ? styles.portraitPasswordContainer 
                : styles.landscapePasswordContainer
              }
            >
              <View 
                style={
                  this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder='Your Password' style={styles.input} />
              </View>
              <View 
                style={
                  this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder='Reconfirm Password' style={styles.input} />
              </View>
            </View>
          </View>
          <ButtonWithBackground color='#f6b12d' onPress={this.loginHandler}>Submit</ButtonWithBackground>
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
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
})

export default AuthScreen;