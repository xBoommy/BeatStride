import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet,  Text,  View, Dimensions, Animated, ScrollView } from 'react-native';

import PageIndicator from './Page Item/PageIndicator';
import DistancePage from './Page Item/DistancePage';
import PacePage from './Page Item/PacePage';
import StridePage from './Page Item/StridePage';
import JoinPage from './Page Item/JoinPage';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing private user information only available to friends.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const UserPrivateInfo = (props) => {
    const userData = props.userData;

    const [totalDistance, setTotalDistance] = useState(0);
    const [runCount, setRunCount] = useState(0);
    const [longestDistance, setLongestDistance] = useState(0);
    const [fastestPace, setFastestPace] = useState(0);
    const [strideDistance, setStrideDistance] = useState(0);
    const [joinDate, setJoinDate] = useState(",");

    useEffect(() => {
        setTotalDistance(userData.totalDistance);
        setRunCount(userData.runCount);
        setLongestDistance(userData.longestDistance);
        setFastestPace(userData.fastestPace);
        setStrideDistance(userData.strideDistance);
        setJoinDate(userData.joinDate);
    }, [userData])

    // Page Scrolling
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.componentContainer}>

            <View style={styles.userRunDataContainer}>
                <View style={styles.userRunDataCard}>
                    <Text style={styles.dataText} numberOfLines={1}>{(totalDistance / 1000).toFixed(2)}</Text>
                    <Text style={styles.dataLabel}>Total Distance (km)</Text>
                </View>
                <View style={styles.userRunDataCard}>
                    <Text style={styles.dataText} numberOfLines={1}>{runCount}</Text>
                    <Text style={styles.dataLabel}>Total Runs</Text>
                </View>
            </View>

            <View style={styles.card2}>
                <ScrollView
                    style={styles.pageList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    overScrollMode="never"
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {x: scrollX}}}],
                      {useNativeDriver: false},
                    )}
                    snapToInterval={(width * 0.95)}
                    decelerationRate="fast"
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                >
                    <DistancePage longestDistance={longestDistance}/>
                    <PacePage fastestPace={fastestPace}/>
                    <StridePage strideDistance={strideDistance}/>
                    <JoinPage joinDate={joinDate}/>
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    <PageIndicator scrollX={scrollX}/>
                </View>
                
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    userRunDataContainer:{
        width: width * 0.95,
        height: height * 0.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.01,
        // backgroundColor: 'pink',
    },
    userRunDataCard:{
        width: width * 0.925 /2,
        height: height * 0.15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F535C',
    },
    dataText:{
        fontWeight: 'bold',
        fontSize: 24,
        paddingHorizontal: width * 0.01,
        color: '#FFFFFF',
    },
    dataLabel:{
        fontSize: 12,
        color: '#BABBBF',
    },
    card2:{
        width: width * 0.95,
        height: height * 0.22,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: height * 0.06,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#7289DA',
    },
    pageList:{
        width: width * 0.95,
        height: height * 0.2,
        // backgroundColor: 'green',
    },
    indicatorContainer:{
        width: width * 0.95,
        height: height * 0.02, 
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'purple',
    }
});

export default UserPrivateInfo;
