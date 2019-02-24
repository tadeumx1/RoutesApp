import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import idx from 'idx';

import { Container, Title, InfoContainer, Info, InfoText } from './styles'

const InformationCard = ({ title, iconName, infoText }) => {

    if(infoText === null) {
        infoText = 'Sem rotas no momento'
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

    )
};

const styles = StyleSheet.create({

    infoIcon: {

        color: '#666'

    },

})

export default InformationCard;
