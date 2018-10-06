import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AnnouncementsScreen extends Component {
  // style top left hamburger nav button
  static navigatorStyle = {
    navBarButtonColor: '#512c6c'
  }

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
        <Text>
          Think of advertizing opportunities for brothers and their personal initiatives. 
          For example, right now a FlNu initiative is trying to raise money.
          Maybe create a directory of brother owned establishments.
          How can we better leverage the SigEp Community?
        </Text>
      </View>
    )
  }
}

export default AnnouncementsScreen