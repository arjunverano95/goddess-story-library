import {Button} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../constants';

interface OfflineScreenProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

const OfflineScreen: React.FC<OfflineScreenProps> = ({
  onRetry,
  isRetrying = false,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📡</Text>
        </View>

        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.subtitle}>
          Please check your internet connection and try again
        </Text>

        <Button
          title={isRetrying ? 'Checking Connection...' : 'Try Again'}
          onPress={onRetry}
          loading={isRetrying}
          disabled={isRetrying}
          buttonStyle={styles.retryButton}
          titleStyle={styles.retryButtonText}
        />

        <Text style={styles.hint}>
          Make sure you&apos;re connected to Wi-Fi or mobile data
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    fontSize: 64,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.greyOutline,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginBottom: 16,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  hint: {
    fontSize: 14,
    color: Colors.greyOutline,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default OfflineScreen;
