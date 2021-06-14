import React, { } from 'react';
import { View, Text } from 'react-native';

import Screen from '../../../constants/screen';
import textStyle from '../../../constants/textStyle';

const CommunityComponent = (props) => {
    const title = props.title;
    
    return(
        <Screen>
            <Text>Community</Text>
        </Screen>
    );
};

export default CommunityComponent;