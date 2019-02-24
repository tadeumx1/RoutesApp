import React from 'react';
import { Text, View } from 'react-native';

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Creators as TimeActions } from '../../store/ducks/time';

import { Container, Loading } from './styles'
import InformationCard from '../../components/InformationCard';

const Information = (props) => (
    <Container>
        <InformationCard title={'Duração'} iconName={"clock"} infoText={props.time.time} />
        <InformationCard title={'Duração'} iconName={"clock"} infoText={props.time.time} />
        <InformationCard title={'Duração'} iconName={"clock"} infoText={props.time.time} />
        <View>
            <Text>{props.time.time}</Text>
        </View>
    </Container>
);

// <Text>{props.time.time}</Text>


const mapStateToProps = state => ({

    time: state.time,
  
    // favoritesCount: state.favorites.data.length,
    // error: state.favorites.errorOnAdd,
  
});

export default connect(mapStateToProps, null)(Information);
