import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View, FlatList } from 'react-native';
import * as Firestore from '../../../api/firestore';

import ExerciseComponentStyles from './ExerciseComponentStyles';
import RunHistoryEntry from './RunHistoryEntry';

const {width, height} = Dimensions.get("window")

const RunHistory = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        Firestore.db_historyView(
            (historyList) => { setHistory(historyList)},
            (error) => {console.log('history view fail')}
        )
    },[])

    return (
        <View style={ExerciseComponentStyles.containerBuffer}>
            <View style={ExerciseComponentStyles.componentContainer}>

                {/* Section Content */}
                <View style={ExerciseComponentStyles.contentContainer}>
                <FlatList
                    data={history}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <RunHistoryEntry
                            day={item.day}
                            date={item.date}
                            time={item.time}
                            distance={item.distance}
                            duration={item.duration}
                            steps={item.steps}
                            positions={item.positions}
                        />}
                    style={{width: 0.9 *  width, 
                        // backgroundColor: 'yellow',
                        paddingTop: 0.01 * height,
                    }}
                />
                </View>
                
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
   
})
export default RunHistory