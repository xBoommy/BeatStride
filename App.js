import 'react-native-gesture-handler';
import React, {} from 'react';
import { View , Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Paper from "react-native-paper";
import { useKeepAwake } from 'expo-keep-awake';

import AppStack from './src/navigation/AppStack'
import AppTab from './src/navigation/AppTab'
import playlistReducer from './store/playlist-reducer';
// import { init } from './SpotifyStore/db';


// init().then(() => {
//   console.log('Initialised playlists');
// }).catch(e => {
//   console.log('Initalising playlists failed');
//   console.log(e);
// });

const rootReducer = combineReducers({
  playlists: playlistReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  useKeepAwake();
  return (
    <Provider store={store}>
      <Paper.Provider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </Paper.Provider>
    </Provider>
  );
};

export default App