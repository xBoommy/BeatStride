import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, Animated} from 'react-native';

import GuideItem from './GuideItem';
import guideSlides from './GuideSlides';
import PageIndicator from './PageIndicator';

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
        <Text>Guide</Text>
        <View style={{flex: 3}}>
        <FlatList
          data={guideSlides}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GuideItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
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
    },
});

export default Guide;
