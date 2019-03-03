import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { TextOption, DialogInput, TouchableOpacityOption } from './styles'
import { addMarker } from '../../services/marker'

export class MarkerEditDialog extends Component {

  state = {

    // markerName: null

  };

  handleSubmit = async () => {

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
          <TouchableOpacityOption>
            <Text>Editar Marcador</Text>
          </TouchableOpacityOption>
          <TouchableOpacityOption>
            <Text>Deletar Marcador</Text>
          </TouchableOpacityOption>
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(MarkerEditDialog);

MarkerEditDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  onSelectCancel: PropTypes.func.isRequired,

}
