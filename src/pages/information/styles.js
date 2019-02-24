import styled from 'styled-components/native'

export const Container = styled.View`

    flex: 1;

`;

export const Loading = styled.ActivityIndicator`

    margin-top: ${props => props.theme.metrics.basePadding};

`;