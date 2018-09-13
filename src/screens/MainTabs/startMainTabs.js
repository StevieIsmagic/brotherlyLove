import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('ios-map', 30),
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('ios-mail', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'brotherlylove.FindPlaceScreen',
          label: 'Find Brothers',
          title: 'Find SigEp Brothers',
          icon: sources[0]
        },
        {
          screen: 'brotherlylove.SharePlaceScreen',
          label: 'Share Place',
          title: 'Share Your Location w/ Brothers',
          icon: sources[1]
        },
        {
          screen: 'brotherlylove.AnnouncementsScreen',
          label: 'Announcements',
          title: 'Announcements',
          icon: sources[2]
        }
      ]
    });
  })
}
  
  export default startTabs;