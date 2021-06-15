import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import Screen from '../../../constants/screen';
import textStyle from '../../../constants/textStyle';
import color from '../../../constants/color';

import CommunityStats from './CommunityStats';
import CommunityRanking from './CommunityRanking';

/* Retrieve community data from database
    1. for each region, find total distance
    2. store as object {'region':'total distance'} 
    3. store each consolidated object in array
    4. sort array
    5. display onto ranking*/

//EXAMPLE REGION DATA
const region_data = {
    North : {
        userID_1: 12,
        userID_2: 45,
        userID_3: 23,
        userID_4: 43,
        userID_5: 49,
        userID_6: 15,
        userID_7: 9,
        userID_8: 26,
        userID_9: 74,
        userID_10: 10,
    },
    South: {
        userID_1: 12,
        userID_2: 45,
        userID_3: 23,
        userID_4: 43,
        userID_8: 26,
        userID_9: 74,
        userID_10: 10,
    },
    East: {
        userID_1: 12,
        userID_2: 5,
        userID_3: 23,
        userID_4: 43,
        userID_6: 15,
        userID_7: 9,
        userID_8: 6,
        userID_9: 74,
        userID_10: 10,
    },
    West: {
        userID_1: 12,
        userID_2: 45,
        userID_3: 2,
        userID_4: 43,
        userID_5: 4,
        userID_6: 15,
        userID_7: 9,
        userID_8: 2,
        userID_9: 74,
        userID_10: 0,
    }
}

//EXAMPLE USER DATA
const user_data = {
    events: {},
    history: {},
    profile:{
        name: "James",
        id: "userID_1",
        region: "North",
        age: 18,
        gender: "Male",
        total_distance: 27,
        total_runs: 3,
        image: require('../../../assets/icons/defaultprofile.png'),
    }
}

const {width, height} = Dimensions.get("window")

const CommunityComponent = (props) => {

    const user_region = user_data.profile.region;               //User Region
    const user_id = user_data.profile.id;                       //User ID
    const user_distance = user_data.profile.total_distance;     //User Total Distance

    const [regionDistance, setRegionDistance] = useState(0);    //User's Region's Total Distance
    const [ranking, setRanking] = useState([]);                 //Inter-Region Ranking Array
    const [field, setField] = useState("average");              //Sort Field

    /* Comparison Functions */
    const compareByTotal = (a, b) => {
        if (a.total_distance < b.total_distance) {
            return 1
        } else {
            return -1
        }
    } 
    const compareByParticipant = (a, b) => {
        if (a.participants < b.participants) {
            return 1
        } else {
            return -1
        }
    } 
    const compareByAverage = (a, b) => {
        if (a.average_distance < b.average_distance) {
            return 1
        } else {
            return -1
        }
    } 

    /* Sort Data Function */
    const sortingData = (array, field) => {
        let sortedRanking 
        if (field == 'total') {
            sortedRanking = array.sort(compareByTotal);
        }
        if (field == 'participants') {
            sortedRanking = array.sort(compareByParticipant);
        }
        if (field == 'average') {
            sortedRanking = array.sort(compareByAverage);
        }

        setRanking(sortedRanking);
    }
    
    /* Compile Data Function */
    const compileData = async(data) => {
        let array =[...ranking];

        for (const region in data) {
            if (!data.hasOwnProperty(region)) {continue;}

            const area = data[region];

            let total_distance = 0;
            let participants = 0;

            for (const user in area) {
                const distance = area[user];
                
                total_distance += distance;
                participants ++
            }
            
            let average_distance
            if (participants === 0) {
                average_distance = 0;
            } else {
                average_distance = (total_distance/participants);
            }
            
            const compiled = { region:region, total_distance:total_distance, participants:participants, average_distance:average_distance }
            array.push(compiled)

            //Get User's Region's Total Distance
            if (area == user_region) {
                setRegionDistance(total_distance)
            }
        }
        return array;
    }

    /* Initial Data Compilation & Render */
    useEffect(async() => {
        compileData(region_data).then((array) => sortingData(array, field))
    }, [])

    /* Sort Render */
    useEffect(() => {
        const array = [...ranking]
        sortingData(array, field)
    }, [field])

    // useEffect(()=>{
    //     console.log(ranking)
    // },[ranking])
    
    return(
        <Screen>
            <View style={{alignItems: 'center'}}>

                {/* Main Component Container */}
                <View
                    style={{
                        width: 0.9 *  width,
                        height: 0.70 * height,
                        justifyContent: 'space-between',
                        // backgroundColor: 'yellow',
                        alignItems:'center',
                    }}
                >
                    {/* Stats */}
                    <View
                        style={{
                            backgroundColor: color.primary,
                            width: 0.9 *  width,
                            height: 0.2 * height,
                            borderRadius: 15,
                            elevation: 5,
                        }}
                    >
                        <CommunityStats
                            regionDistance={regionDistance}
                            user_region={user_region}
                            user_distance={user_distance}
                        />
                    </View>
                    
                    {/* Sort Container */}
                    <View style={{
                        flexDirection: 'row',
                        width: 0.85 *  width,
                        alignItems:'center',
                        justifyContent:'flex-start',
                    }}> 
                        {/* Sort Title */}
                        <View style={{paddingRight: 0.02 * width}}>
                            <Text style={{
                                fontSize: 0.02 * height,
                                fontWeight: 'bold',
                                color: color.secondary,
                            }}>
                                Sort By: 
                            </Text>
                        </View>
                        
                        {/* Sort Button */}
                        <View style={{
                            backgroundColor: '#F1F3F3',
                            height: 0.028 * height,
                            borderRadius: height,
                            paddingHorizontal: 0.05 * width,
                            elevation: 5,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (field == 'average') {
                                        setField("total")
                                    }
                                    if (field == 'total') {
                                        setField("participants")
                                    }
                                    if (field == 'participants') {
                                        setField("average")
                                    }
                                }}
                            >
                                <Text style={{
                                    fontSize: 0.02 * height,
                                    fontWeight: 'bold',
                                }}>
                                    {(field == 'average') ? "Average Distance" : ((field == 'total') ? "Total Distance" : "Participants")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    


                    {/* Community Ranking */}
                    <View
                        style={{
                            backgroundColor: '#F1F3F3',
                            width: 0.9 *  width,
                            height: 0.45 * height,
                            borderRadius: 15,
                            elevation: 5,
                            overflow:'hidden',
                        }}
                    >
                        {/* <FlatList/> */}
                        <FlatList
                            data={ranking}
                            keyExtractor={item => item.region}
                            renderItem={({item, index}) => 
                                <CommunityRanking
                                    rank={index}
                                    region={item.region}
                                    total_distance={item.total_distance}
                                    average_distance={item.average_distance}
                                    participants={item.participants}
                                    field={field}
                                />
                            }
                        />
                    </View>

                </View>
            </View>
        </Screen>
    );
};

export default CommunityComponent;