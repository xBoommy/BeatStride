import React from 'react';
import { StyleSheet,  Modal,  View, Dimensions, TouchableOpacity, Image, Text } from 'react-native';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the profile picture display of users.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const ProfilePictureView = (props) => {
    const toggleImage = props.toggleImage;
    const setToggleImage = props.setToggleImage;
    const displayPicture = props.displayPicture;

    return (
        <Modal visible={toggleImage} transparent={true} animationType={'slide'}>
            <View style={styles.modal}>

                <View style={{...styles.pictureContainer}}>
                    { (displayPicture.uri != "") &&
                        <Image style={styles.pictureContainer} source={displayPicture} /> 
                    }
                </View>

                {/* Button Container */}
                <View style={styles.buttonContainer}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={() => {setToggleImage(false)}}>
                        <View style={styles.closeButton}>
                            <Text style={styles.buttonText}>Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
    },
    pictureContainer: {
        width: width * 0.9,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F535C',
    },
    buttonContainer:{
        paddingTop: height * 0.02,
        alignSelf: 'center',
    },
    closeButton:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7289DA',
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default ProfilePictureView;
