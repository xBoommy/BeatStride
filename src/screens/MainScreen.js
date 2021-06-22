import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const Screen = (props) => {

  return (
    <SafeAreaView style={styles.screen}>

        <View>
            {props.children}
        </View>

        <View style={styles.navigationBar}/>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height,
        backgroundColor: '#282b30',
    },
    // header:{
    //     width: width,
    //     height: height * 0.1,
    //     justifyContent:'center',
    //     paddingHorizontal: '10%',
    //     backgroundColor: '#1e2124',
    // },
    // headerText:{
    //     color: '#BABBBF',
    //     fontSize: 28,
    //     fontWeight: 'bold',
    //     height: height * 0.1,
    //     includeFontPadding: false,
    //     textAlignVertical: 'center',
    // },
    navigationBar:{
        width: width,
        height: height * 0.1,
        backgroundColor: '#18191D',
        bottom: 0,
        position: 'absolute',
        // borderBottomWidth: height * 0.05,
        // borderBottomColor: 'yellow',
    },
})

export default Screen;