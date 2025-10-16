import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Index() {
  useEffect(() => {
    // For web platform, redirect immediately
    if (Platform.OS === 'web') {
      window.location.href = 'https://www.waifucollection.com/';
    }
  }, []);

  // For web, show loading while redirecting
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f2a4a8" />
        <Text style={styles.loadingText}>
          Redirecting to Waifu Collection...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffdfd',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});
