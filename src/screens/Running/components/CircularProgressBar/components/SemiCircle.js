import React from "react";
import { View } from "react-native";


/**
 * This is a functional component representing semicircles that make up the circular progress bar.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
export default ({ color, radius }) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: color,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
        }}
      />
    </View>
  );
};
