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
    responsiveStyles: {
      pwContainerDirection: 'column',
      pwContainerJustifyContent: 'flex-start',
      pwWrapperWidth: '100%'

    }

  };

  constructor(props){
    super(props);

    Dimensions.addEventListener('change', dimensions => {
      this.setState({
        responsiveStyles: {
          pwContainerDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
          pwContainerJustifyContent: Dimensions.get('window').height > 500 ? 'flex-start' : 'space-between',
          pwWrapperWidth: Dimensions.get('window').height > 500 ? '100%' : '45%'
        }
      })
    });
  }

  loginHandler = () => {
    startMainTabs();
  }

  render() {
    let headingText = null;

    if (Dimensions.get('window').height > 500) {
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
          <ButtonWithBackground color='#53c294' onPress={() => alert('Login')}>Switch To Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput 
              placeholder='Your Email Address' 
              style={styles.input} 
            />
            <View 
              style={{
                flexDirection: this.state.responsiveStyles.pwContainerDirection,
                justifyContent: this.state.responsiveStyles.pwContainerJustifyContent
              }}
            >
              <View 
                style={{
                  width: this.state.responsiveStyles.pwWrapperWidth
                }}
              >
                <DefaultInput placeholder='Your Password' style={styles.input} />
              </View>
              <View 
                style={{
                  width: this.state.responsiveStyles.pwWrapperWidth
                }}
              >
                <DefaultInput placeholder='Reconfirm Password' style={styles.input} />
              </View>
            </View>
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
  },
  passwordContainer: {
    flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
    justifyContent: 'space-between'
  },
  passwordWrapper: {
    width: Dimensions.get('window').height > 500 ? '100%' : '45%'
  }
})

export default AuthScreen;