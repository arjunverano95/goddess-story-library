import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

import BaseScreen from '../src/components/BaseScreen';

export default function SenpaiGoddessHavenPage() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400).delay(50)}
    >
      <BaseScreen
        dataUrl="/data/senpai-goddess-haven.json"
        title="Senpai Goddess Haven"
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
