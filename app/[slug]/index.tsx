import {BaseScreen} from '@/src/components';
import {useListing} from '@/src/hooks';
import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

export default function Index() {
  const {slug} = useLocalSearchParams();
  const {listing} = useListing(slug as string);
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400).delay(50)}
    >
      <BaseScreen collection={slug as string} title={listing?.name || ''} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },
});
