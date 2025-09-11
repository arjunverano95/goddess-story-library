import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

import BaseScreen from '../../../src/components/BaseScreen';
import {CARD_LISTING} from '../../../src/constants';

export default function SenpaiGoddessHavenScreen() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400).delay(50)}
    >
      <BaseScreen collection={CARD_LISTING.SGH} title="Senpai Goddess Haven" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },
});
