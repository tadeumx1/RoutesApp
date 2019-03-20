import React from 'react';
import { ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Loading } from './styles'
import InformationCard from '../../components/InformationCard';

const Information = (props) => {

    const remote = 'http://accountech.com.pk/wp-content/uploads/2016/08/blur-map.png';

    let time = null

    if(props.time.time) {
        time = new Date(props.time.time);
        // time.toString()
    } else {
        time = 'Sem rotas no momento'
    }

    return (

        <ImageBackground
        style={styles.image}
        source={{ uri: remote }}
        >

            <Container>
                <ScrollView>

                    <InformationCard title={'Tempo'} iconName={'list'} infoText={time.toLocaleString()} />
                    <InformationCard title={'Duração'} iconName={'list'} infoText={props.timeDuration} />
                    <InformationCard title={'Distância'} iconName={'list'} infoText={parseFloat(props.distance).toFixed(2) + ' km'} />
                    <InformationCard title={'Velocidade'} iconName={'list'} infoText={'Em breve a velocidade vai ser calculada'} />
                    <InformationCard title={'Altitude'} iconName={'list'} infoText={parseFloat(props.altitude).toFixed(2)} />

                </ScrollView>
            </Container>

        </ImageBackground>

    )
};

const styles = StyleSheet.create({

    image: {
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

})

const mapStateToProps = state => ({

    time: state.time,
    distance: state.routes.distance,
    timeDuration: state.time.durationTime,
    altitude: state.routes.altitude
  
});

export default connect(mapStateToProps, null)(Information);
