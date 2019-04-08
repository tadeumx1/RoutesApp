import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`

    flex: 1;
    background-color: #ffffff;
    border-radius: ${props => props.theme.box.borderRadius}px;
    padding: ${props => props.theme.box.padding}px;

`;

export const RouteTitle = styled.View`

    font-weight: bold;
    font-size: 14px;

`;

export const InfoContainer = styled.View`

    flex-direction: 'row';
    margin-top: ${props => props.theme.metrics.baseMargin}px;

`;

export const Info = styled.View`

    flex-direction: 'row';
    margin-right: ${props => props.theme.metrics.baseMargin}px;
    align-items: center;

`;

export const InfoIcon = styled(Icon)`

    color: ${props => props.theme.colors.dark};


`;

export const InfoText = styled.Text`

    color: ${props => props.theme.colors.dark};
    font-size: 12px;
    margin-left: 5px;


`;