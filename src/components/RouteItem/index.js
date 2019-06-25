import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, RouteTitle, InfoContainer, Info, InfoIcon, InfoText } from './styles'

const RouteItem = ({ route }) => {

    function msToTime (duration) {

        let milliseconds = parseInt((duration % 1000) / 100),
          seconds = parseInt((duration / 1000) % 60),
          minutes = parseInt((duration / (1000 * 60)) % 60),
          hours = parseInt((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    
        return hours + ":" + minutes + ":" + seconds;
    
    }

    return (

        <Container>

            <RouteTitle>{route.name}</RouteTitle>

            <InfoContainer>
        
                <Info>

                    <Icon name="map" size={13} style={{ color: '#666666' }} />
                    <InfoText>{(route.distance).toString() + ' km'}</InfoText>
            
                </Info>

                <Info>

                    <Icon name="clock-o" size={13} style={{ color: '#666666' }} />
                    <InfoText>{msToTime(route.duration).toString() + ' seg'}</InfoText>

                </Info>

                <Info>

                    <Icon name="road" size={13} style={{ color: '#666666' }} />
                    <InfoText>{route.type}</InfoText>

                </Info>
        
            </InfoContainer>

        </Container>

    )

};

RouteItem.propTypes = {

    /* repository: PropTypes.shape({

        full_name: PropTypes.string,
        stargazers_count: PropTypes.number,
        forks_count: PropTypes.number,
        watchers_count: PropTypes.number,

    }).isRequired, */

}

export default RouteItem;