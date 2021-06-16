import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Foundation'
import Icon2 from 'react-native-vector-icons/Ionicons';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';
import color from '../../constants/color';

import ProfilePicture from './components/ProfilePicture';
import Ranking from './components/Ranking';
import Achievements from './components/Achievements';

import * as Authentication from "../../api/auth";
import * as Firestore from '../../api/firestore';




const {height, width} = Dimensions.get('window');

const ProfileMain = ({navigation}) => {

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [uid, setUid] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [runCount, setRunCount] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    Firestore.db_getUserData().then((user) => {
      setDisplayName(user.displayName);
      setUid(user.uid);
      setAge(user.age);
      setGender(user.gender);
      setRegion(user.region);
      setRunCount(user.runCount);
      setTotalDistance(user.totalDistance);
    })
  })

  

  const handleLogout = () => {
    setIsLogoutLoading(true);
    Authentication.signOut(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }, console.error);
  };

    return (
      <Screen>
        <Text style={textStyle.header}>Profile</Text>
        <ScrollView style={styles.container}>
          <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ProfilePicture
                image={require('../../assets/icons/defaultprofile.png')}
              />
            </View>
            <View style={{height: 0.3 * height}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 0.1 * height,
                  
                  justifyContent: 'center',
                  elevation: 10,
                }}>
                <View
                  style={{
                    width: 0.1 * height,
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'cyan',
                  }}>
                  <Text style={{fontSize: 0.04 * height, textAlign: 'center'}}>
                    {age}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 0.04 * height, textAlign: 'center'}}>
                    {displayName}
                  </Text>
                </View>
                <View
                  style={{
                    width: 0.1 * height,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'yellow',
                  }}>
                  {gender === 'Male' ? (
                    <Icon name="male-symbol" size={0.12 * width} />
                  ) : gender === 'Female' ? (
                    <Icon name="Female-symbol" size={0.12 * width} />
                  ) : (
                    <Icon2 name="male-female" size={0.12 * width} />
                  )}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: 0.2 * height,
                  paddingTop: 0.05 * height,
                  justifyContent: 'space-around',
                }}>
                <View style={{backgroundColor: 'orange', width: '45%', elevation: 10}}>
                  <Text style={{fontSize: 0.025 * height}}>Total Runs:</Text>
                  <Text style={{fontSize: 0.03 * height}}>{runCount}</Text>
                </View>
                <View style={{backgroundColor: 'yellow', width: '45%', elevation: 10}}>
                  <Text style={{fontSize: 0.025 * height}}>
                    Total Distance:
                  </Text>
                  <Text style={{fontSize: 0.03 * height}}>
                    {totalDistance < 1000
                      ? totalDistance + ' m'
                      : totalDistance / 1000 + 'km'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 0.05 * height}}>
              <Ranking />
              <Achievements />
            </View>
          </View>
          <Button
            mode="contained"
            style={{marginTop: 20, borderRadius: 10}}
            contentStyle={{paddingVertical: 5}}
            onPress={handleLogout}
            loading={isLogoutLoading}
            disabled={isLogoutLoading}
            theme={{
              colors: {primary: color.primary, underlineColor: 'transparent'},
            }}>
            <Text style={{color: '#FFFFFF'}}>Log Out</Text>
          </Button>
        </ScrollView>
      </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 0.73 * height,
    }
});

export default ProfileMain;