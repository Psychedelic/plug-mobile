import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
// import { name as appName } from './app.json';
import 'text-encoding-polyfill';
import './shim';

AppRegistry.registerComponent('Plug', () => App);

// Disable fontScaling.
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
