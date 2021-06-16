import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
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

  const [isRanking, setIsRanking] = useState(true);

  useEffect(() => {
    Firestore.db_getUserData().then((user) => {
      setDisplayName(user.displayName);
      setUid(user.uid);
      setAge(user.age);
      setGender(user.gender);
      setRegion(user.region);
      setRunCount(user.runCount);
      setTotalDistance(user.totalDistance);
    });
  },[]);

  

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
      <View style={styles.container}>
        <Screen>
          <Text style={textStyle.header}>Profile</Text>
          <View style={styles.innerContainer}>
            <View>
              {/* Profile Picture */}
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ProfilePicture
                  image={require('../../assets/icons/defaultprofile.png')}
                />
              </View>
              {/* Age, Name, Gender Block */}

              <View style={{height: 0.315 * height}}>
                <View style={{width: width - 40, alignItems: 'center'}}>
                  <View
                    style={{
                      width: width - 60,
                      flexDirection: 'row',
                      height: 55,
                      justifyContent: 'center',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 5,
                      overflow: 'hidden',
                      elevation: 10,
                    }}>
                    {/* Age */}
                    <View
                      style={{
                        width: 55,
                        justifyContent: 'center',
                        backgroundColor: 'cyan',
                      }}>
                      <Text
                        style={{fontSize: 22, textAlign: 'center'}}>
                        {age}
                      </Text>
                    </View>
                    {/* Name */}
                    <View
                      style={{
                        width: width - 170,
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{fontSize: 28, textAlign: 'center'}}>
                        {displayName}
                      </Text>
                    </View>
                    {/* Gender Icon */}
                    <View
                      style={{
                        width: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'yellow',
                      }}>
                      {gender === 'Male' ? (
                        <Icon name="male-symbol" size={45} />
                      ) : gender === 'Female' ? (
                        <Icon name="Female-symbol" size={45} />
                      ) : (
                        <Icon2 name="male-female" size={45} />
                      )}
                    </View>
                  </View>
                </View>
                {/* Region */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 0.1 * height,
                  }}>
                  <View
                    style={{
                      paddingVertical: 0.015 * height,
                      backgroundColor: 'pink',
                      width: width - 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 5,
                    }}>
                    <Text style={{fontSize: 21}}>{region}</Text>
                  </View>
                </View>
                {/* Run Boxes */}
                <View
                  style={{
                    flexDirection: 'row',
                    height: 0.12 * height,
                    justifyContent: 'space-around',
                  }}>
                  {/* Total Runs */}
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      width: '45%',
                      paddingTop: 0.015 * height,
                      alignItems: 'center',
                      borderRadius: 15,
                      elevation: 5,
                    }}>
                    <Text style={{fontSize: 16}}>Total Runs</Text>
                    <View style={{height: '50%', justifyContent: 'center'}}>
                      <Text style={{fontSize: 26}}>{runCount}</Text>
                    </View>
                  </View>

                  {/* Total Distance */}
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      width: '45%',
                      paddingTop: 0.015 * height,
                      alignItems: 'center',
                      elevation: 5,
                      borderRadius: 15,
                    }}>
                    <Text style={{fontSize: 16}}>
                      Total Distance:
                    </Text>
                    <Text style={{fontSize: 26}}>
                      {totalDistance < 1000
                        ? totalDistance.toFixed(0) + ' m'
                        : (totalDistance / 1000).toFixed(2) + 'km'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{height: 0.2 * height, alignItems: 'center'}}>
                <View
                  style={{
                    width: width - 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <TouchableOpacity
                    onPress={() => setIsRanking(true)}
                    style={{
                      backgroundColor: isRanking ? '#FFFFFF' : '#ccc',
                      width: 145,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      elevation: 5,
                    }}>
                    <Text
                      style={{fontSize: 18, textAlign: 'center'}}>
                      Ranking
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsRanking(false)}
                    style={{
                      backgroundColor: isRanking ? '#ccc' : '#FFFFFF',
                      width: 145,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      elevation: 5,
                    }}>
                    <Text
                      style={{fontSize: 18, textAlign: 'center'}}>
                      Achievements
                    </Text>
                  </TouchableOpacity>
                </View>
                {isRanking ? <Ranking /> : <Achievements />}
              </View>
            </View>

            <Button
              mode="contained"
              style={{marginTop: 10, borderRadius: 10}}
              contentStyle={{paddingVertical: 5}}
              onPress={handleLogout}
              loading={isLogoutLoading}
              disabled={isLogoutLoading}
              theme={{
                colors: {primary: color.primary, underlineColor: 'transparent'},
              }}>
              <Text style={{color: '#FFFFFF'}}>Log Out</Text>
            </Button>
          </View>
        </Screen>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      // backgroundColor: 'orange',
      //opacity: 0.7
    },
    innerContainer: {
        height: 0.9 * height,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },
});

export default ProfileMain;