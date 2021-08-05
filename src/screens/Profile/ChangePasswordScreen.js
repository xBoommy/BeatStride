import React, {useState, useRef} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Alert, Dimensions, Keyboard } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { changePassword } from '../../api/auth';

const {width, height} = Dimensions.get('window');


/**
 * This is a functional component representing the screen users will be directed to
 * to edit their password.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const ChangePasswordScreen = ({navigation}) => {

    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const passwordTextInput = useRef();

    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const newPasswordTextInput = useRef();

    const [newPassword2, setNewPassword2] = useState('');
    const [isNewPasswordVisible2, setIsNewPasswordVisible2] = useState(false);
    const newPassword2TextInput = useRef();

    const [isLoading, setIsLoading] = useState(false);

    /**
     * This method handles the password change function on Firebase Authentication 
     * and navigates the user back to Edit Profile Screen upon success.
     */
    const changePasswordHandler = async () => {
        setIsLoading(true);
        Keyboard.dismiss();

        if ( (password == "") || (password.length < 6) ) {
            setIsLoading(false);
            Alert.alert(
                "Current Password Invalid",
                "Please ensure that the current password you've entered is valid.",
                [ { text:"Understood", onPress: () => {passwordTextInput.current.focus()} } ]
            )
        } else if (newPassword != newPassword2) {
            setIsLoading(false);
            Alert.alert(
                "New Passwords Do Not Match",
                "Please ensure that the new passwords you've entered matches.",
                [ { text:"Understood", onPress: () => {newPassword2TextInput.current.focus()} } ]
            )
        } else {
            const res = await changePassword(password, newPassword);
            if (res) {
                navigation.goBack();
            } else {
                setIsLoading(false);
            }
        }
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView 
                contentContainerStyle={styles.screenScroll} 
                keyboardShouldPersistTaps="always" 
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Change your password</Text>

                <TextInput
                    ref={passwordTextInput}
                    mode="outlined"
                    label="Current Password"
                    style={{ marginTop: 10 }}
                    placeholder="Current Password"
                    value={password}
                    onChangeText={setPassword}
                    left={<TextInput.Icon name="form-textbox-password" color={password ? '#7289DA' : '#BABBBF'} />}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    onSubmitEditing={() => newPasswordTextInput.current.focus()}
                    right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsPasswordVisible((state) => !state)} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <TextInput
                    ref={newPasswordTextInput}
                    mode="outlined"
                    label="New Password"
                    style={{ marginTop: 10 }}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    left={<TextInput.Icon name="form-textbox-password" color={newPassword ? '#7289DA' : '#BABBBF'} />}
                    secureTextEntry={!isNewPasswordVisible}
                    autoCapitalize="none"
                    onSubmitEditing={() => newPassword2TextInput.current.focus()}
                    right={<TextInput.Icon name={isNewPasswordVisible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsNewPasswordVisible((state) => !state)} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <TextInput
                    ref={newPassword2TextInput}
                    mode="outlined"
                    label="Re-Enter New Password"
                    style={{ marginTop: 10 }}
                    placeholder="Re-Enter New Password"
                    value={newPassword2}
                    onChangeText={setNewPassword2}
                    left={<TextInput.Icon name="form-textbox-password" color={newPassword2 ? '#7289DA' : '#BABBBF'} />}
                    secureTextEntry={!isNewPasswordVisible2}
                    autoCapitalize="none"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    right={<TextInput.Icon name={isNewPasswordVisible2 ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsNewPasswordVisible2((state) => !state)} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <Text style={styles.passwordWarningText}>
                    { (newPassword2 == "") ? "" : ((newPassword === newPassword2) ? "New Passwords Match" : "New Passwords DO NOT Match")}
                </Text>

                <Button         
                    mode="contained"
                    style={{ marginTop: 20, borderRadius: 10 }}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={ changePasswordHandler }
                    loading={isLoading}
                    disabled={isLoading}
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                    >
                    <Text style={{color: '#FFFFFF'}}>Change Password</Text>
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
    passwordWarningText:{
        fontSize: 14,
        paddingTop: 10,
        // textDecorationLine: 'underline',
        color: '#7289DA',
    },
});

export default ChangePasswordScreen;
