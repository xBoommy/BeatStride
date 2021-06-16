import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const {height} = Dimensions.get('window');

export default ({image}) => {
    return (
      <View>
        <TouchableOpacity>
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 0.15 * height,
        width: 0.15 * height,
        borderColor: '#505050',
        borderWidth: 8,
        borderRadius: 0.1 * height,
        marginBottom: 10,
    }
})
