import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as geolib from 'geolib';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the map rendered in HistoryView.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const HistoryViewMap = (props) => {
    const positions = props.positions;
    const [center, setCenter] = useState({latitude: 1.377621 , longitude: 103.805178});
    const [latDelta, setLatDelta] = useState(0.2);

    /**
     * This is a method to obtain the suitable coordinate delta for map display.
     */
    const mapRange = () => {
        const boundary = geolib.getBounds(positions);
        setCenter({latitude: (boundary.maxLat + boundary.minLat)/2, longitude: (boundary.maxLng + boundary.minLng)/2 });

        const LongBound = geolib.getDistance({latitude: 0 , longitude: boundary.maxLng}, {latitude: 0 , longitude: boundary.minLng}, 1)
        const LatBound = geolib.getDistance({latitude: boundary.maxLat , longitude: 0}, {latitude: boundary.minLat , longitude: 0}, 1)
        
        if (LongBound > LatBound) {
            setLatDelta((0.00001 * LongBound)+ 0.00050)
        } else {
            setLatDelta((0.00001 *LatBound)+ 0.00050)
        }
    }

    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(()=> {
        mapRange();
    },[])        

    return (
        <View style={styles.componentContainer}>

            <MapView 
                style={styles.map}
                region={{
                    latitude: center.latitude,
                    longitude: center.longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: latDelta,
                }}
                customMapStyle={mapStyle}
                >
                <Polyline
                    coordinates={positions}
                    strokeWidth={5}
                    strokeColor={'#7289DA'}
                />
            </MapView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.65,
    },
    map: {
        width: width,
        height: height * 0.65,
    },
})

const mapStyle = [
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

export default HistoryViewMap;
