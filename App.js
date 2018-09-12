import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
// Register Screens
Navigation.registerComponent('brotherlylove.AuthScreen', () => AuthScreen);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'brotherlylove.AuthScreen',
    title: 'Login'
  }
})