import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import { TextOption, DialogInput, TouchableOpacityOption, ContainerButton } from './styles'
import { addMarker } from '../../services/marker'

import MarkerDialog from '../MarkerDialog'
import MarkerDeleteDialog from '../MarkerDeleteDialog'

export default class RouteEditDialog extends Component {

  state = {

    // markerName: null
    markerEditDialog: false,
    markerDeleteDialog: false

  };

  handleMarkerUpdate = () => {

    this.setState({ markerEditDialog: true })
    
  };

  handleMarkerDialogCancel = (value) => {

    if(value) {
      this.setState({ markerEditDialog: false })
    }

  }

  handleMarkerDeleteDialog = () => {

    this.setState({ markerDeleteDialog: true })

  };

  handleMarkerDeleteDialogCancel = (value) => {

    if(value) {
      this.setState({ markerDeleteDialog: false  })
    }

  };

  handleCancel = () => {
    this.props.onSelectCancel(true)
  };

  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.visible}>
          <Dialog.Title>Editar Marcador</Dialog.Title>
          <Dialog.Description>
              Deseja editar ou excluir seu marcador ?
          </Dialog.Description>
          <ContainerButton>
            <Dialog.Button label="Editar Marcador" onPress={this.handleMarkerUpdate} />
            <Dialog.Button label="Deletar Marcador" onPress={this.handleMarkerDeleteDialog} />
          </ContainerButton>
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
        </Dialog.Container>
                  
        <MarkerDialog visible={this.state.markerEditDialog} marker={this.props.marker}
          onSelectCancel={this.handleMarkerDialogCancel} />

        <MarkerDeleteDialog visible={this.state.markerDeleteDialog} marker={this.props.marker}
          onSelectCancel={this.handleMarkerDeleteDialogCancel} />

      </View>
    );
  }

}

MarkerEditDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  onSelectCancel: PropTypes.func.isRequired,

}
