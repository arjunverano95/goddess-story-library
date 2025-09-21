import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

import BaseScreen from '../src/components/BaseScreen';
import {DEFAULT_LISTING} from '../src/constants';

export default function Index() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400).delay(50)}
    >
      <BaseScreen
        collection={DEFAULT_LISTING.slug}
        title={DEFAULT_LISTING.name}
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
