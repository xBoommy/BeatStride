import React from 'react';
import { View, Text ,TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default ({name, displayname, age, gender, region, totalruns, totaldistance}) => {
    return (
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              elevation: 5,
              borderRadius: 5,
              borderWidth: 1,
            }}>
            <Text style={styles.field}>Name: </Text>
            <Text>{name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.field}>Display Name: </Text>
            <Text>{displayname}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.field}>Region: </Text>
            <Text>{region}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 30}}>
            <Text>Age: {age}</Text>
          </View>
          <View>
            <Text>Sex: {gender}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            elevation: 5,
            borderRadius: 5,
            borderWidth: 1,
          }}>
          <Text>Total Runs: {totalruns}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            elevation: 5,
            borderRadius: 5,
            borderWidth: 1,
          }}>
          <Text>Accumulated Distance: {totaldistance}km</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#ccc',
        width: 0.90 * width,
        height: 0.25 * height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    field: {
        //borderColor: 'black',
        //borderWidth: 1,
        height: 25,
        width: 100,
        //textAlign: 'center',
    },
});