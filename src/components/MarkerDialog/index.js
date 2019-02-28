import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import ColorButton from '../ColorButton'

import { addMarker } from '../../services/marker'

export default class MarkerDialog extends Component {

  state = {

    markerName: null

  };

  handleSubmit = async () => {

    if(this.state.markerName) {

      const newMarker = {
        name: this.state.markerName,
        color: "#FFFFFF",
        location: {
            type: "Point",
            coordinates:
                [
                    this.props.coordinates.latitude,
                    this.props.coordinates.longitude
                ]
        }
      }

      await addMarker(newMarker).then(response => {
        alert('Voltou da API ' + JSON.stringify(response))
      }).catch((error) => alert('Erro Marker ' + JSON.stringify(error)))

      this.props.onSelectCancel(true)

    } else {

      alert('Digite um nome para seu marker')

    }

  };

  handleInput = (value) => {
    this.setState({ markerName: value })
  }

  handleCancel = () => {

    // alert(JSON.stringify(this.props.coordinates))

    this.props.onSelectCancel(true)

  };

  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.visible}>
          <Dialog.Title>Novo Marcador</Dialog.Title>
          <Dialog.Description>
              Agora você pode escolher um nome e uma cor para seu novo marcador
          </Dialog.Description>
          <Dialog.Input 
            style={{ borderBottomWidth: 1 }} 
            label="Nome do marcador" 
            onChangeText={this.handleInput} />
          <Text style={{ fontSize: 14, marginLeft: 10, marginBottom: 10 }}>Cor do marcador</Text>    
          <ColorButton />
          <Dialog.Button label="Salvar" onPress={this.handleSubmit} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }

}

MarkerDialog.propTypes = {

    visible: PropTypes.bool.isRequired,
    coordinates: PropTypes.objectOf(PropTypes.number),
    onSelectCancel: PropTypes.func.isRequired,

}
