import React, {} from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const EventInfo = ({route}) => {
    const url = route.params.url;

    return(
        <View style={{flex: 1}}>
            <WebView 
                source={{uri:url}}
                style={{flex: 1}}
            />
        </View>
    );
};

export default EventInfo;