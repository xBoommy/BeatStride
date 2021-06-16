import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, Dimensions, Text, TouchableOpacity } from 'react-native';
import * as Firestore from '../../../api/firestore';

import color from '../../../constants/color'

const {width, height} = Dimensions.get("window")

const JoinForm = (props) => {
    const popToggle = props.popToggle;
    const setPopToggle = props.setPopToggle;
    const setJoin = props.setJoin;
    const id = props.id;

    return(
        <Modal
            transparent={true}
            visible={popToggle}
        >   
            {/* Transulcent Background */}
            <View 
                style={{
                    backgroundColor: '#77777777',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* PopUp */}
                <View 
                    style={{
                        backgroundColor: '#FFFFFF',
                        width: 0.9 * width,
                        height: 0.9 * height,
                        borderRadius: 15,
                        elevation: 5,
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Form */}
                    <Text 
                        style={{
                            textAlign:'center', 
                            fontWeight: 'bold',
                        }}
                    >
                        Indemnity Form
                    </Text>

                    {/* Buttons */}
                    <View style={{
                        flexDirection: 'row',
                        width: 0.9 * width,
                        justifyContent: 'space-around',
                        position: 'absolute',
                        bottom: 0.02 * height
                    }}>
                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: color.secondary,
                                height: 0.05 * height,
                                width: 0.2 * width,
                                borderRadius: height,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => setPopToggle(false)}
                        >
                            <Text style={{fontWeight:'bold'}}>Cancel</Text>
                        </TouchableOpacity>

                        {/* Confirm Button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: color.primary,
                                height: 0.05 * height,
                                width: 0.2 * width,
                                borderRadius: height,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                setPopToggle(false);
                                setJoin(true);
                                Firestore.db_joinEvent(id);
                            }}
                        >
                            <Text style={{fontWeight:'bold'}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                    

                </View>
            </View>
        </Modal>
    );
};
export default JoinForm;