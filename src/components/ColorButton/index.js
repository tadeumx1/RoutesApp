import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as MarkerActions } from '../../store/ducks/colorMarker'

import { Container, TouchableOpacityColor } from './styles'

export class ColorButton extends Component {
    
  state = {

    colorSelected: null,

  }

  handleRedColorButton = () => {
    // this.setState({ colorSelected: '#FF0000' })
    this.props.addColor('#FF0000')
  }

  handleGreenColorButton = () => {
    // this.setState({ colorSelected: '#00FF00' })
    this.props.addColor('#00FF00')
  }

  handleBlueColorButton = () => {
    // this.setState({ colorSelected: '#0000FF' })
    this.props.addColor('#0000FF')
  }

  handleMagentaColorButton = () => {
    // this.setState({ colorSelected: '#FF00FF' })
    this.props.addColor('#FF00FF')
  }

  handleCyanColorButton = () => {
    // this.setState({ colorSelected: '#00FFFF' })
    this.props.addColor('00FFFF')
  }

  render() {
    return (

      <Container>

        <TouchableOpacityColor backgroundColor='#FF0000' onPress={this.handleRedColorButton} />
        <TouchableOpacityColor backgroundColor='#00FF00' onPress={this.handleGreenColorButton} />
        <TouchableOpacityColor backgroundColor='#0000FF' onPress={this.handleBlueColorButton} />
        <TouchableOpacityColor backgroundColor='#FF00FF' onPress={this.handleMagentaColorButton} />
        <TouchableOpacityColor backgroundColor='#00FFFF' onPress={this.handleCyanColorButton} />

      </Container>
      
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MarkerActions, dispatch);

export default connect(null, mapDispatchToProps)(ColorButton)

ColorButton.propTypes = {

  /* visible: PropTypes.bool.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number),
  onSelectCancel: PropTypes.func.isRequired, */

}
