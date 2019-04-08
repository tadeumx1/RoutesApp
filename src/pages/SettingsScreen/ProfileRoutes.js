import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
import { Container } from './styles'

import RouteItem from '../../components/RouteItem'

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as RouteActions } from '../../store/ducks/routes';

export class ProfileRoutes extends Component {

  state = {

    loading: true,
    refreshing: false,

  };

  componentDidMount() {

    this.props.getRoutes()

  }

  renderListItem = ({ item }) => <RouteItem route={item} />

  render() {
    return (
      <Container>
          <FlatList
            data={this.props.routes}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderListItem}
            onRefresh={this.props.routes}
            // refreshing={this.state.refreshing}
        />
      </Container>
    );
  }

}

const mapStateToProps = state => ({

  routes: state.routes.data || [],

});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RouteActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteDialog);

ProfileRoutes.propTypes = {

    navigation: PropTypes.object

}
