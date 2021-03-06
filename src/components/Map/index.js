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
import { Creators as RoutesActions } from '../../store/ducks/routes'
import MarkerDialog from '../MarkerDialog'
import MarkerEditDialog from '../MarkerEditDialog'
import RouteDialog from '../RouteDialog'

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
    routeDialog: null,
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

      // await this.setState({ active: false })

      if(this.state.routeCoordinates.length > 1) {

        await this.mapView.fitToCoordinates((this.state.routeCoordinates), {

          edgePadding: {
            right: getPixelSize(50),
            left: getPixelSize(50),
            top: getPixelSize(50),
            bottom: getPixelSize(50),
          }

        });

        setTimeout(() => {
          this.setState({ routeDialog: true })
          this.setState({ active: false })
        }, 1900)

      } else if (this.state.routeCoordinates.length === 0) {

        Snackbar.show({
          title: 'Não foi identificada a mudança de local, reinicie a rota',
          duration: Snackbar.LENGTH_LONG,
        });

      }

      clearInterval(this.intervalID)
      // this.props.stopTime()
      // this.props.stopRoute()

      // Chamar o stopTime e stopRoute que vão limpar os valores dentro do Dialog
      // Pois esses valores vão ser utilizados na hora de salvar a rota

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

      this.props.startTime(Date.now())

      this.intervalID = setInterval(() => {
        this.props.addTime(Date.now())
        this.props.addTimeDuration()
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

  handleRouteDialogCancel = (value) => {

    if(value) {
      this.setState({ routeDialog: false })
    }

  }

  handleMarkerEditDialogCancel = (value) => {

    if(value) {
      this.setState({ markerEditDialog: false })
    }

  }

  handleMarkerOnDragEnd = (e) => {

    this.setState({ 
      latitude: e.nativeEvent.coordinate.latitude, 
      longitude: e.nativeEvent.coordinate.longitude,
      selectCoordinates: e.nativeEvent.coordinate, 
      markerActive: true 
    })

    this.handleMarkerButton()

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

        this.props.addDistance(this.state.distanceTravelled)
        this.props.addAltitude(position.coords.altitude)

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
              draggable
              coordinate={this.state.selectCoordinates}
              onDragEnd={this.handleMarkerOnDragEnd}
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

        {this.state.routeDialog && (

          <RouteDialog visible={this.state.routeDialog} coordinates={this.state.routeCoordinates} 
            onSelectCancel={this.handleRouteDialogCancel} />

        )}

        {this.state.markerDialog && (

        <MarkerDialog visible={this.state.markerDialog} coordinates={this.state.selectCoordinates} 
          onSelectCancel={this.handleMarkerDialogCancel} />

        )}

        <View style={styles.buttonContainer}>
        
          {!this.state.markerActive && !this.state.active ? (
            <TouchableOpacity onPress={this.handleStartButton} style={styles.buttonRoute}>
              <View style={styles.buttonRouteCenter} />
            </TouchableOpacity>
          ): null} 

          {!this.state.markerActive && this.state.active ? (
            <TouchableOpacity onPress={this.handleStartButton} style={styles.buttonRoute}>
              <View style={styles.buttonRouteStop} />
            </TouchableOpacity>
          ): null}    

          {this.state.markerActive && (
            <TouchableOpacity onPress={this.handleMarkerButton} style={[styles.bubble, styles.button]}>
              <Text style={styles.bottomBarContent}>Marker</Text>
            </TouchableOpacity>
          )}
          
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

    buttonRoute: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingHorizontal: 18,
      paddingVertical: 20,
      marginHorizontal: 158,
      borderRadius: 200,
      width: 80,
      alignItems: "center",
    },

    buttonRouteCenter: {
      backgroundColor: '#FF0000', 
      height: 19, 
      width: 19, 
      borderRadius: 100
    },

    buttonRouteStop: {
      backgroundColor: '#000000', 
      height: 17, 
      width: 17, 
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

const mapDispatchToProps = dispatch => bindActionCreators({ ...TimeActions, ...ColorMarkerActions, ...RoutesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);