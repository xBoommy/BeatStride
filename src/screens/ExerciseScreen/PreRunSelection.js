import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Dimensions, FlatList, Modal, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import textStyle from '../../constants/textStyle';
import color from '../../constants/color';

import SelectablePlaylistItem from './SelectablePlaylistItem';
import * as Firestore from '../../api/firestore';
import FilterbyBPM from '../../api/spotify/FilterbyBPM';
import * as playlistActions from '../../../store/playlist-actions';

const {width, height} = Dimensions.get("window");

const PreRunSelection = props => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [inSelected, setInSelected] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
      Firestore.db_playlists(
          (playlists) => { setPlaylists(playlists)},
          (error) => {console.log('Failed to initiate playlist in music main')}
      );
    }, []);

    const LOWERLIMIT = 100;
    const UPPERLIMIT = 120;

    const getTracksForRun = async() => {
      if (inSelected.length === 0) {
        console.log('No playlists selected');
        return;
      }
      setIsLoading(true);
      await FilterbyBPM(inSelected, 110, 10 ,
          (tracks) => {
              console.log('selected tracks by bpm:');
              console.log(tracks);
              dispatch(playlistActions.setTracksForRun(tracks))
          },
          (error) => {
              setIsLoading(false);
              console.log(error);
          }
        ); //BPM and allowance
      
    };

    const confirmation = () => {
        getTracksForRun().then(() => {
            props.setSelectionToggle(false)
            navigation.navigate("RunningMain")
        })
    }
    
    return (
      <Modal visible={props.selectionToggle} transparent={false}>
        <View style={styles.popUpBackground}>
          <View style={styles.popUp}>
            <View
              style={{
                height: 0.07 * height,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text style={{...textStyle.subHeader, fontWeight: 'bold', color: color.secondary}}>
                Recommended BPM:
              </Text>
              <Text style={{...textStyle.subHeader, fontWeight: 'bold', color: color.secondary}}>
                {LOWERLIMIT} - {UPPERLIMIT}
              </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={playlists}
              contentContainerStyle={{paddingBottom: 25}}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <SelectablePlaylistItem
                  item={item}
                  inserted={inSelected}
                  insert={setInSelected}
                />
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => props.setSelectionToggle(false)}>
              <Image
                source={require('../../assets/icons/close.png')}
                style={{
                  height: 27.5,
                  width: 27.5,
                  tintColor: color.primary,
                }}
              />
            </TouchableOpacity>

            {/* Confirm Button */}
            <View style={{
              position: 'absolute',
              bottom: 10,
            }}>
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  mode="contained"
                  onPress={confirmation}     
                  theme={{ colors: { primary: color.primary}}}        
                >
                    <Text style={{color: '#FFFFFF'}}>Confirm</Text>
                </Button>
            </View>
            
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  popUpBackground:{
      backgroundColor: '#000000aa',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  popUp:{
      backgroundColor: '#FFFFFF',
      width: width - 20,
      height: 0.8 * height,
      borderRadius: 15,
      elevation: 10,
      justifyContent:'center',
      alignItems: 'center',
  },
  closeButton:{
      position: 'absolute',
      width: 47.5,
      height: 47.5,
      borderRadius: 24,
      backgroundColor: '#fdfdfd',
      top: 0.01 * height,
      left: 0.01 * height,
      elevation: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export default PreRunSelection;
