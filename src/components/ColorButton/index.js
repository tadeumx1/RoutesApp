import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class ColorButton extends Component {
    
  state = {

    colorSelected: null,

  }

  handleRedColorButton = () => {
    this.setState({ colorSelected: '#FF0000' })
  }

  handleGreenColorButton = () => {
    this.setState({ colorSelected: '#00FF00' })
  }

  handleBlueColorButton = () => {
    this.setState({ colorSelected: '#0000FF' })
  }

  handleMagentaColorButton = () => {
    this.setState({ colorSelected: '#FF00FF' })
  }

  handleCyanColorButton = () => {
    this.setState({ colorSelected: '#00FFFF' })
  }

  render() {
    return (

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>

            <TouchableOpacity onPress={this.handleRedColorButton} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#FF0000', borderRadius: 100 }} />
            <TouchableOpacity onPress={this.handleGreenColorButton} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#00FF00', borderRadius: 100 }} />
            <TouchableOpacity onPress={this.handleBlueColorButton} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#0000FF', borderRadius: 100 }} />
            <TouchableOpacity onPress={this.handleMagentaColorButton} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#FF00FF', borderRadius: 100 }} />
            <TouchableOpacity onPress={this.handleCyanColorButton} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, backgroundColor: '#00FFFF', borderRadius: 100 }} />

        </View>
    )
  }
}

ColorButton.propTypes = {

  /* visible: PropTypes.bool.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number),
  onSelectCancel: PropTypes.func.isRequired, */

}
