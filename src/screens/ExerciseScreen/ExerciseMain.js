import React, { } from 'react';
import { View, Text } from 'react-native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';

const ExerciseMain = ({navigation}) => {
    return(
        <Screen>
            <Text style={textStyle.header}>Exercise</Text>
        </Screen>
    );
};

export default ExerciseMain;