'use client';
import {useListings} from '@/src/hooks';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {Colors} from '../constants';

interface CollectionPanelProps {
  onClose: () => void;
  onListingSelect?: (id: string) => void;
  currentListing?: string;
}

const CollectionPanel = ({
  onClose,
  onListingSelect,
  currentListing,
}: CollectionPanelProps) => {
  const {listings} = useListings();

  const handleListingSelect = (id: string) => {
    if (onListingSelect) {
      onListingSelect(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
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
              resizeMode={'cover'}
              style={styles.itemImage}
              source={{uri: item.image_url}}
              onError={(error) => {
                console.log(
                  'Icon load error for',
                  item.name,
                  ':',
                  error.nativeEvent.error,
                );
              }}
              onLoad={() => {
                console.log('Icon loaded successfully for', item.name);
              }}
            />
            <Text style={styles.itemLabel}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: 90,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    color: Colors.black,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 12,
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
});

export default CollectionPanel;
