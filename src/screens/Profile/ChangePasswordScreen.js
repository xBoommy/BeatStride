import React, {useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { changePassword } from '../../api/auth';

const ChangePasswordScreen = ({navigation}) => {

    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

    const [newPassword2, setNewPassword2] = useState('');
    const [isNewPasswordVisible2, setIsNewPasswordVisible2] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const changePasswordHandler = async () => {
        if (newPassword == newPassword2) {
            const res = await changePassword(password, newPassword);
            if (res) {
                navigation.goBack();
            }
        } else {
            Alert.alert(
                "Error",
                "New Passwords Keyed in do not Match!",
                [ {text: 'Ok', onPress: ()=>{} }],
            )
        }
    }

    return (
        <View>

            <TextInput
                  mode="outlined"
                  label="Current Password"
                  style={{ marginTop: 10 }}
                  placeholder="Current Password"
                  value={password}
                  onChangeText={setPassword}
                  left={<TextInput.Icon name="form-textbox-password" color={password ? '#7289DA' : '#BABBBF'} />}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsPasswordVisible((state) => !state)} />}
                  theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
            />

            <TextInput
                  mode="outlined"
                  label="New Password"
                  style={{ marginTop: 10 }}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  left={<TextInput.Icon name="form-textbox-password" color={newPassword ? '#7289DA' : '#BABBBF'} />}
                  secureTextEntry={!isNewPasswordVisible}
                  autoCapitalize="none"
                  right={<TextInput.Icon name={isNewPasswordVisible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsNewPasswordVisible((state) => !state)} />}
                  theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
            />

            <TextInput
                  mode="outlined"
                  label="Re-Enter New Password"
                  style={{ marginTop: 10 }}
                  placeholder="Re-Enter New Password"
                  value={newPassword2}
                  onChangeText={setNewPassword2}
                  left={<TextInput.Icon name="form-textbox-password" color={newPassword2 ? '#7289DA' : '#BABBBF'} />}
                  secureTextEntry={!isNewPasswordVisible2}
                  autoCapitalize="none"
                  right={<TextInput.Icon name={isNewPasswordVisible2 ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsNewPasswordVisible2((state) => !state)} />}
                  theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
            />

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
        </View>
    )
};

export default ChangePasswordScreen;
