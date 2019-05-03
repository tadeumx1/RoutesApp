import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, ImageBackground, StyleSheet, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
// import { Container } from './styles'

import RouteItem from '../../components/RouteItem'

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as RouteActions } from '../../store/ducks/routes';

const remote = 'https://images.unsplash.com/photo-1551578547-eeff3b82183a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';

export class ProfileRoutes extends Component {

  state = {

    // loading: true,
    // refreshing: false,

  };

  async componentDidMount() {

    Snackbar.show({
      title: 'Carregando',
      duration: Snackbar.LENGTH_LONG,
    });

    await this.props.getRoutes()

  }

  render() {
    return ( 

      <ImageBackground
        style={styles.image}
        source={{ uri: remote }}
      >

        { this.props.loading ? <ActivityIndicator size="large" color="#00ff00" />  : 
          <ScrollView>
            {this.props.routes.map((item) => <RouteItem key={item._id} route={item} />)}
          </ScrollView>  
        }

      </ImageBackground>

    );
  }

}

const styles = StyleSheet.create({

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

  routes: state.routes.data || [],
  loading: state.routes.loading

});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RouteActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRoutes);

ProfileRoutes.propTypes = {

  navigation: PropTypes.object,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      geo: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(
          PropTypes.shape({
            zeroCoordinate: PropTypes.number,
            oneCoordinate: PropTypes.number,
          })
        )
      }),
      _id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
      distance: PropTypes.number,
      duration: PropTypes.number,
      author: PropTypes.objectOf(
        PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          email: PropTypes.string,
          createdAt: PropTypes.date,
          updatedAt: PropTypes.date,
        })
      ),
      createdAt: PropTypes.date,
      updatedAt: PropTypes.date,
    })
  )

}
