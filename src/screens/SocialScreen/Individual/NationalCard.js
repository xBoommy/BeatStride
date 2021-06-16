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
                        width: width-40,
                        height: 150,
                        borderRadius: 15,
                        justifyContent:'space-between',
                        alignItems:'center',
                        flexDirection:'row',
                        elevation: 10,
                    }}> 

                        {/* Position */}
                        <View style={{paddingLeft: 15}}>
                            <View style={{
                                flexDirection: 'row', 
                                backgroundColor: '#F7A65D',
                                width: 120,
                                height: 120,
                                borderRadius: 15,
                            }}>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft: 20,}}>
                                    
                                        <Text style={{
                                            textAlign:'center', 
                                            fontWeight:'bold',
                                            fontSize: 55,
                                            color:'#FFFFFF',
                                        }}>41</Text>
                                    
                                    <Text style={{
                                        fontWeight:'bold', 
                                        fontSize: 18,
                                        color:'#FFFFFF',
                                    }}>Position</Text>
                                </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color:'#FFFFFF',
                                }}> st</Text>
                            </View>
                        </View>

                        
                        <View style={{
                            justifyContent: 'center', 
                            alignItems: 'center',
                            // backgroundColor:'red',
                            flexDirection: 'row',
                            width: width-200,
                        }}>
                            <View style={{alignItems: 'flex-end', transform:[{translateX:40}],}}>
                                <Text style={{fontSize: 28, fontWeight:'bold', color: "#FFFFFF"}}>Total</Text>
                                <Text style={{fontSize: 14, fontWeight:'bold', color: "#FFFFFF"}}>2238</Text>
                                <Text style={{fontSize: 14, fontWeight:'bold', color: "#FFFFFF"}}>members</Text>
                            </View>

                            {/* Label */}
                            <View style={{
                                transform: [{rotate: '90deg'},{translateY:-5}],
                                width: 150,
                                // backgroundColor:'pink',
                            }}>
                                <Text style={{
                                    textAlign:'center', 
                                    fontWeight:'bold',
                                    fontSize: 30,
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