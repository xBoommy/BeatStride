import React from 'react';
import { StyleSheet,  Text,  View, Dimensions, Modal, ActivityIndicator } from 'react-native';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing loading page when the App is loading.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const SelectLoading = (props) => {
    const isLoading = props.isLoading;

    return (
        <Modal visible={isLoading} transparent={true} animationType={'fade'}>
            <View style={styles.modal}>

                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Please wait</Text>
                    {/* Loading Screen to customise */}
                    <ActivityIndicator animating size="large" color="#BABBBF" />
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        width: width,
        height: height,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    loadingContainer:{
        width: width * 0.5,
        height: height * 0.2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#000000aa',
    },
    loadingText:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#BABBBF',
    },
})

export default SelectLoading;
