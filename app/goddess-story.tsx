import React from 'react';
import {View, StyleSheet} from 'react-native';

import BaseScreen from '../src/components/BaseScreen';

export default function GoddessStoryPage() {
  return (
    <View style={styles.container}>
      <BaseScreen dataUrl="/data/goddess-story.json" title="Goddess Story" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },
});
