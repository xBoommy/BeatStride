import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator, Dimensions, SafeAreaView } from "react-native";
import { CommonActions } from "@react-navigation/native";

import * as Authentication from "../../api/auth";

const {width, height} = Dimensions.get('window');

export default ({ navigation }) => {
  useEffect(() => {
    return Authentication.setOnAuthStateChanged(
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "AppTab" }] })),
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "LoginScreen" }] })),
    );
  }, []);

  return (
    <SafeAreaView style={styles.screen}>

        {/* Loading Screen to customise */}
        <ActivityIndicator animating size="large" color="black" />
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
      paddingTop: 0.01 * height,
      paddingBottom: 0.01 * height,
      paddingHorizontal: 0.05 * width,
      justifyContent: "center",
      flex: 1
    }
  });