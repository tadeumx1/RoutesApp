import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, ImageBackground, StyleSheet, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
// import { Container } from './styles'

import MarkerItem from '../../components/MarkerItem'

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as ColorMarkerActions } from '../../store/ducks/colorMarker';

const remote = '';

export class ProfileMarkers extends Component {

  state = {

  };

  async componentDidMount() {

    Snackbar.show({
      title: 'Carregando',
      duration: Snackbar.LENGTH_LONG,
    });

    await this.props.getMarkers()

  }

  /*
  
    <ImageBackground
        style={styles.image}
        source={{ uri: remote }}
    >

    </ImageBackground>

  */

  render() {
    return (

      <ImageBackground
        style={styles.image}
        source={{ uri: remote }}
      >

        { this.props.loading ? <ActivityIndicator size="large" color="#00ff00" />  : 
          <ScrollView>
            {this.props.markers.map((item) => <MarkerItem key={item._id} marker={item} />)}
          </ScrollView>  
        }

      </ImageBackground>

    );
  }

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    justifyContent: 'center',

  },

  image: {
      backgroundColor: '#ccc',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
  },

})

const mapStateToProps = state => ({

  markers: state.colorMarker.data || [],
  loading: state.colorMarker.loading
  
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ColorMarkerActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMarkers);

ProfileMarkers.propTypes = {

  navigation: PropTypes.object,

}
