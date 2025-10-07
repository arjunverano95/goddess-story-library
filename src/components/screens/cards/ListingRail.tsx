'use client';
import {useListings} from '@/src/hooks';
import {Image} from 'expo-image';
import React from 'react';
import {Pressable} from 'react-native';
import {Text, YStack, useTheme} from 'tamagui';
interface ListingRailProps {
  onListingSelect?: (id: string) => void;
  currentListing?: string;
}

const ListingRail = ({onListingSelect, currentListing}: ListingRailProps) => {
  const {listings} = useListings();
  const theme = useTheme();

  const handleListingSelect = (id: string) => {
    if (onListingSelect) {
      onListingSelect(id);
    }
  };

  return (
    <YStack
      style={{
        flex: 1,
        backgroundColor: theme.subtleBg?.val || '#f8f9fa',
        width: 90,
        paddingTop: 20,
      }}
    >
      <YStack style={{flex: 1, paddingVertical: 10}}>
        {listings.map((item, index) => (
          <Pressable
            key={`${item.name}-${index}-${Date.now()}`}
            onPress={() => handleListingSelect(item.id)}
            style={{
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 3,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
              backgroundColor:
                currentListing === item.id
                  ? theme.primaryHover?.val
                  : undefined,
            }}
          >
            <Image
              contentFit={'cover'}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#f0f0f0',
                marginBottom: 8,
              }}
              source={{uri: item.image_url}}
            />
            <Text
              style={{
                fontSize: 10,
                fontWeight: '500',
                textAlign: 'center',
                lineHeight: 12,
                color:
                  currentListing === item.id
                    ? 'white'
                    : theme.color?.val || '#43484d',
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </YStack>
    </YStack>
  );
};

export default ListingRail;
