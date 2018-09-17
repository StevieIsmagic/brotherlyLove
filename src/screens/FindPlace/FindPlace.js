import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  // style top left hamburger nav button
  static navigatorStyle = {
    navBarButtonColor: '#53c294'
  }

  state = {
    placesLoaded: false,
    removeAnimation: new Animated.Value(1)
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

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  itemSelectedHandler = key => {
   const selPlace = this.props.places.find(place => {
     return place.key === key
   });

    this.props.navigator.push({
      screen: 'brotherlylove.PlaceDetailScreen',
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    });
  }

  render() {
    let content = (
      <Animated.View 
        style={{
          opacity: this.state.removeAnimation,
          transform: [
            {
              scale: this.state.removeAnimation.interpolate({
                inputRange: [0,1],
                outputRange: [5, 1]
              })
            }
          ]
        }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>
              Find Brothers
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    ); 

    if (this.state.placesLoaded) {
      content = (
        <PlaceList 
          places={this.props.places} 
          onItemSelected={this.itemSelectedHandler}
        />
      );
    }

    return (
      <View style={this.state.placesLoaded === true ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: '#53c294',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);