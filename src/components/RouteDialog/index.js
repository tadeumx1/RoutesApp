import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';
import idx from 'idx';
import { TextOption, CheckNext, PickerType, DialogInput } from './styles'
import CheckBox from 'react-native-check-box'

import { Creators as TimeActions } from '../../store/ducks/time';
import { Creators as RouteActions } from '../../store/ducks/routes';

export class RouteDialog extends Component {

  state = {

    routeName: '',
    saveRouteNextTime: false,
    routeDescription: null,
    routeType: 'walk'

  };

  handleSubmit = async () => {

    if(!this.props.route) {

    if(this.state.routeName && this.state.routeType && this.state.routeDescription) {

      // Transforming route points to MongoDB GeoJSON way from Google Maps Routes Way

      let newCoordinates = [];

      for (let i = 0; i < this.props.coordinates.length; i++) {

        var newArray = this.props.coordinates[i];
        newCoordinates.push([newArray.latitude, newArray.longitude]);

      }

      const newRoute = {
        name: this.state.routeName,
        description: this.state.routeDescription,
        type: this.state.routeType,
        distance: parseFloat(this.props.distance).toFixed(2),
        duration: this.props.durationNumber,
        geo: {

          type: "LineString",
          coordinates: newCoordinates

        }
      }
      
      // Verificar caso o usuário tem internet

      this.props.addRouteSave(newRoute)

      this.props.onSelectCancel(true)

    } else {

      Alert.alert(
        'Mensagem',
        'Digite um nome e descriçao além, de escolher um tipo para a rota'
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

    if(this.props.routeAdd !== prevProps.routeAdd) {

      Alert.alert(
        'Mensagem',
        'A rota foi adicionada com sucesso'
      );

    }

  }

  handleCheckBox = () => {
    this.setState({
      saveRouteNextTime: !this.state.saveRouteNextTime
    })
  }

  handleInput = (value) => {
    this.setState({ routeName: value })
  }

  handleDescriptionInput = (value) => {
    this.setState({ routeDescription: value })
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
            onChangeText={this.handleDescriptionInput} />
          <TextOption>Tipo da rota</TextOption>    
          <PickerType
            selectedValue={this.state.routeType}
            onValueChange={(itemValue, itemIndex) => this.setState({ routeType: itemValue })
            }>
            <Picker.Item label="Walk" value="walk" />
            <Picker.Item label="Run" value="run" />
            <Picker.Item label="Skiing" value="skiing" />
            <Picker.Item label="Skating" value="skating" />
            <Picker.Item label="Horse Riding" value="horseriding" />
            <Picker.Item label="Bike" value="bike" />
            <Picker.Item label="Motor" value="motor" />
            <Picker.Item label="Bus" value="bus" />
            <Picker.Item label="Car" value="car" />
            <Picker.Item label="Boat" value="boat" />
            <Picker.Item label="Flight" value="flight" />
          </PickerType>
          <CheckNext
            onClick={this.handleCheckBox}
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
  distance: state.routes.distance,
  routeAdd: state.routes.routeAdd,
  duration: state.time.durationTime,
  durationNumber: state.time.durationTimeNumber,
  error: state.routes.errorOnAdd

});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RouteActions, ...TimeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteDialog);

/* RouteDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number),
  onSelectCancel: PropTypes.func.isRequired,

} */
