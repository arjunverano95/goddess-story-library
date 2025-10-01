import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text, YStack} from 'tamagui';

interface OfflineScreenProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

const OfflineScreen: React.FC<OfflineScreenProps> = ({
  onRetry,
  isRetrying = false,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <YStack
        flex={1}
        backgroundColor="$bg"
        alignItems="center"
        justifyContent="center"
        style={{paddingHorizontal: 20}}
      >
        <YStack style={{marginBottom: 24}}>
          <Text fontSize={64} textAlign="center">
            📡
          </Text>
        </YStack>

        <Text
          fontSize={24}
          fontWeight="700"
          color="$color"
          textAlign="center"
          style={{marginBottom: 12}}
        >
          No Internet Connection
        </Text>
        <Text
          fontSize={16}
          color="$muted"
          textAlign="center"
          style={{marginBottom: 32, lineHeight: 24}}
        >
          Please check your internet connection and try again
        </Text>

        <Button
          backgroundColor="$primary"
          pressStyle={{backgroundColor: '$primaryPress'}}
          hoverStyle={{backgroundColor: '$primaryHover'}}
          borderRadius={8}
          style={{paddingHorizontal: 32, paddingVertical: 12, marginBottom: 16}}
          disabled={isRetrying}
          onPress={onRetry}
        >
          <Text fontSize={16} fontWeight="600" color="#fff">
            {isRetrying ? 'Checking Connection...' : 'Try Again'}
          </Text>
        </Button>

        <Text
          fontSize={14}
          color="$muted"
          textAlign="center"
          fontStyle="italic"
        >
          Make sure you&apos;re connected to Wi-Fi or mobile data
        </Text>
      </YStack>
    </SafeAreaView>
  );
};

// migrated to Tamagui components

export default OfflineScreen;
