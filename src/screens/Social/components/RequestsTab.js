import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Firestore from '../../../api/firestore';

import RequestItem from './RequestsItem';

const {width, height} = Dimensions.get("window")

const data = [
    {id:1, displayName: "james", uid: 123124},
    {id:2, displayName: "alfred", uid: 346815},
    {id:3, displayName: "max", uid: 16818},
    {id:4, displayName: "john", uid: 321685},
    {id:5, displayName: "mary", uid: 92623},
    {id:6, displayName: "pepe", uid: 184626},
    {id:7, displayName: "gabriel", uid: 16282},
    {id:8, displayName: "jet", uid: 126653},
    {id:9, displayName: "cheryl", uid: 84512},
    {id:10, displayName: "gerald", uid: 518451}
]

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
    }
});

export default RequestsTab;