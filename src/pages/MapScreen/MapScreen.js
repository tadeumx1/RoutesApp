import React, { Component } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';

import Map from '../../components/Map'

import Snackbar from 'react-native-snackbar';

export default class MapScreen extends Component {

  state = {

    location: false,

  }

  async requestLocationPermission() {
    try {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'App Location Permission',
                'message': 'Maps App needs access to your map ' +
                    'so you can be navigated.'
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
            return true;

        } else {
            console.log("location permission denied");
            return false;
        }

    } catch (err) {
        console.warn(err)
    }

  }

  async componentDidMount() {
    let isGranted = await this.requestLocationPermission();
    if (isGranted) {

      await this.setState({ location: true })

      /* await Snackbar.show({
        title: 'Acesso a localização concluído',
        duration: Snackbar.LENGTH_LONG,
      }); */

    } else {

      Snackbar.show({
        title: 'Localização não habilitada, ative a localização e reinicie o aplicativo',
        duration: Snackbar.LENGTH_LONG,
      });

    }

  }

  render() {
    return (

      <View style={styles.container}>

      {this.state.location ? ( 
        <Map /> 
      ) : <Map message={true} />}
        
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

});