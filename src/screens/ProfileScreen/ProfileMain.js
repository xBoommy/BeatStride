import React, { } from 'react';
import { View, Text } from 'react-native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';

const ProfileMain = ({navigation}) => {
    return(
        <Screen>
            <Text style={textStyle.header}>Profile</Text>
        </Screen>
    );
};

export default ProfileMain;