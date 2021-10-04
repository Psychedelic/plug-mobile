import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../Routes';
import Welcome from '../../screens/Welcome';
import CreatePassword from '../../screens/Welcome/views/CreatePassword';
import ImportSeedPhrase from '../../screens/Welcome/views/ImportSeedPhrase';
import BackupSeedPhrase from '../../screens/Welcome/views/BackupSeedPhrase';

const Stack = createStackNavigator();

const CreateImportNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Routes.WELCOME_SCREEN} component={Welcome} />
    <Stack.Screen name={Routes.CREATE_PASSWORD} component={CreatePassword} />
    <Stack.Screen
      name={Routes.BACKUP_SEED_PHRASE}
      component={BackupSeedPhrase}
    />
    <Stack.Screen
      name={Routes.IMPORT_SEED_PHRASE}
      component={ImportSeedPhrase}
    />
  </Stack.Navigator>
);

export default CreateImportNavigator;
