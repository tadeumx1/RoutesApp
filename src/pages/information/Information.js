import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Loading } from './styles'
import InformationCard from '../../components/InformationCard';

const Information = (props) => (
    <Container>
        <ScrollView>

            <InformationCard title={'Tempo'} iconName={'list'} infoText={props.time.time} />
            <InformationCard title={'Duração'} iconName={'list'} infoText={props.time.time} />
            <InformationCard title={'Distância'} iconName={'list'} infoText={parseFloat(props.distance).toFixed(2) + ' km'} />
            <InformationCard title={'Velocidade'} iconName={'list'} infoText={props.time.time} />
            <InformationCard title={'Altitude'} iconName={'list'} infoText={'Em breve'} />

        </ScrollView>
    </Container>
);

const mapStateToProps = state => ({

    time: state.time,
    distance: state.routes.distance
  
});

export default connect(mapStateToProps, null)(Information);
