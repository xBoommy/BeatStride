import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { CommonActions } from "@react-navigation/native";

import * as Authentication from "../api/auth";
import Screen from '../constants/screen';

export default ({ navigation }) => {
  useEffect(() => {
    return Authentication.setOnAuthStateChanged(
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "AppTab" }] })),
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })),
    );
  }, []);

  return (
    <Screen style={styles.screen}>

        {/* Loading Screen to customise */}
        <ActivityIndicator animating size="large" color="black" />
        
    </Screen>
  );
}

const styles = StyleSheet.create({
    screen: {
      justifyContent: "center",
      flex: 1
    }
  });