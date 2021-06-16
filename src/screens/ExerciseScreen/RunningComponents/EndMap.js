import React, {useState, useEffect} from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as geolib from 'geolib';

const {width, height} = Dimensions.get("window")

const EndMap = (props, {navigation}) => {
    const positions = props.positions;

    const [center, setCenter] = useState({latitude: 1.377621 , longitude: 103.805178});
    const [latDelta, setLatDelta] = useState(0.2);

    const mapRange = () => {
        const centerCoord = geolib.getCenter(positions);
        console.log(centerCoord)
        setCenter(centerCoord);

        const boundary = geolib.getBounds(positions);
        const LongBound = geolib.getDistance({latitude: 0 , longitude: boundary.maxLng}, {latitude: 0 , longitude: boundary.minLng}, 1)
        setLatDelta((0.00001 * LongBound) + 0.001)
        console.log(LongBound)
    }

    useEffect(()=> {
        mapRange();
    },[])
  


    return (
        <View style={styles.container}>
        <MapView 
            style={styles.map}
            region={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: {latDelta},
                longitudeDelta: {latDelta},
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