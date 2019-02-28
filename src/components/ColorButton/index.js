import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class ColorButton extends Component {
    
  state = {

  }

  render() {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>

            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#FF0000', borderRadius: 100 }} />
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#00ff00', borderRadius: 100 }} />
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#0000ff', borderRadius: 100 }} />
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#ff00ff', borderRadius: 100 }} />
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#00ffff', borderRadius: 100 }} />

        </View>
    )
  }
}
