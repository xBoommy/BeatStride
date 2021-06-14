import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';

const {width, height} = Dimensions.get("window")

const SocialMain = ({navigation}) => {
    const [component, setComponent] = useState("individual")

    return(
        <Screen>
            {/* Header */}
            <Text style={textStyle.header}>Social</Text>

            {/* Content */}
            <View style={{alignItems:'center', backgroundColor:'blue'}}>

                {/* Component Navigation */}
                <View style={{
                    flexDirection: 'row', 
                    backgroundColor:'pink', 
                    justifyContent:'space-around',
                    width: 0.5 * width,
                    padding: 0.01 * height,
                }}
                >
                    <TouchableOpacity>
                        <Text style={textStyle.subHeader}>Individual</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={textStyle.subHeader}>Community</Text>
                    </TouchableOpacity>
                </View>

                {/* Component */}
                


            </View>
            

        </Screen>
    );
};

export default SocialMain;