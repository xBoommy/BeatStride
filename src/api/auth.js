import firebase from "./firebase";
import React, { createContext  } from 'react';
import { Alert } from 'react-native';

const auth = firebase.auth();

export const signIn = async ({ email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return onSuccess(user);
  } catch (error) {
    return onError(error);
  }
}

export const createAccount = async ({ name, email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      await user.updateProfile({ displayName: name });
      await user.sendEmailVerification();
      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
}

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUserName = () => auth.currentUser ? auth.currentUser.displayName : null;

export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) => auth.onAuthStateChanged((user) => {
  if (user) {
    return onUserAuthenticated(user);
  } else {
    return onUserNotFound(user);
  }
});

export const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    try {
        //re-authenticate for PW change
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credentials);

        //Change PW after re-authentication
        await user.updatePassword(newPassword);

        // console.log("Password changed");

        return true; //successful
    } catch (error) {
        if (error.code == "auth/wrong-password") {
          Alert.alert(
            "Current Password Wrong",
            "Please ensure that the current password you've entered is correct.",
            [ { text:"Understood", onPress: () => {} } ]
          )
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert(
          "Weak New Password",
          "Please ensure that the new password you've entered meets the minimum requirement of 6 characters.",
          [ { text:"Understood", onPress: () => {} } ]
          )
        };
        
        return false;
    }
}

export const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);

        Alert.alert(
          "Email Sent",
          "The link to reset your password has been sent to your email.",
          [{ text: 'Understood', onPress: ()=>{} }],
        );
        return true;
    } catch (error) {
        if (error.code == "auth/invalid-email") {
          Alert.alert(
            "Invalid Email",
            "Please ensure that the email you've entered is valid.",
            [ { text:"Understood", onPress: () => {} } ]
            )
        }
        if (error.code == "auth/user-not-found") {
          Alert.alert(
            "User Not Found",
            "There are no accounts with the email address. Please ensure the email address is associated to your account.",
            [{ text: 'Ok', onPress: ()=>{} }],
          );
        }
        console.log(error)
        
        return false;
    }
}