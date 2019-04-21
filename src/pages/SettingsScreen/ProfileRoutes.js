import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
// import { Container } from './styles'

import RouteItem from '../../components/RouteItem'

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as RouteActions } from '../../store/ducks/routes';

export class ProfileRoutes extends Component {

  state = {

    loading: true,
    refreshing: false,

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
      <ScrollView>
         {this.props.routes.map((item) => <RouteItem key={item._id} route={item} />)}
      </ScrollView>
    );
  }

}

const mapStateToProps = state => ({

  routes: state.routes.data || [],

});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RouteActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRoutes);

ProfileRoutes.propTypes = {

  navigation: PropTypes.object

}
