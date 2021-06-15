import React from "react";
import { SafeAreaView, Dimensions, ScrollView } from "react-native";

const {width, height} = Dimensions.get("window")

export default (props) => {
  if (props.scrollable) {
    return (
      <SafeAreaView
        style={{
          paddingTop: 0.01 * height,
          paddingBottom: 0.01 * height,
          paddingHorizontal: 0.05 * width,
          ...props.style,
        }}
        {...props}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 20}}
          keyboardShouldPersistTaps="always">
          {props.children}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          paddingTop: 0.01 * height,
          paddingBottom: 0.01 * height,
          paddingHorizontal: 0.05 * width,
          ...props.style,
        }}
        {...props}>
        {props.children}
      </SafeAreaView>
    );
  }
};