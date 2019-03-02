import styled from 'styled-components/native'

export const Container = styled.View`

    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-left: 5px;

`;

export const TouchableOpacityColor = styled.TouchableOpacity`

    height: 30px;
    width: 30px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: ${props => props.backgroundColor};
    border-radius: 100px;

`;