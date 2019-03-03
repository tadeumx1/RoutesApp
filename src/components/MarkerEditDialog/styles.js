import styled from 'styled-components/native'
import Dialog from 'react-native-dialog';

export const TextOption = styled.Text`

    /* font-size: 14px; */
    /* margin-left: 10px; */
    /* margin-bottom: 10px; */
    font-weight: bold;
    color: #ffffff;
    font-size: 16;

`;

export const ContainerButton = styled.View`

    flex-direction: column;
    align-items: flex-start;
    margin-left: 5;

`;

export const TouchableOpacityOption = styled.TouchableOpacity`

    background-color: #009c8b;
    /* border-color: #009c8b; */
    /* border-width: 1px; */
    margin-bottom: 10px;
    margin-right: 100px;
    border-radius: 5px;
    text-align: center;
    margin-left: 10px;
    padding: 9px;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 1;
    elevation: 3;

`;

export const DialogInput = styled(Dialog.Input)`

    border-bottom-width: 1px;

`;
