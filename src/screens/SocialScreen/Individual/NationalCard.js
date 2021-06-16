import React, { } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';

import Screen from '../../../constants/screen';
import textStyle from '../../../constants/textStyle';
import color from '../../../constants/color';

const {width, height} = Dimensions.get("window")

const Card = () => {
    return (
        <View>
             {/* Individual Regional Ranking: */}
             <View style={{padding: 0.01 * width}}>
                    <View style={{
                        backgroundColor: '#FA841B',
                        width: 0.9 * width,
                        height: 0.2 * height,
                        borderRadius: 15,
                        justifyContent:'space-between',
                        alignItems:'center',
                        flexDirection:'row',
                        elevation: 10,
                    }}> 

                        {/* Position */}
                        <View style={{paddingLeft: 0.015 * height}}>
                            <View style={{
                                flexDirection: 'row', 
                                backgroundColor: '#F7A65D',
                                width: 0.17 * height,
                                height: 0.17 * height,
                                borderRadius: 15,
                            }}>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft: 0.03 * height,}}>
                                    
                                        <Text style={{
                                            textAlign:'center', 
                                            fontWeight:'bold',
                                            fontSize: 0.08 * height,
                                            color:'#FFFFFF',
                                        }}>41</Text>
                                    
                                    <Text style={{
                                        fontWeight:'bold', 
                                        fontSize: 0.025 * height,
                                        color:'#FFFFFF',
                                    }}>Position</Text>
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 0.03 * height,
                                    color:'#FFFFFF',
                                }}> st</Text>
                            </View>
                        </View>

                        
                        <View style={{
                            justifyContent: 'center', 
                            alignItems: 'center',
                            // backgroundColor:'red',
                            flexDirection: 'row',
                            width: 0.3 * width,
                        }}>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={{fontSize: 0.04 * height, fontWeight:'bold', color: "#FFFFFF"}}>Total</Text>
                                <Text style={{fontSize: 0.02 * height, fontWeight:'bold', color: "#FFFFFF"}}>2238</Text>
                                <Text style={{fontSize: 0.02 * height, fontWeight:'bold', color: "#FFFFFF"}}>members</Text>
                            </View>

                            {/* Label */}
                            <View style={{
                                transform: [{rotate: '90deg'}, {translateY: 0.1 * width},],
                                width:0.2 * height,
                                // backgroundColor:'pink',
                            }}>
                                <Text style={{
                                    textAlign:'center', 
                                    fontWeight:'bold',
                                    fontSize: 0.045 * height,
                                    color: '#FA841B',
                                    backgroundColor: '#FFFFFF',
                                }}>National</Text>
                            </View>
                        </View>
                        

                    </View>
                </View>
                

        </View>
    )
}

export default Card