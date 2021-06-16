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
                        backgroundColor: '#9C4FF1',
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
                                backgroundColor: '#BB85F7',
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
                                        }}>2</Text>
                                    
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
                                }}> nd</Text>
                            </View>
                        </View>

                        
                        <View style={{
                            justifyContent: 'center', 
                            alignItems: 'center',
                            // backgroundColor:'red',
                            width: 0.53 * width,
                        }}>
                            <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:0.06 * height}}>North</Text>

                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:0.02 * height, textAlignVertical:'center'}}>South</Text>
                                <View style={{paddingHorizontal: 0.01 * height}}>
                                    <View style={{width:0.01 * height, height: 0.01 * height, borderRadius: height, backgroundColor: "#FFFFFF" }}/>
                                </View>
                                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:0.02 * height , textAlignVertical:'center'}}>East</Text>
                                <View style={{paddingHorizontal: 0.01 * height}}>
                                    <View style={{width:0.01 * height, height: 0.01 * height, borderRadius: height, backgroundColor: "#FFFFFF" }}/>
                                </View>
                                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:0.02 * height , textAlignVertical:'center'}}>West</Text>
                            </View>
                            
                        </View>
                        

                    </View>
                </View>
                

        </View>
    )
}

export default Card