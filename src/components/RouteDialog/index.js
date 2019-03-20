import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
import { TextOption, CheckNext, DialogInput } from './styles'
import CheckBox from 'react-native-check-box'

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as RouteActions } from '../../store/ducks/routes';

export class RouteDialog extends Component {

  state = {

    routeName: '',
    saveRouteNextTime: false,
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
          <Dialog.Title>Novo Rota</Dialog.Title>
          <Dialog.Description>
              Agora você pode escolher um nome, tipo e descrição para seu marcador
          </Dialog.Description>
          <DialogInput 
            label="Nome da rota" 
            onChangeText={this.handleInput} />
          <DialogInput 
            label="Descrição da rota" 
            onChangeText={this.handleInput} />
          <TextOption>Tipo da rota</TextOption>    
          <Picker
            selectedValue={this.state.routeType}
            style={{height: 50, marginLeft: 10, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({routeType: itemValue})
            }>
            <Picker.Item label="Walk" value="walk" />
            <Picker.Item label="Run" value="run" />
            <Picker.Item label="Skiing" value="skiing" />
            <Picker.Item label="Skating" value="sakting" />
            <Picker.Item label="Horse Riding" value="horseriding" />
            <Picker.Item label="Bike" value="bike" />
            <Picker.Item label="Motor" value="motor" />
            <Picker.Item label="Bus" value="bus" />
            <Picker.Item label="Car" value="car" />
            <Picker.Item label="Boat" value="boat" />
            <Picker.Item label="Flight" value="flight" />
          </Picker>
          <CheckNext
            onClick={()=> {
              this.setState({
                saveRouteNextTime: !this.state.saveRouteNextTime
              })
            }}
            isChecked={this.state.saveRouteNextTime}
            leftText={"Salvar automático da próxima vez"}
          />
          <Dialog.Button label="Salvar" onPress={this.handleSubmit} />
          <Dialog.Button label="Voltar" onPress={this.handleCancel} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }

}

const mapStateToProps = state => ({

  routeChanged: state.routes.routeChanged,
  error: state.colorMarker.errorOnAdd

});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RouteActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteDialog);

RouteDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number),
  onSelectCancel: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,

}
