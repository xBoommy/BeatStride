import React, {useState, useEffect} from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const RunningMap = (props) => {
  const runStatus = props.runStatus;
  const positions = props.positions;
  const currCoord = props.currCoord;

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        region={{
          latitude: currCoord.latitude,
          longitude: currCoord.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        >
          <Polyline
            coordinates={positions}
            strokeWidth={5}
            strokeColor={'orange'}
          />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: 0.5 * height,
  },
});

export default RunningMap