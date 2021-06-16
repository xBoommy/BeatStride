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
                        backgroundColor: "#E55B5B",
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
                                backgroundColor: '#F57171',
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
                                        }}>27</Text>
                                    
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
                                }}> th</Text>
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
                                <Text style={{fontSize: 0.04 * height, fontWeight:'bold', color: "#FFFFFF"}}>North</Text>
                                <Text style={{fontSize: 0.02 * height, fontWeight:'bold', color: "#FFFFFF"}}>806</Text>
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
                                    color: color.primary,
                                    backgroundColor: '#FFFFFF',
                                }}>Regional</Text>
                            </View>
                        </View>
                        

                    </View>
                </View>
                

        </View>
    )
}

export default Card