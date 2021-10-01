import React, {useState, useEffect} from 'react';
import { StyleSheet,  Text,  View, Dimensions, FlatList, Modal, TouchableOpacity, Image } from 'react-native';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import PlaylistSelectionItem from './components/PlaylistSelectionItem';
import * as Firestore from '../../api/firestore';
import TracksNoFilter from '../../api/spotify/TracksNoFilter';
import * as playlistActions from '../../../store/playlist-actions';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the playlist selection page 
 * for Basic Run and Calibration Run.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const PlaylistSelectionBasic = (props) => {
    const selectToggle = props.selectToggle;
    const setSelectToggle = props.setSelectToggle;
    const mode = props.mode;
    const setIsLoading = props.setIsLoading;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [playlists, setPlaylists] = useState([]);
    const [inSelected, setInSelected] = useState([]);
    
    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(() => {
        Firestore.db_playlists(
            (playlists) => { setPlaylists(playlists)},
            (error) => {console.log('Failed to initiate playlist in music main')}
        );
    }, []);

    /**
     * This is a method to retrieve the selected tracks and load them into the playlist for the run.
     */
    const getTracksForRun = async () => {
        setIsLoading(true);
        await TracksNoFilter(inSelected,
            (tracks) => {
                function shuffle(array) { //Fisher-Yates Shuffle
                    for (let i = array.length - 1; i > 0; i--) {
                      let j = Math.floor(Math.random() * (i + 1));
                      [array[i], array[j]] = [array[j], array[i]];
                    }
                }
                shuffle(tracks);
                dispatch(playlistActions.setTracksForRun(tracks));
            },
            (error) => {
                setIsLoading(false);
                console.log(error);
            }
        );
    };

    /**
     * This is a method to seek user confirmation on their actiona on proceed with the run.
     */
    const confirmation = () => {
        getTracksForRun().then(() => {
            setIsLoading(false);
            setSelectToggle(false);
            navigation.navigate("RunningScreen", {mode: mode});
        })
    }

    return (
        <Modal visible={selectToggle} transparent={true} animationType={'slide'}>
            <View style={styles.modal}>

                {/* PopUp Area */}
                <View style={styles.selectContainer}>

                    {/* Text Bar */}                    
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Select Music to accompany your run</Text>
                        <Text style={styles.messageText}>(Tracks from selected playlists are shuffled)</Text>
                    </View>

                    {/* Playlist List */}
                    <FlatList
                        showsVerticalScrollIndicator ={false}
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        numColumns={2}
                        data={playlists}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => 
                        <PlaylistSelectionItem 
                            item={item}
                            inserted={inSelected}
                            insert={setInSelected}
                        />}
                        ListEmptyComponent={
                            <View style={styles.emptyMessageContainer}>
                                <Image 
                                    source={require('../../assets/icons/TabMusic.png')}
                                    resizeMode= 'contain'
                                    style={styles.emptyMessageIcon}
                                />
                                <Text style={styles.emptyMessageText}>No Playlists in Library</Text>
                            </View> 
                        }
                    />
                    

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        {/* Cancel Button */}
                        <TouchableOpacity onPress={() => {setSelectToggle(false)}}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Confirm Button */}
                        <TouchableOpacity onPress={confirmation}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        width: width,
        height: height,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    selectContainer:{
        width: width * 0.95,
        height: height * 0.8,
        borderRadius: 5,
        backgroundColor: '#36393E',
    },
    messageContainer:{
        width: width * 0.95,
        height: height * 0.1,
        alignItems: 'center', 
        justifyContent: 'center',
        // backgroundColor: 'yellow',
    },
    messageText:{
        fontSize: 12,
        color: '#BABBBF',
    },
    emptyMessageContainer:{
        width: width * 0.90,
        height: height * 0.7,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'orange',
    },
    emptyMessageIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        marginBottom: height * 0.01,
        tintColor: '#72767D',
    },
    emptyMessageText:{
        fontSize: 16,
        color: '#72767D',
    },
    list:{
        height: height * 0.7,
    //    backgroundColor: 'pink',
    },
    listContent:{
        paddingBottom: (height * 0.95 * 0.02) + (height * 0.13 * 0.5) ,
    },
    buttonContainer:{
        position: 'absolute',
        width: width * 0.7,
        bottom: height * 0.95 * 0.02 ,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    button:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#72767D',
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default PlaylistSelectionBasic;
