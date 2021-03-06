import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions/index';

class FindPlaceScreen extends Component {
  // style top left hamburger nav button
  static navigatorStyle = {
    navBarButtonColor: '#512c6c'
  }

  state = {
    placesLoaded: false,
    removeAnimation: new Animated.Value(1),
    placesLoadedAnimation: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  // componentDidMount() {
  //   this.props.onLoadPlaces();
  //   console.log("FIND PLACE AFTER CDM: ", this.state);
  // }

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onLoadPlaces()
      }
    }

    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true
        })
      }
    }
  }

  placesLoadedHandler = () => {
    /* 
    start an animation that fades in the list
    starts at a value of 0 and animates the opacity of the list
    */
   Animated.timing(this.state.placesLoadedAnimation, {
     toValue: 1,
     duration: 500,
     useNativeDriver: true
   }).start()
  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
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
        <Animated.View
          style={{
            opacity: this.state.placesLoadedAnimation
          }}
        >
          <PlaceList 
            places={this.props.places} 
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
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
    borderColor: 'black',
    backgroundColor: '#512c6c',
    borderWidth: 1,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 26
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);