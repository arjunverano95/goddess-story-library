import React from 'react';
import {Text, YStack} from 'tamagui';

export default function ProfileScreen() {
  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$background"
    >
      <Text fontSize={24} fontWeight="700" color="#333" marginBottom={8}>
        Profile
      </Text>
      <Text fontSize={16} color="#666">
        Coming Soon
      </Text>
    </YStack>
  );
}
