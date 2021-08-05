import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as geolib from 'geolib';
import moment from 'moment';
import { IconButton } from "react-native-paper";

const {width, height} = Dimensions.get("window")

const ShareImage = (props) => {
    const distance =  props.distance;    //Total Distance Ran
    const steps = props.steps;           //Total Steps
    const positions = props.positions;   //Array of Positions Travelled
    const duration = props.duration;     //Total Run Duration
    const time = props.time;             //Start Time of Run
    const day = props.day;               //Start Time of Run
    const date = props.date;             //Start Time of Run
    const mode = props.mode;             //Run mode 

    /* [Convert miliseconds to time breakdown] */
    const displayDuration = moment.duration(duration);
      

    const [center, setCenter] = useState({latitude: 1.377621 , longitude: 103.805178});
    const [latDelta, setLatDelta] = useState(0.2);

    /**
     * This is a method to obtain the suitable coordinate delta for map display.
     */
    const mapRange = () => {
        const boundary = geolib.getBounds(positions);
        setCenter({latitude: (boundary.maxLat + boundary.minLat)/2, longitude: (boundary.maxLng + boundary.minLng)/2 });

        const LongBound = geolib.getDistance({latitude: 0 , longitude: boundary.maxLng}, {latitude: 0 , longitude: boundary.minLng}, 1);
        const LatBound = geolib.getDistance({latitude: boundary.maxLat , longitude: 0}, {latitude: boundary.minLat , longitude: 0}, 1);
        
        if (LongBound > LatBound) {
            setLatDelta((0.00001 * LongBound)+ 0.001)
            // console.log((0.00001 * LongBound)+ 0.00050)
        } else {
            setLatDelta((0.00001 *LatBound)+ 0.001)
            // console.log((0.00001 *LatBound)+ 0.00050)
        }
    }

    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(async ()=> {
        mapRange();
    },[]);

    return (
        <View style={styles.componentContainer}>

            <View style={styles.textContainer}>
                {/* Run Info */}
                <View style={styles.infoContainer}>
                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <IconButton icon="run" style={{ margin: 0 }} color={'#000000'} />
                        <Text style={{ fontSize: 16, color: '#000000' }}>Beat Stride</Text>
                    </View>

                    {/* Date */}
                    <View style={styles.dateContainer}>
                        <View style={styles.dateTopContainer}>
                            <Text style={styles.dayText}>{day}</Text>
                            <Text style={styles.dateText}>, {time}</Text>
                        </View>
                        
                        <Text style={styles.dateText}>{date}</Text>
                    </View>

                </View>

                {/* Run Data */}
                <View style={styles.dataContainer}>
                    {/* Distance */}
                    <View style={styles.distanceContainer}>
                        <Text numberOfLines={1} style={styles.text}>{(distance/1000).toFixed(2)}</Text>
                        <Text style={styles.subtext}>Total Distance (km)</Text>
                    </View>

                    {/* Time */}
                    <View style={styles.timeContainer}>
                        <Text numberOfLines={1} style={styles.text}>
                            {displayDuration.hours() < 10 ? `0${displayDuration.hours()}` : displayDuration.hours()}
                            :
                            {displayDuration.minutes() < 10 ? `0${displayDuration.minutes()}` : displayDuration.minutes()}
                            :
                            {displayDuration.seconds() < 10 ? `0${displayDuration.seconds()}` : displayDuration.seconds()}
                        </Text>
                        <Text style={styles.subtext}>Duration</Text>
                    </View>

                </View>
            </View>

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
        height: width,
        backgroundColor:'#FFFFFF',
        position: 'absolute',
        zIndex: -1,
    },
    textContainer:{
        width: width,
        height: width,
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 1,
    },
    infoContainer:{
        width: width,
        height: width * 0.2,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer:{
        width: width * 0.5,
        height: width * 0.2,
        justifyContent: 'center',
        paddingLeft: width * 0.1,
        // backgroundColor: 'green',
    },
    dateTopContainer:{
        width: width * 0.5,
        height: height * 0.075 * 0.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000'
    },
    dateText:{
        fontSize: 14,
        color: '#000000'
    },
    map: {
        width: width * 0.8,
        height: width * 0.6,
        top: width * 0.2,
        alignSelf: 'center',
    },
    dataContainer:{
        width: width,
        height: width * 0.2,
        flexDirection: 'row',
    },
    distanceContainer:{
        width: width * 0.5,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    timeContainer:{
        width: width * 0.5,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    subtext:{
        fontSize: 14,
        color: '#000000',
    },
});

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

export default ShareImage;
