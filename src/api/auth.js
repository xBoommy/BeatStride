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

        console.log("Password changed");

        Alert.alert(
          "Change Password",
          "Password Changed Successfully",
          [{ text: 'Ok', onPress: ()=>{} }],
        );
        return true; //successful
    } catch (e) {
        Alert.alert(
          "Change Password",
          "Password change failed: " + e,
          [{ text: 'Ok', onPress: ()=>{} }],
        );
        return false;
    }
}

export const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);

        Alert.alert(
          "Reset Password",
          "Password reset email sent!",
          [{ text: 'Ok', onPress: ()=>{} }],
        );
        return true;
    } catch (e) {
        Alert.alert(
          "Change Password",
          "" + e,
          [{ text: 'Ok', onPress: ()=>{} }],
        );
        return false;
    }
}