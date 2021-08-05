import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, FlatList } from 'react-native';
import { IconButton } from "react-native-paper";
import * as Firestore from '../../../api/firestore';

import HistoryItem from './HistoryItem';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the History Tab in Exercise page.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const HistoryTab = () => {
    const [history, setHistory] = useState([])
    const [totalDistance, setTotalDistance] = useState(0)
    const [totalRuns, setTotalRuns] = useState(0)

    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(async() => {
        Firestore.db_historyView(
            (historyList) => { setHistory(historyList.reverse())},
            (error) => {console.log('history view fail')}
        )
        
        Firestore.db_getUserDataSnapshot(
            (userData) => {
                setTotalDistance(userData.totalDistance)
                setTotalRuns(userData.runCount)
            },
            (error) => {console.log(error)},
        )
    },[])

    return (
        <View style={styles.componentContainer}>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statsComponent}>
                    <Text numberOfLines={1} style={styles.statsValue}>{(totalDistance / 1000).toFixed(2)}</Text>
                    {/* Distance might go over? */}
                    <Text style={styles.statsText}>Total Distance (km)</Text>
                </View>

                <View style={styles.statsComponent}>
                    <Text numberOfLines={1} style={styles.statsValue}>{totalRuns}</Text>
                    <Text style={styles.statsText}>Total Runs</Text>
                </View>
            </View>

            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                numColumns={1}
                data={history}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                    <HistoryItem
                        distance={item.distance} 
                        positions={item.positions}
                        steps={item.steps}
                        duration={item.duration}
                        time={item.time}
                        day={item.day}
                        date={item.date}
                        mode={item.mode}
                        id={item.id}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <IconButton icon="run" style={{ margin: 0 }} color={'#72767D'} size={height * 0.045}/>
                        <Text style={styles.emptyText}>No Run History</Text>
                    </View>
                }
            />

        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.73,
        backgroundColor: '#282B30',
    },  
    statsContainer:{
        width: width,
        height: height * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#424549',
        backgroundColor: '#282B30',
        
    },
    statsComponent:{
        width: width * 0.5,
        alignItems: 'center',
        paddingHorizontal: width * 0.01,
        // backgroundColor: 'pink',
    },
    statsValue:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statsText:{
        fontSize: 12,
        color: '#BABBBF'
    },
    list:{
        width: width,
        height: height * 0.58,
        // backgroundColor: 'green',
    },
    listContent:{
        alignItems: 'center',
        paddingVertical: height * 0.01,
    },
    emptyList: {
        width: width,
        height: height * 0.58,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    emptyText:{
        fontSize: 14,
        color: '#72767D'
    }
})

export default HistoryTab;
