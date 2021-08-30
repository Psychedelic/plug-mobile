import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {FontStyle, Metrics, Colors, Shadow} from '../constants/theme';

const FallbackComponent = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.content}>
        <Text style={styles.titleError}>Oops, algo va mal!!!</Text>
        <Text style={styles.textError}>
          La aplicación tuvo un problema y no puede continuar corriendo.
          Lamentamos los inconvenientes causados. Contactanos si el problema
          persiste
        </Text>
        <View style={styles.buttonContainer}>
          <Text style={[FontStyle.LabelButton, styles.buttonLabel]}>
            Intenta de nuevo
          </Text>
          <TouchableOpacity
            onPress={() => RNRestart.Restart()}
            style={[
              Shadow,
              styles.button,
              FontStyle.LabelButton,
              {color: Colors.GrayScale.White},
            ]}>
            <Image
              source={require('../assets/icons/arrow_right.png')}
              resizeMode="contain"
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Metrics.Padding,
  },
  titleError: {
    ...FontStyle.Title,
    color: Colors.Error,
  },
  textError: {
    ...FontStyle.Normal,
    color: Colors.GrayScale.SuperDark,
    marginVertical: Metrics.Margin,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: Metrics.Margin,
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonLabel: {
    color: Colors.GrayScale.SuperDark,
  },
  iconButton: {
    height: 25,
    width: 25,
  },
});

export default FallbackComponent;
