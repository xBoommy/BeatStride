import React, {useState, useEffect} from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions} from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

const {width, height} = Dimensions.get("window")

const RunMap = (props) => {
    const runStatus = props.runStatus;
    const mapPositions = props.mapPositions;
    const currCoord = props.currCoord;

    return (
        <View style={styles.componentContainer}>
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
                    coordinates={mapPositions}
                    strokeWidth={5}
                    strokeColor={'#7289DA'}
                />
                <Circle 
                    center={currCoord}
                    radius={10}
                    fillColor={'#7289DA'}
                    strokeWidth={0}
                    zIndex={1}
                />
                <Circle 
                    center={currCoord}
                    radius={15}
                    fillColor={'#ddddff'}
                    strokeWidth={0}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.7,
    },
    map: {
        width: width,
        height: height * 0.7,
      },
})

export default RunMap;