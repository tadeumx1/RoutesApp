import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './styles';

// import uberx from '../../assets/uberx.png' ;

export default class componentName extends Component {

  render() {
    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

        <TypeImage source={null} />
        <TypeTitle>UberX</TypeTitle>
        <TypeDescription>R$ 6,00</TypeDescription>

        <RequestButton onPress={() => {}}>
            <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
        </RequestButton>

      </Container>
    );
  }

}
