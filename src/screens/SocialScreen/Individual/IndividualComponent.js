import React, { } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';

import Screen from '../../../constants/screen';
import textStyle from '../../../constants/textStyle';
import color from '../../../constants/color';
import RegionalCard from './RegionalCard';
import NationalCard from './NationalCard';
import CommunityCard from './CommunityCard';

const {width, height} = Dimensions.get("window")

/*
top: position & total distance, total runs

List of ranking in region vs global ()drop down list select:
    in list only position and user id 
*/
const IndividualComponent = ({navigation}) => {
    return(
        <Screen>
            <View style={{
                alignItems:'center',
            }}> 
                {/* SubHeader */}
                <View style={{
                    // backgroundColor:'blue',
                    width: 0.9 * width,
                    padding: 0.01 * width,
                }}>
                    <Text style={{fontWeight: 'bold', color: color.secondary}}>Individual Ranking:</Text>
                </View>
                
                <RegionalCard/>
                <NationalCard/>
                
                {/* SubHeader */}
                <View style={{
                    // backgroundColor:'blue',
                    width: 0.9 * width,
                    padding: 0.01 * width,
                }}>
                    <Text style={{fontWeight: 'bold', color: color.secondary}}>Community Ranking:</Text>
                </View>

                <CommunityCard/>

                
            </View>
        </Screen>
    );
};

export default IndividualComponent;