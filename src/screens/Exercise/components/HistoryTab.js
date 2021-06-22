import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import * as Firestore from '../../../api/firestore';

import HistoryItem from './HistoryItem';

const {width, height} = Dimensions.get("window")

const HistoryTab = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        Firestore.db_historyView(
            (historyList) => { setHistory(historyList)},
            (error) => {console.log('history view fail')}
        )
    },[])

    return (
        <View style={styles.componentContainer}>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statsComponent}>
                    <Text numberOfLines={1} style={styles.statsValue}>151515.24</Text>
                    {/* Distance might go over? */}
                    <Text style={styles.statsText}>Total Distance (km)</Text>
                </View>

                <View style={styles.statsComponent}>
                    <Text numberOfLines={1} style={styles.statsValue}>5824</Text>
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
        height: height * 0.58,
        // backgroundColor: 'green',
    },
    listContent:{
        alignItems: 'center',
        paddingVertical: height * 0.01,
    },
})

export default HistoryTab;