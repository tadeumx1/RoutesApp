import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import { Container, Title, InfoContainer, Info, InfoText } from "./styles";

const InformationCard = ({ title, iconName, infoText }) => {
  if (infoText === null) {
    infoText = "Sem rotas no momento";
  }

  if(infoText === 'NaN km') {
    infoText = '0.00 km'
  }

  return (
    <Container>
      <Title>{title}</Title>

      <InfoContainer>
        <Info>
          <Icon name={iconName} size={13} style={styles.infoIcon} />
          <InfoText>{infoText}</InfoText>
        </Info>
      </InfoContainer>
    </Container>
  );
};

const styles = StyleSheet.create({

  infoIcon: {

    color: "#666"
    
  }

});

export default InformationCard;
