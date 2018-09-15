import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AnnouncementsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true
        })
      }
    }
  }

  render() {
    return (
      <View>
        <Text>Announcements Screen ! :)</Text>
      </View>
    )
  }
}

export default AnnouncementsScreen