import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage, Dimensions, TouchableOpacity, Platform, ScrollView} from 'react-native';

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
// import getDirections from 'react-native-google-maps-directions'

import Snackbar from 'react-native-snackbar';
import haversine from 'haversine';
import idx from 'idx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as TimeActions } from '../../store/ducks/time';

import { getPixelSize } from '../../utils';

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class Map extends Component {

  static navigationOptions = {

    header: null

  };

  state = {

    latitude: LATITUDE,
    longitude: LONGITUDE,
    routeCoordinates: [],
    selectCoordinates: null,
    distanceTravelled: 0,
    buttonText: '',
    active: false,
    markerActive: false,
    // currentTime: null,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
     latitude: LATITUDE,
     longitude: LONGITUDE
    })

  };

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,

  });

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
    (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
    );

    // const locationMessage = idx(this.props, (_) => _.message);

    /* if(locationMessage) {

        Snackbar.show({
            title: 'Localização não habilitada, ative a localização e reinicie o aplicativo',
            duration: Snackbar.LENGTH_LONG,
        });

    } */

  }

  handleStartButton = async () => {

    if(this.state.active) {

      await navigator.geolocation.clearWatch(this.watchID);

      this.mapView.fitToCoordinates((this.state.routeCoordinates), {

        edgePadding: {
          right: getPixelSize(50),
          left: getPixelSize(50),
          top: getPixelSize(50),
          bottom: getPixelSize(50),
        }

      });

      Snackbar.show({
        title: 'A rota foi encerrada',
        duration: Snackbar.LENGTH_LONG,
      });

    } else { 

      this.setState({ 

        routeCoordinates: [],
        distanceTravelled: 0,
        buttonText: '',
        active: true,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE
        })
  
       })

      setInterval(() => {
        this.props.addTime(new Date().toLocaleString())
      },1000)

      await this.getLocation()
  
      Snackbar.show({
        title: 'A rota está sendo gravada',
        duration: Snackbar.LENGTH_LONG,
      });

    }

  }

  handleMarkerButton = async () => {

    if(this.state.markerActive) {

      this.setState({ selectCoordinates: null, markerActive: false })

    }

  }

  getLocation = async () => {

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        
        const newCoordinate = {
          latitude,
          longitude
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
           }
         } else {

           // IOS

           coordinate.timing(newCoordinate).start();

         }
         this.setState({
           latitude,
           longitude,
           routeCoordinates: routeCoordinates.concat([newCoordinate]),
           distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
           prevLatLng: newCoordinate
         });

        // const speed = this.calcDistance(newCoordinate) /

       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1 }
    );

  };

  handlePressMap = (e) => {

    this.setState({ selectCoordinates: e.nativeEvent.coordinate, markerActive: true })

  }

  componentWillUnmount() {

    navigator.geolocation.clearWatch(this.watchID);

  }

  render() {

    return (

      <View style={styles.container}>

        <MapView
          style={styles.map}
          showUserLocation={true}
          followUserLocation
          loadingEnabled
          showsCompass={true}
          ref={el => this.mapView = el}
          onPress={(e) => this.handlePressMap(e)}
          region={this.getMapRegion()}
        > 
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />

          <Marker.Animated
          ref={marker => {
            this.marker = marker;
          }}
          coordinate={this.state.coordinate}
          />

          { this.state.selectCoordinates && (

            <MapView.Marker
              coordinate={this.state.selectCoordinates}
            >
            <MapView.Callout onPress={() => {}}>
              <Text>Coodernadas</Text>
            </MapView.Callout>
            </MapView.Marker>

          )}

        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.handleStartButton} style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
            Rota {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleMarkerButton} style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>Marker</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

    container: {
  
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
  
    },
  
    map: {
  
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
  
    },

    bubble: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20
    },

    latlng: {
      width: 200,
      alignItems: "stretch"
    },

    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: "center",
      marginHorizontal: 10
    },

    buttonContainer: {
      flexDirection: "row",
      marginVertical: 20,
      backgroundColor: "transparent"
    }
   
  });

/* const mapStateToProps = state => ({

    time: state.time,
  
    // favoritesCount: state.favorites.data.length,
    // error: state.favorites.errorOnAdd,
  
}); */
  
const mapDispatchToProps = dispatch => bindActionCreators(TimeActions, dispatch);

export default connect(null, mapDispatchToProps)(Map);