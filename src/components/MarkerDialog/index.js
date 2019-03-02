import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import ColorButton from '../ColorButton'
import { TextOption, DialogInput } from './styles'
import { addMarker } from '../../services/marker'

export class MarkerDialog extends Component {

  state = {

    markerName: null

  };

  handleSubmit = async () => {

    if(this.state.markerName && this.props.color) {

      const newMarker = {
        name: this.state.markerName,
        color: this.props.color,
        location: {
            type: "Point",
            coordinates:
                [
                    this.props.coordinates.latitude,
                    this.props.coordinates.longitude
                ]
        }
      }
      // Verificar caso o usuário tem internet

      await addMarker(newMarker).then(response => {
        Snackbar.show({
          title: 'O Marcador foi adicionado com sucesso',
          duration: Snackbar.LENGTH_LONG
        });
      }).catch((error) => alert('Erro ao adicionar o marcador no mapa ' + JSON.stringify(error)))

      this.props.onSelectCancel(true)

    } else {

      Alert.alert(
        'Alerta',
        'Digite um nome e escolha uma cor para seu marcador'
      );

    }

  };

  handleInput = (value) => {
    this.setState({ markerName: value })
  }

  handleCancel = () => {
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
          <DialogInput 
            label="Nome do marcador" 
            onChangeText={this.handleInput} />
          <TextOption>Cor do marcador</TextOption>    
          <ColorButton />
          <TextOption>Cor escolhida {this.props.color}</TextOption>    
          <Dialog.Button label="Salvar" onPress={this.handleSubmit} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }

}

const mapStateToProps = state => ({

  color: state.colorMarker.colorSelected

});

export default connect(mapStateToProps, null)(MarkerDialog);

MarkerDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number),
  onSelectCancel: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,

}
