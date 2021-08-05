import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, FlatList } from 'react-native';
import * as Firestore from '../../../api/firestore';

import PendingItem from './PendingItem';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing a list of pending friend request to other users.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const PendingTab = () => {

    const [pendingList , setPendingList] = useState([]);

    /**
     * This is a render effect triggered upon component mount.
     */
    useEffect(() => {
        Firestore.db_pendingList(
            (userList) => {
                setPendingList(userList)
                // console.log(userList)
            },
            (error) => {console.log(error)},
        )
    }, [])

    return (
        <View style={styles.componentContainer}>
            <FlatList
                style={styles.list}
                showsVerticalScrollIndicator ={false}
                contentContainerStyle={styles.listContent}
                numColumns={1}
                data={pendingList}
                keyExtractor={item => item.uid}
                renderItem={({item}) => <PendingItem item={item}/>}
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <Text style={styles.emptyText}>No Pending Friend Requests</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.83,
        // backgroundColor: 'orange',
    },
    list:{
        width: width,
        height: height * 0.83,
        // backgroundColor: 'orange',
    },
    emptyList: {
        width: width,
        height: height * 0.83,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    listContent:{
        width: width,
    },
    emptyText:{
        fontSize: 14,
        color: '#72767D'
    },
});

export default PendingTab;
