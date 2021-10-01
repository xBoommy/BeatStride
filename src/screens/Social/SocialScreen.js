import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Firestore from '../../api/firestore';

import Screen from '../MainScreen';
import FriendItem from './components/FriendItem'

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the main screen under social tab.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const SocialScreen = ({navigation}) => {
    
    const [friendList , setFriendList] = useState([]);
    const [empty, setEmpty] = useState(true);

    /**
     * This is a render effect triggered upon component mount.
     */
    useEffect(() => {
        Firestore.db_friendsList(
            (userList) => {
                setFriendList(userList)
                // console.log(userList)
            },
            (error) => {console.log(error)},
        )

        Firestore.db_requestList(
            (userList) => {
                if (userList.length == 0) {
                    setEmpty(true);
                } else {
                    setEmpty(false);
                }  
            },
            (error) => {console.log(error)},
        )
    }, [])

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
                        <View style={{...styles.notifyDot, backgroundColor: empty ? "transparent" : "red"}}/>
                    </TouchableOpacity>

                    {/* Search Icon */}
                    <TouchableOpacity style={styles.iconContainer} onPress={() => {navigation.navigate("SearchScreen")}}>
                        <FontAwesome name="search" size={width * 0.07} color="#BABBBF"/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Friends Info */}
            {/* <View style={styles.infoContainer}>

            </View> */}

            {/* Friend List */}
            <FlatList
                showsVerticalScrollIndicator ={false}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                numColumns={1}
                data={friendList}
                keyExtractor={item => item.uid}
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
        height: height * 0.8,
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
    notifyDot:{
        position: 'absolute',
        bottom: width * 0.03,
        right: width * 0.03,
        width: width * 0.03,
        aspectRatio: 1,
        borderRadius: width,
    },
})

export default SocialScreen;
