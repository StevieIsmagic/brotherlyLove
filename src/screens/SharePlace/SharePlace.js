import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index'; 
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';
import { startAddPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
  // style top left hamburger nav button
  static navigatorStyle = {
    navBarButtonColor: '#512c6c'
  }

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      // image: {
      //   value: null,
      //   valid: false
      // }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  componentWillMount() {
    this.resetState();
  }

  resetState = () => {
    this.setState({
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        // image: {
        //   value: null,
        //   valid: false
        // }
      }
    });
  };

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({tabIndex: 0});
      // this.props.onStartAddPlace()
    }
  }

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onStartAddPlace();
      }
    }
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true
        })
      }
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    });
  }

  placeAddedHandler = () => {
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        // this.state.controls.image.value
      );
      this.resetState();
      // this.imagePicker.resetState();
      this.locationPicker.resetState();
  }

  locationPickedHandler = location => {
    console.log('LOCATIONPICKEDHANDLER IN SHAREPLACE', location);
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    });
  }

  // imagePickedHandler = image => {
  //   this.setState(prevState => {
  //     return {
  //       controls: {
  //         ...prevState.controls,
  //         image: {
  //           value: image,
  //           valid: true
  //         }
  //       }
  //     }
  //   });
  // }

  render() {
    let submitButton = (
      <Button 
        title='Share the Place!' 
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid 
          // || !this.state.controls.image.valid
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }

    return (
      <ScrollView>
        {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
        <View style={styles.container}>
          <MainText>
            <HeadingText>Where You At?</HeadingText>
          </MainText>
          {/* <PickImage 
            onImagePicked={this.imagePickedHandler} 
            ref={ref => this.imagePicker = ref} 
          /> */}
          <PickLocation 
            onLocationPick={this.locationPickedHandler} 
            ref={ref => this.locationPicker = ref} 
          />
          <PlaceInput 
            placeData={this.state.controls.placeName} 
            onChangeText={this.placeNameChangedHandler}
            />
          <View style={styles.button}>
            {submitButton}
          </View>
        {/* </KeyboardAvoidingView> */}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
   button: {
    margin: 8
   },
  //  previewImage: {
  //    width: '100%',
  //   height: '100%'
  // }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location)),
    onStartAddPlace: () => dispatch(startAddPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);