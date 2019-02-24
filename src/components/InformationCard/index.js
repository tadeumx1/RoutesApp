import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import idx from 'idx';

import { Container, Title, InfoContainer, Info, InfoText } from './styles'

const InformationCard = ({ title, iconName, infoText }) => {

    alert(JSON.stringify(title) + JSON.stringify(iconName) + JSON.stringify(infoText))

    return (

        <Container>

            <Title>{title}</Title>

            <InfoContainer>
        
                <Info>

                    <Icon name="list" size={13} style={styles.infoIcon} />
                    <Text>EAAAAAAE</Text>
                    <InfoText>19 minutos</InfoText>
            
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
