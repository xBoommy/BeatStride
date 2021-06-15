import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from "@react-navigation/native";

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';
import color from '../../constants/color';

import ProfilePicture from './components/ProfilePicture';
import PersonalInfo from './components/Personalnfo';
import Ranking from './components/Ranking';
import Achievements from './components/Achievements';

import * as Authentication from "../../api/auth";



//Sample user_data
const user_data = {
    events: {},
    history: {},
    profile:{
        name: "James",
        id: "userID_1",
        region: "North",
        age: 18,
        gender: "Male",
        total_distance: 27,
        total_runs: 3,
        image: require('../../assets/icons/defaultprofile.png'),
    }
}

const {height} = Dimensions.get('window');

const ProfileMain = ({navigation}) => {

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const [uid, setUid] = useState(Authentication.getCurrentUserId);

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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ProfilePicture image={user_data.profile.image} />
            <PersonalInfo
              name={user_data.profile.name}
              displayname={user_data.profile.id}
              region={user_data.profile.region}
              age={user_data.profile.age}
              gender={user_data.profile.gender}
              totaldistance={user_data.profile.total_distance}
              totalruns={user_data.profile.total_runs}
            />
            <View style={{flexDirection: 'row'}}>
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