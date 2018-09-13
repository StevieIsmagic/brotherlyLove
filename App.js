import { Navigation } from 'react-native-navigation';

import AnnouncementsScreen from './src/screens/Announcements/Announcements';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

// Register Screens
Navigation.registerComponent('brotherlylove.AnnouncementsScreen', () => AnnouncementsScreen);
Navigation.registerComponent('brotherlylove.AuthScreen', () => AuthScreen);
Navigation.registerComponent('brotherlylove.SharePlaceScreen', () => SharePlaceScreen);
Navigation.registerComponent('brotherlylove.FindPlaceScreen', () => FindPlaceScreen);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'brotherlylove.AuthScreen',
    title: 'Login'
  }
})