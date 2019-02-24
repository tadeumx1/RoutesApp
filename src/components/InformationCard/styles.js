import styled, { css } from 'styled-components/native'
import { Platform } from 'react-native';
// import { metrics } from 'styles';

export const Container = styled.View`

    background-color: ${props => props.theme.box.backgroundColor};
    border-radius: ${props => props.theme.box.borderRadius};
    padding: ${ props => props.theme.box.padding}px;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 1;
    elevation: 3;

`;

export const Loading = styled.View`

    margin-top: ${props => props.theme.metrics.basePadding}px;

`;

export const Title = styled.Text`

    font-weight: bold;
    font-size: 18px;

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

export const InfoText = styled.Text`

    color: ${props => props.theme.colors.dark};
    font-size: 16px;
    margin-left: 5px;

`;


export const LocationBox = styled.View`

    background: #FFF;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 1;
    elevation: 1;
    border: 1px solid #ddd;
    border-radius: 3px;
    flex-direction: row;

    ${Platform.select({

        ios: css`

            margin-top: 20px;

        `,

        android: css`

            margin-top: 10px;
            margin-left: 10px;

        `,

    })}

`;

export const LocationText = styled.Text`

    /* Top and bottom margin Right and Left margin */

    margin: 8px 10px;
    font-size: 14px;
    color: #333;

`;