import React, {useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, Keyboard } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { resetPassword } from '../../api/auth';

const {width, height} = Dimensions.get('window');


/**
 * This is a functional component representing the screen where users are redirected
 * upon forgetting their password.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const ForgotPasswordScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [isResetLoading, setIsResetLoading] = useState(false)

    const resetPasswordHandler = async () => {
        setIsResetLoading(true);
        Keyboard.dismiss();

        const res = await resetPassword(email);
        if (res) {
            setIsResetLoading(false);
            navigation.goBack();
        } else {
            setIsResetLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView 
                contentContainerStyle={styles.screenScroll} 
                keyboardShouldPersistTaps="always" 
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.title}>Forgot your Password?</Text>
                <Text style={styles.subtitle}>Don't worry! Just fill in your email and we'll send you a link to reset your password</Text>

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
                    loading={isResetLoading}
                    disabled={isResetLoading}
                    onPress={ resetPasswordHandler }
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                    >
                    <Text style={{color: '#FFFFFF'}}>Reset Password</Text>
                </Button>

                <Button         
                    mode="outlined"
                    style={{ marginTop: 20, borderRadius: 10, backgroundColor: '#424549', borderWidth:2, borderColor: '#7289DA' }}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={() => navigation.goBack()}
                    icon="arrow-left"
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                    >
                    <Text style={{color: '#FFFFFF'}}>Go Back</Text>
                </Button>

            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screen:{
        paddingTop: 0.01 * height,
        paddingBottom: 0.01 * height,
        paddingHorizontal: 0.05 * width,
        flex: 1,
        backgroundColor: '#282b30',
    },
    screenScroll:{
        paddingBottom: 20, 
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 30,
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 10,
        color: '#7289DA',
    },
});

export default ForgotPasswordScreen;
