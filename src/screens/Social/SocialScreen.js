import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Screen from '../MainScreen';
import FriendItem from './components/FriendItem'

const {width, height} = Dimensions.get("window")

const data = [
    {id:1, displayName: "james", uid: "123124"},
    {id:2, displayName: "alfred", uid: "346815"},
    {id:3, displayName: "max", uid: "16818"},
    {id:4, displayName: "john", uid: "321685"},
    {id:5, displayName: "mary", uid: "92623"},
    {id:6, displayName: "pepe", uid: "184626"},
    {id:7, displayName: "gabriel", uid: "16282"},
    {id:8, displayName: "jet", uid: "126653"},
    {id:9, displayName: "cheryl", uid: "84512"},
    {id:10, displayName: "gerald", uid: "518451"}
]

const SocialScreen = ({navigation}) => {
    
    return (
        <Screen>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Social</Text>

                {/* Icons */}
                <View style={styles.iconComponent}>
                    {/* Friend Request Icon */}
                    <TouchableOpacity style={styles.iconContainer} onPress={() => {navigation.navigate("RequestScreen")}}>
                        <Ionicons name="person-add-sharp" size={width * 0.07} color="#BABBBF"/>
                    </TouchableOpacity>

                    {/* Search Icon */}
                    <TouchableOpacity style={styles.iconContainer} onPress={() => {navigation.navigate("SearchScreen")}}>
                        <FontAwesome name="search" size={width * 0.07} color="#BABBBF"/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Friends Info */}
            <View style={styles.infoContainer}>

            </View>

            {/* Friend List */}
            <FlatList
                showsVerticalScrollIndicator ={false}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                numColumns={1}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => <FriendItem item={item}/>}
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        
                        <View style={styles.emptyMessageContainer}>
                            <Text style={styles.emptyMainText}>No Friends ='(</Text>
                        </View>

                        <View style={styles.emptyMessageContainer}>
                            <Ionicons name="person-add-sharp" size={width * 0.07} color="#72767D"/>
                            <Text style={styles.emptyText}>Friend Requests</Text>
                        </View>

                        <View style={styles.emptyMessageContainer}>
                            <FontAwesome name="search" size={height * 0.04} color="#72767D"/>
                            <Text style={styles.emptyText}>Search for Users</Text>
                        </View>

                    </View>
                }
            />
            
          
        </Screen>
    );
};

const styles = StyleSheet.create({
    header:{
        width: width,
        height: height * 0.1,
        justifyContent:'center',
        paddingHorizontal: '10%',
        backgroundColor: '#1e2124',
    },
    headerText:{
        color: '#BABBBF',
        fontSize: 28,
        fontWeight: 'bold',
        height: height * 0.1,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    iconComponent:{
        position: 'absolute',
        height: height * 0.1,
        width: width * 0.35,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    iconContainer:{
        width: width * 0.15,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    infoContainer:{
        width: width,
        height: height * 0.1,
        backgroundColor: 'yellow',
    },
    list:{
        width: width,
        height: height * 0.7,
        // backgroundColor: 'pink',
    },
    listContent:{
        
    },
    emptyList: {
        width: width,
        height: height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    emptyMainText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#72767D'
    },
    emptyMessageContainer:{
        width: width,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    emptyIcon:{
        height: height * 0.07,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    emptyText:{
        fontSize: 14,
        color: '#72767D'
    },
})

export default SocialScreen;
