import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation, CommonActions } from '@react-navigation/native'; 

const { width, height } = Dimensions.get('window');

export default GuideItem = ({item}) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.container, { width}]}>

            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />
            <View style={{flex: 0.3, paddingTop: height * 0.05}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>

            <View style={{height: height * 0.1}}>
                {(item.id == 4) ?  
                    <Button
                        mode="contained"
                        style={{ marginTop: 20, borderRadius: 10 }}
                        contentStyle={{ paddingVertical: 5 }}
                        onPress={() => {
                            navigation.dispatch(CommonActions.reset({ 
                                index: 0, 
                                routes: [{ name: "AppTab" }]
                            }))
                        }}
                        theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                    >
                        <Text style={{color: '#FFFFFF'}}>Let's Go</Text>
                    </Button>
                : <></>
                }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    image: {
        height: 0.5 * width,
        width: 0.5 * width,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 10,
        color: '#7289DA',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#BABBBF',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});
