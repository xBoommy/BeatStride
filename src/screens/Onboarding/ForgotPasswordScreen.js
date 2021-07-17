import React, {useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { resetPassword } from '../../api/auth';

const ForgotPasswordScreen = ({navigation}) => {

    const [email, setEmail] = useState('');

    const resetPasswordHandler = async () => {
        const res = await resetPassword(email);
        if (res) {
            navigation.goBack();
        }
    };

    return (
        <View>
            <TextInput
                  mode="outlined"
                  label="Email address"
                  keyboardType="email-address"
                  style={{ marginTop: 10 }}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  returnKeyType="next"
                  left={<TextInput.Icon name="at" color={email ? '#7289DA' : '#BABBBF'} />}
                  theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
            />

            <Button         
                  mode="contained"
                  style={{ marginTop: 20, borderRadius: 10 }}
                  contentStyle={{ paddingVertical: 5 }}
                  onPress={ resetPasswordHandler }
                  theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >
                <Text style={{color: '#FFFFFF'}}>Reset Password</Text>
            </Button>
        </View>
    )
};

export default ForgotPasswordScreen;
