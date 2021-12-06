# Developer Guide
Hello! Welcome to our Application, BeatStride!

This is a react native project built from scratch and has many many areas to be improved. Feel free to contribute after reading through this document

## Prerequisite

1. Have Android Studio installed
2. Have NodeJS installed
3. Have React Native installed
4. Have some minimal knowledge on Firebase

**Note:** Detailed instructions to install these are not included. Feel free to google them yourselves :D

## Setting up instructions

1. Fork this project onto your github account.

2. Git clone a local copy of the project onto your PC.

3. Open project using your prefered IDE (recommended to use VScode).

4. Run ``npm install`` on the terminal to install dependencies.

5. Set up your firebase console by following the following steps:
    * Create a new project with any name you prefer
    * Go to project settings >> add web app >> Fill in any name you prefer and click on `Register app`.
    * Fill in the [firebase.js](/src/api/firebase.js) template file located at our project's directory './src/api/firebase.js' with your project's `firebaseConfig` as provided after you add firebase to web app.
    * Go to `Authentication` tab, click on `Set up sign-in method` >> using `Email/Password`.
    * Go to `Firestore Database` tab, click on `create database` >> `start in test mode` >> Choose your location >> `Enable`

6. Go to Google Cloud Platform, enable Cloud Firestore API.

7. On your terminal run ``npx react-native run-android`` to initiate the application.

    7a. After starting up the app successfully, you may encounter repeated warnings regarding "Setting a timer for a long period of time ...". Click [here](https://stackoverflow.com/a/62638536/13624758) for the solution to solve it.
