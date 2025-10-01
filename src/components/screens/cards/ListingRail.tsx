'use client';
import {useListings} from '@/src/hooks';
import {Image} from 'expo-image';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
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
      style={[
        styles.container,
        {backgroundColor: theme.subtleBg?.val || '#f8f9fa'},
      ]}
    >
      <YStack style={styles.content}>
        {listings.map((item, index) => (
          <Pressable
            key={`${item.name}-${index}-${Date.now()}`}
            onPress={() => handleListingSelect(item.id)}
            style={[
              styles.listItem,
              currentListing === item.id && styles.selectedItem,
            ]}
          >
            <Image
              contentFit={'cover'}
              style={styles.itemImage}
              source={{uri: item.image_url}}
            />
            <Text
              style={[styles.itemLabel, {color: theme.color?.val || '#43484d'}]}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    width: 90,
    paddingTop: 20,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  listItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 12,
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
});

export default ListingRail;
