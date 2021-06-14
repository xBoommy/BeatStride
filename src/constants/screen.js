import React from "react";
import { SafeAreaView, Dimensions } from "react-native";

const {width, height} = Dimensions.get("window")

export default (props) => {
    return (
        <SafeAreaView style={{
          paddingTop: 0.01 * height,
          paddingBottom: 0.01 * height,
          paddingHorizontal: 0.05 * width,
          ...props.style
        }} {...props}>
            {props.children}
        </SafeAreaView>
      );
};