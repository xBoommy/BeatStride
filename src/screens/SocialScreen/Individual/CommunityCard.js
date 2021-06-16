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
                        width: width-40,
                        height: 125,
                        borderRadius: 15,
                        justifyContent:'space-between',
                        alignItems:'center',
                        flexDirection:'row',
                        elevation: 10,
                    }}> 

                        {/* Position */}
                        <View style={{paddingLeft: 10}}>
                            <View style={{
                                flexDirection: 'row', 
                                backgroundColor: '#BB85F7',
                                width: 105,
                                height: 105,
                                borderRadius: 15,
                            }}>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft: 15,}}>
                                    
                                        <Text style={{
                                            textAlign:'center', 
                                            fontWeight:'bold',
                                            fontSize: 50,
                                            color:'#FFFFFF',
                                        }}>2</Text>
                                    
                                    <Text style={{
                                        fontWeight:'bold', 
                                        fontSize: 16,
                                        color:'#FFFFFF',
                                    }}>Position</Text>
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color:'#FFFFFF',
                                }}> nd</Text>
                            </View>
                        </View>

                        
                        <View style={{
                            justifyContent: 'center', 
                            alignItems: 'center',
                            // backgroundColor:'red',
                            width: width-175,
                        }}>
                            <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:50}}>North</Text>

                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:16, textAlignVertical:'center'}}>South</Text>
                                <View style={{paddingHorizontal: 10}}>
                                    <View style={{width:5, height: 5, borderRadius: 5, backgroundColor: "#FFFFFF" }}/>
                                </View>
                                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:16 , textAlignVertical:'center'}}>East</Text>
                                <View style={{paddingHorizontal: 10}}>
                                    <View style={{width:5, height: 5, borderRadius: 5, backgroundColor: "#FFFFFF" }}/>
                                </View>
                                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:16 , textAlignVertical:'center'}}>West</Text>
                            </View>
                            
                        </View>
                        

                    </View>
                </View>
                

        </View>
    )
}

export default Card