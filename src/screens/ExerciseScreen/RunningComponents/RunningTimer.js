import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import moment from 'moment';

const {width, height} = Dimensions.get("window")

const RunningTimer = (props) => {
    const runStatus = props.runStatus;
    const setDuration = props.setDuration;

    const [time, setTime] = useState(0);
    const [tick, setTick] = useState();

    /* [Tick every 1000ms increase time by 1 second] */
    const ticking = () => {
        setTime( (prevTime) => prevTime + 1000 )
    }

    /* [Start timing] */
    const startTimer = () => {
        console.log("Timer Start")
        setTick( setInterval( ticking, 1000) )
    }

    /* [Stop timing] */
    const stopTimer = () => {
        console.log("Timer Stop")
        clearInterval(tick)
    }
    
    /* [Run Status Render] 
    This render is triggered upon a change in app status */
    useEffect(() => {
        if (runStatus == 2){
            startTimer()
        }
        if (runStatus == 3){
            stopTimer()
            console.log("time====================")
            console.log(time)
        }
        if (runStatus == 4 || runStatus == 5){
            stopTimer()
            setDuration(time)
        }
    },[runStatus])
    
    /* [Convert miliseconds to time breakdown] */
    const duration = moment.duration(time)

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{duration.hours()}:{duration.minutes()}:{duration.seconds()}</Text>
                <Text style={styles.unitText}></Text>
            </View>

            <Text style={styles.label}>Duration</Text>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 5,
    },
    dataContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    dataText:{
        fontWeight: 'bold',
        fontSize: 0.045 * height,
    },
    unitText:{
        fontWeight: 'bold',
        fontSize: 0.02 * height,
    },
    label:{
        fontSize: 0.018 * height,
    }
})
export default RunningTimer;