import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, FlatList } from 'react-native';
import * as Firestore from '../../../api/firestore';

import RequestItem from './RequestsItem';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing a list of friend requests from other users.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const RequestsTab = () => {

    const [requestList , setRequestList] = useState([]);

    useEffect(() => {
        Firestore.db_requestList(
            (userList) => {
                setRequestList(userList)
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
                data={requestList}
                keyExtractor={item => item.uid}
                renderItem={({item}) => <RequestItem item={item}/>}
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <Text style={styles.emptyText}>No Incoming Friend Requests</Text>
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
        // backgroundColor: 'yellow',
    },
    list:{
        width: width,
        height: height * 0.83,
        // backgroundColor: 'orange',
    },
    listContent:{
        width: width,
    },
    emptyList: {
        width: width,
        height: height * 0.83,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    emptyText:{
        fontSize: 14,
        color: '#72767D'
    },
});

export default RequestsTab;
