import styled from 'styled-components/native'
import Dialog from 'react-native-dialog';
import CheckBox from 'react-native-check-box'

export const TextOption = styled.Text`

    font-size: 14px;
    margin-left: 10px;
    margin-bottom: 10px;


`;

export const DialogInput = styled(Dialog.Input)`

    border-bottom-width: 1px;

`;

export const CheckNext = styled(CheckBox)`

    padding: 7px;

`;
