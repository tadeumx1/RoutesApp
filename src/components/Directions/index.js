import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

// A props onReady é uma função callback que vamos passar para o MapView para
// saber quando as directions foram formadas no mapa, para depois
// dar um zoom no mapa naquele local

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections 
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyBoGdzt-mVtwdClWhXG0d6mAbhAGIP43lU"
        strokeWidth={3}
        strokeColor="#222"
    
    />
)

export default Directions;
