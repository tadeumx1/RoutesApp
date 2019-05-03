import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, MarkerTitle, InfoContainer, TitleContainer, Info, InfoTime, InfoTextTime, MarkerColor, InfoIcon, InfoText } from './styles'

const MarkerItem = ({ marker }) => {

    const makePoint = coordinate => ({ latitude: coordinate[0], longitude: coordinate[1] });

    const markerCoordinates = makePoint(marker.location.coordinates)

    const a = `${marker.createdAt}`.split(/[- : T Z]/);
    const newDate = new Date(Date.UTC(a[0], a[1]-1, a[2], a[3], a[4], a[5]));

    return (

        <Container>

            <TitleContainer>

                <MarkerColor color={marker.color} />
                <MarkerTitle>{marker.name}</MarkerTitle>

            </TitleContainer>

            <InfoTime>
                <Icon name="clock-o" size={13} style={{ color: '#666666' }} />
                <InfoTextTime>{newDate.toLocaleString()}</InfoTextTime>
            </InfoTime>

            <InfoContainer>
        
                <Info>
                    <Icon name="globe" size={13} style={{ color: '#666666' }} />
                    <InfoText>LAT</InfoText>
                    <InfoText>{markerCoordinates.latitude}</InfoText>
                </Info>

                <Info>
                    <Icon name="globe" size={13} style={{ color: '#666666' }} />
                    <InfoText>LONG</InfoText>
                    <InfoText>{markerCoordinates.longitude}</InfoText>
                </Info>
        
            </InfoContainer>

        </Container>
    )
};

MarkerItem.propTypes = {

    /* repository: PropTypes.shape({

        full_name: PropTypes.string,
        stargazers_count: PropTypes.number,
        forks_count: PropTypes.number,
        watchers_count: PropTypes.number,

    }).isRequired, */

}

export default MarkerItem;