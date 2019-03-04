import React, { Component } from 'react';
import {View, Text, StyleSheet, AsyncStorage, Dimensions, TouchableOpacity, Platform, ScrollView} from 'react-native';

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
// import getDirections from 'react-native-google-maps-directions'

import Snackbar from 'react-native-snackbar';
import haversine from 'haversine';
import idx from 'idx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as ColorMarkerActions } from '../../store/ducks/colorMarker';
import MarkerDialog from '../MarkerDialog'
import MarkerEditDialog from '../MarkerEditDialog'

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
    markerDialog: false,
    active: false,
    markerEditDialog: false,
    markerSelected: null,
    markerActive: false,
    // currentTime: null,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
     latitude: LATITUDE,
     longitude: LONGITUDE,
    })

  };

  intervalID = 0;

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

    this.props.getMarkers()

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

      await this.setState({ active: false })

      await this.mapView.fitToCoordinates((this.state.routeCoordinates), {

        edgePadding: {
          right: getPixelSize(50),
          left: getPixelSize(50),
          top: getPixelSize(50),
          bottom: getPixelSize(50),
        }

      });

      clearInterval(this.intervalID)
      this.props.stopTime()

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

      this.props.startTime(new Date().toLocaleString())

      this.intervalID = setInterval(() => {
        this.props.addTime(new Date().toLocaleString())
      }, 1000)

      await this.getLocation()
  
      Snackbar.show({
        title: 'A rota está sendo gravada',
        duration: Snackbar.LENGTH_LONG,
      });

    }

  }

  handleMarkerButton = async () => {

    if(this.state.markerActive) {
      // this.setState({ selectCoordinates: null, markerActive: false })
      this.setState({ markerDialog: true })
    }

  }

  componentDidUpdate(prevProps) {

    if(this.props.markerUpdate === true) {

      this.props.getMarkers()

      this.props.addMarkerUpdate(false)

    }

  }

  renderMarkersMap = () => {

    // const MarkersMap = idx(this.props, _ => _.markers) || []
    // console.tron.log(MarkersMap)

    const makePoint = coordinate => ({ latitude: coordinate[0], longitude: coordinate[1] });

    if(!this.state.active) {
      return (
        this.props.markers.map(marker => (
          <MapView.Marker
            key={marker._id}
            coordinate={makePoint(marker.location.coordinates)}
            title={marker.name}
            pinColor={marker.color}>
            <MapView.Callout onPress={() => this.setState({ markerEditDialog: true, markerSelected: marker })} />
          </MapView.Marker>
        ))
      )
    }

    return null

  }

  handleMarkerDialogCancel = (value) => {

    if(value) {
      this.setState({ selectCoordinates: null, markerDialog: false, markerActive: false })
    }

  }

  handleMarkerEditDialogCancel = (value) => {

    if(value) {
      this.setState({ markerEditDialog: false })
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

    if(!this.state.active) {
      this.setState({ 
        latitude: e.nativeEvent.coordinate.latitude, 
        longitude: e.nativeEvent.coordinate.longitude,
        selectCoordinates: e.nativeEvent.coordinate, 
        markerActive: true 
      })
    }

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

          {this.state.active && (
          
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            /> 

          )}

          {this.renderMarkersMap()}

          {this.state.selectCoordinates && (

            <MapView.Marker
              coordinate={this.state.selectCoordinates}
            >
            <MapView.Callout onPress={() => {}}>
              <Text>Coodernadas</Text>
            </MapView.Callout>
            </MapView.Marker>

          )}

        </MapView>

        {this.state.markerEditDialog && (

        <MarkerEditDialog visible={this.state.markerEditDialog} marker={this.state.markerSelected}
          onSelectCancel={this.handleMarkerEditDialogCancel} />

        )}

        {this.state.markerDialog && (

        <MarkerDialog visible={this.state.markerDialog} coordinates={this.state.selectCoordinates} 
          onSelectCancel={this.handleMarkerDialogCancel} />

        )}

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

const mapStateToProps = state => ({

  markerUpdate: state.colorMarker.markerUpdate,
  markers: state.colorMarker.data || []
  
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...TimeActions, ...ColorMarkerActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);