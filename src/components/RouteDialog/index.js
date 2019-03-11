import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
import ColorButton from '../ColorButton'
import { TextOption, DialogInput } from './styles'
import { Marker } from 'react-native-maps';

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as RouteActions } from '../../store/ducks/routes';

export class RouteDialog extends Component {

  state = {

    routeName: null,
    routeDescription: null,
    routeType: null

  };

  handleSubmit = async () => {

    if(!this.props.route) {

    if(this.state.routeName && this.props.color) {

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
        Alert.alert(
          'Mensagem',
          'O marcador foi adicionado com sucesso'
        );
      }).catch((error) => alert('Erro ao adicionar o marcador no mapa ' + JSON.stringify(error)))

      this.props.addMarkerUpdate(true)

      this.props.onSelectCancel(true)

    } else {

      Alert.alert(
        'Mensagem',
        'Digite um nome e escolha uma cor para seu marcador'
      );

    }

    } else {

      this.handleSubmitUpdate()

    }

  };

  handleSubmitUpdate = async () => {

    if(this.props.marker) {

      // if(this.state.markerName && this.props.color && this.props.marker)

      const newMarker = {
        ...this.props.marker,
        name: !!this.state.markerName ? this.state.markerName : this.props.marker.name,
        color: !!this.props.color ? this.props.color : this.props.marker.color,
      }

      await this.props.changeMarker(newMarker)

      this.props.addMarkerUpdate(true)

      this.props.onSelectCancel(true)

    }

  }

  componentDidUpdate(prevProps) {

    if(this.props.markerChanged !== prevProps.markerChanged) {

      Alert.alert(
        'Mensagem',
        'O marcador foi atualizado com sucesso'
      );

    }

  }

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

  color: state.colorMarker.colorSelected,
  markerChanged: state.colorMarker.markerChanged,
  error: state.colorMarker.errorOnAdd

});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RouteActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteDialog);

RouteDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number),
  onSelectCancel: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  marker: PropTypes.objectOf(Marker),

}
