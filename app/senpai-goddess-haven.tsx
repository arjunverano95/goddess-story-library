import React from 'react';
import {View, StyleSheet} from 'react-native';

import BaseScreen from '../src/components/BaseScreen';

export default function SenpaiGoddessHavenPage() {
  return (
    <View style={styles.container}>
      <BaseScreen
        dataUrl="/data/senpai-goddess-haven.json"
        title="Senpai Goddess Haven"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },
});
