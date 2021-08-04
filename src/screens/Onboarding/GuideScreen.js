import React, {useState, useRef} from 'react';
import { View, StyleSheet, FlatList, Animated, Dimensions} from 'react-native';

import GuideItem from './components/GuideItem';
import guideSlides from './components/GuideSlides';
import PageIndicator from './components/PageIndicator';

const { width, height } = Dimensions.get('window');

/**
 * This is a functional component representing the guide pages that users see after creating
 * their account.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const Guide = props => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
      <View style={styles.container}>
        <View style={{flex: 3}}>
        <FlatList
          data={guideSlides}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GuideItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          overScrollMode="never"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          snapToInterval={width}
          decelerationRate="fast"
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        </View>
        <PageIndicator data={guideSlides} scrollX={scrollX} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282B30',
    },
});

export default Guide;
