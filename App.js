import 'react-native-gesture-handler';
import React, {} from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './src/navigation/AppStack'
import AppTab from './src/navigation/AppTab'

const App = () => {
  return (
    <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
  );
};

export default App