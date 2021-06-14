import 'react-native-gesture-handler';
import React, {} from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppStack from './src/navigation/AppStack'
import AppTab from './src/navigation/AppTab'
import playlistReducer from './SpotifyStore/playlist-reducer';
import { init } from './SpotifyStore/db';


init().then(() => {
  console.log('Initialised playlists');
}).catch(e => {
  console.log('Initalising playlists failed');
  console.log(e);
});

const rootReducer = combineReducers({
  playlists: playlistReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App