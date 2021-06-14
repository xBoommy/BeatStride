import React from "react";
import { SafeAreaView, StatusBar, Dimensions } from "react-native";

const {width, height} = Dimensions.get("window")

export default (props) => {
    return (
        <SafeAreaView style={{
          paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
          paddingBottom: 0.05 * height,
          paddingHorizontal: 0.05 * width,
          ...props.style
        }} {...props}>
            {props.children}
        </SafeAreaView>
      );
};