import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-mail' : 'ios-mail', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'brotherlylove.FindPlaceScreen',
          label: 'Find Brothers',
          title: 'Find SigEp Brothers',
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        },
        {
          screen: 'brotherlylove.SharePlaceScreen',
          label: 'Share Place',
          title: 'Share Your Location w/ Brothers',
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        },
        {
          screen: 'brotherlylove.AnnouncementsScreen',
          label: 'Announcements',
          title: 'Announcements',
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        }
      ],
      drawer: {
        left: {
          screen: 'brotherlylove.SideDrawer',

        }
      }
    });
  })
}
  
  export default startTabs;