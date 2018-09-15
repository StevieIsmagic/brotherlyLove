import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AnnouncementsScreen from './src/screens/Announcements/Announcements';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens
Navigation.registerComponent('brotherlylove.AnnouncementsScreen', () => AnnouncementsScreen, store, Provider);
Navigation.registerComponent('brotherlylove.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('brotherlylove.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('brotherlylove.FindPlaceScreen', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('brotherlylove.PlaceDetailScreen', () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent('brotherlylove.SideDrawer', () => SideDrawer, store, Provider);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'brotherlylove.AuthScreen',
    title: 'Login'
  }
})