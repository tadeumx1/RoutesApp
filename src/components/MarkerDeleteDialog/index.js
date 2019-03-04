import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'react-native-snackbar';

import { Creators as ColorMarkerActions } from '../../store/ducks/colorMarker'

export class MarkerDeleteDialog extends Component {

  handleMarkerDelete = () => {

    this.props.deleteMarker(this.props.marker)

    this.props.addMarkerUpdate(true)

    this.props.onSelectCancel(true)
    
  };

  componentDidUpdate(prevProps) {

    if(this.props.markerDeleted !== prevProps.markerDeleted) {

        Alert.alert(
            'Mensagem',
            'O marcador foi excluído com sucesso'
        );

    }

  }

  handleCancel = () => {
    this.props.onSelectCancel(true)
  };

  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.visible}>
          <Dialog.Title>Deletar o marcador</Dialog.Title>
          <Dialog.Description>
            Você realmente quer apagar esse marcador ? 
            Você não pode desfazer essa ação
          </Dialog.Description>
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Deletar" onPress={this.handleMarkerDelete} />
        </Dialog.Container>
      </View>
    );
  }

}

const mapStateToProps = state => ({

    markerDeleted: state.colorMarker.markerDeleted,
    error: state.colorMarker.errorOnAdd
  
});
  
const mapDispatchToProps = dispatch => bindActionCreators(ColorMarkerActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(MarkerDeleteDialog);

MarkerDeleteDialog.propTypes = {

  visible: PropTypes.bool.isRequired,
  onSelectCancel: PropTypes.func.isRequired,
  marker: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

}
