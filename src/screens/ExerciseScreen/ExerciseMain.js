import React, { } from 'react';
import { View, Text } from 'react-native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';

//Temp
import PreRunSelection from './PreRunSelection';
const ExerciseMain = ({navigation}) => {
    return(
        <Screen>
            <Text style={textStyle.header}>Exercise</Text>
            <PreRunSelection/>
        </Screen>
    );
};

export default ExerciseMain;
