import React, {} from 'react';
import { View, Dimensions, Text } from 'react-native';

const {width, height} = Dimensions.get("window")

const CommunityRanking = (props) => {
    const region = props.region;
    const rank = props.rank + 1;
    const total_distance = props.total_distance;
    const average_distance = props.average_distance;
    const participants = props.participants;
    const field = props.field; //"total", "average", "participants"

    return(
        // Container padding
        <View 
            style={{
                // paddingBottom: 0.01 * height,
                paddingTop: 0.01 * height,
                alignItems: 'center',
            }}
        >   
            {/* Container */}
            <View
                style={{
                    width: 0.88 * width,
                    height: 0.12 * height,
                    borderRadius: height,
                    justifyContent:'flex-start',
                    backgroundColor: (rank == 1) ? '#FCC201' : ((rank == 2) ? '#AAA9AD' : ((rank == 3) ? '#A97142' : '#D8D8D8')),
                    flexDirection: 'row',
                    alignItems: 'center',                    
                }}
            >

                {/* Medal & Post-fix */}
                <View style={{flexDirection: 'row'}}>
                    {/* Circle */}
                    <View
                        style={
                            {width: 0.1 * height,
                            height: 0.1 * height,
                            borderRadius: height,
                            backgroundColor: (rank == 1) ? '#DB9200' : ((rank == 2) ? '#848482' : ((rank == 3) ? '#A05822' : '#B5B7BB')),
                            left: 0.01 * height,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* Rank Number */}
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 0.05 * height,
                                textAlign: 'center',
                            }}
                        >
                            {rank}
                        </Text>
                    </View>

                    {/* Rank Post-fix */}
                    <Text style={{fontWeight: 'bold', fontSize: 0.02 * height}}>
                        {(rank.toString().split('').pop() == 1) ? 
                            'st' : ((rank.toString().split('').pop() == 2) ? 
                                'nd' : ((rank.toString().split('').pop() == 3) ? 
                                    'rd' : 'th'))}
                    </Text>
                </View>

                {/* Region Name */}
                <View style={{paddingLeft: 0.05 * width}}>
                    <Text style={{fontWeight: 'bold', fontSize: 0.03 * height}}>{region}</Text>
                    {(field == 'total') ? <Text style={{fontSize: 0.015 * height , fontWeight: 'bold'}}>Total Dist: {Math.round(total_distance * 100)/100} km</Text> :
                            ((field == 'average') ? <Text style={{fontSize: 0.015 * height , fontWeight: 'bold'}}>Avg. Dist: {Math.round(average_distance * 10)/10} km</Text> :
                                ((field == 'participants')  ? <Text style={{fontSize: 0.015 * height , fontWeight: 'bold'}}>{participants} Participants</Text> : <></> ))
                    }
                </View>
            </View>

        </View>
    );
};

export default CommunityRanking;