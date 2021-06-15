import React, {useState, useEffect} from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const EndMap = (props, {navigation}) => {
    const positions = props.positions;

    const mapRange = () => {
        let minLat;
        let maxLat;
        let minLong;
        let maxLong;

        for (let i = 0; i < positions.length; i++){
            const long = positions[i].longitude;
            if ( (typeof minLong === 'undefined') && (typeof maxLong === 'undefined') ) {
                minLong = long;
                maxLong = long;
            }

            if (long < minLong) {
                minLong = long;
            }
            if (long > maxLong) {
                maxLong = long;
            }

            const lat = positions[i].latitude;
            if ( (typeof minLat === 'undefined') && (typeof maxLat === 'undefined') ) {
                minLat = lat;
                maxLat = lat;
            }

            if (lat < minLat) {
                minLat = lat;
            }
            if (lat > maxLat) {
                maxLat = lat;
            } 
        }

        const centerLat = (minLat + maxLat)/2
        const centerLong = (minLong + maxLong)/2


    }
  


    return (
        <View style={styles.container}>
        <MapView 
            style={styles.map}
            region={{
                latitude: 1.377621,
                longitude: 103.805178,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
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
        position: 'absolute',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: width,
        height: height,
    },
});

export default EndMap