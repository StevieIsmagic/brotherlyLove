import { Navigation } from 'react-native-navigation';

const startTabs = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'brotherlylove.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place'
      },
      {
        screen: 'brotherlylove.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place'
      },
      {
        screen: 'brotherlylove.AnnouncementsScreen',
        label: 'Announcements',
        title: 'Announcements'
      }
    ]
  });
}

export default startTabs;