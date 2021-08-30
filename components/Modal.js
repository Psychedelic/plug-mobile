import React from 'react';
import {
  Image,
  Modal as ModalRN,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors, FontStyle, Metrics, Shadow} from '../definitions/theme';

const closeIcon = require('../assets/icons/close.png');

const Modal = props => {
  const defaultActionLabel = 'Aceptar';

  function handleAction() {
    props.hasOwnProperty('action') && props.action();
    props.onClose();
  }
  return (
    <ModalRN
      animationType="slide"
      visible={props.modalVisible}
      transparent={true}
      onRequestClose={props.onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.closable && (
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={props.onClose}>
                <Image
                  source={closeIcon}
                  resizeMode="contain"
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          {props.hasOwnProperty('icon') && (
            <Image
              source={props.icon}
              resizeMode="contain"
              style={styles.modalIcon}
            />
          )}
          <Text style={styles.modalText}>{props.title}</Text>
          {props.hasOwnProperty('message') && (
            <Text style={styles.modalMessage}>{props.message}</Text>
          )}
          {props.hasOwnProperty('action') && (
            <>
              <TouchableOpacity style={styles.button} onPress={handleAction}>
                <Text style={[FontStyle.Button, styles.textStyle]}>
                  {props.hasOwnProperty('actionLabel')
                    ? props.actionLabel
                    : defaultActionLabel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onClose}>
                <Text style={[FontStyle.Button, styles.textStyleCancel]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GrayScale.BackgroundModal,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: Metrics.BorderRadius,
    padding: Metrics.Padding * 2,
    ...Shadow,
    position: 'relative',
    textAlign: 'center',
  },
  button: {
    borderRadius: Metrics.BorderRadius,
    paddingHorizontal: Metrics.Padding,
    paddingVertical: Metrics.Padding / 2,
    elevation: 2,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.Warning,
    marginVertical: Metrics.Margin,
    ...Shadow,
  },
  buttonClose: {
    width: 20,
    height: 20,
  },
  textStyle: {
    color: Colors.GrayScale.White,
  },
  textStyleCancel: {
    color: Colors.GrayScale.Medium,
  },
  modalText: {
    margin: Metrics.Margin,
    textAlign: 'center',
    ...FontStyle.Subtitle,
  },
  modalMessage: {
    marginBottom: Metrics.Margin,
    textAlign: 'center',
    ...FontStyle.Normal,
    color: Colors.GrayScale.SuperDark,
  },
  closeIcon: {width: 20, height: 20, tintColor: Colors.GrayScale.SuperDark},
  modalIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  closeButtonContainer: {alignItems: 'flex-end'},
});

export default Modal;
