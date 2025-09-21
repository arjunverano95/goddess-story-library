import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

import BaseScreen from '../src/components/BaseScreen';
import {CARD_LISTING, LISTING_DATA} from '../src/constants';

export default function FireLegendPage() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400).delay(50)}
    >
      <BaseScreen
        collection={CARD_LISTING.FL}
        title={LISTING_DATA[CARD_LISTING.FL].name}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },
});
