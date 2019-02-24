import React, { Component } from "react";
import { View, Text } from "react-native";

import Dialog from "react-native-dialog";

export default class MarkerDialog extends Component {

  state = {

    markerName: null

  };

  handleSubmit = () => {

    this.props.onSelectCancel(true)

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
          <Dialog.Input 
            style={{ borderBottomWidth: 1 }} 
            label="Nome do marcador" 
            onChangeText={this.handleInput} />
          <Dialog.Button label="Salvar" onPress={this.handleSubmit} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }

}
