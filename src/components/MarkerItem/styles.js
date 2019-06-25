import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`

    flex: 1;
    border-radius: ${props => props.theme.box.borderRadius}px;
    padding: ${props => props.theme.box.padding}px;
    background-color: ${props => props.theme.box.backgroundColor};
    padding: ${props => props.theme.box.padding}px;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 1;
    elevation: 3;

`;

export const TitleContainer = styled.View`

    display: flex;
    flex-direction: row;
    align-items: center;

`;

export const MarkerTitle = styled.Text`

    font-weight: bold;
    margin-bottom: 3px;
    font-size: 14px;

`;

export const TimeText = styled.Text`

    font-weight: bold;
    margin-bottom: 3px;
    font-size: 14px;

`;

export const MarkerColor = styled.View`

    height: 10px;
    width: 10px;
    margin-right: 10px;
    background-color: ${props => props.color};
    border-radius: 100;

`;

export const InfoContainer = styled.View`

    flex-direction: row;
    margin-top: ${props => props.theme.metrics.baseMargin}px;

`;

export const Info = styled.View`

    flex-direction: row;
    margin-right: ${props => props.theme.metrics.baseMargin}px;
    align-items: center;

`;

export const InfoTime = styled(Info)`

    padding: 8px 0px;

`;

export const InfoTextTime = styled.Text`

    color: ${props => props.theme.colors.dark};
    font-size: 12px;
    margin-left: 10px;


`;

export const InfoIcon = styled(Icon)`

    color: ${props => props.theme.colors.dark};

`;

export const InfoText = styled.Text`

    color: ${props => props.theme.colors.dark};
    font-size: 12px;
    margin-left: 5px;
    max-width: 100px;

`;