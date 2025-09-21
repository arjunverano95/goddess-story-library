import {BaseScreen, CollectionPanel} from '@/src/components';
import {PanelProvider} from '@/src/contexts/PanelContext';
import {useListings} from '@/src/hooks';
import {useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

export default function CardsScreen() {
  const {slug} = useLocalSearchParams();
  const {listings} = useListings();
  const [panelWidth] = useState(new Animated.Value(0));
  const [currentListing, setCurrentListing] = useState(
    (slug as string) || 'goddess-story',
  );

  // Find the current listing data
  const listingData = listings.find((listing) => listing.id === currentListing);

  const openPanel = () => {
    Animated.timing(panelWidth, {
      toValue: 90,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(panelWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleListingChange = (newId: string) => {
    setCurrentListing(newId);
    closePanel();
  };

  // Update current listing when slug changes from URL
  useEffect(() => {
    if (slug) {
      setCurrentListing(slug as string);
    }
  }, [slug]);

  return (
    <PanelProvider openPanel={openPanel}>
      <View style={styles.container}>
        {/* Left Side Panel */}
        <Animated.View
          style={[
            styles.panel,
            {
              width: panelWidth,
            },
          ]}
        >
          <CollectionPanel
            onClose={closePanel}
            onListingSelect={handleListingChange}
            currentListing={currentListing}
          />
        </Animated.View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <BaseScreen
            collection={currentListing}
            title={listingData?.name || 'Goddess Story'}
          />
        </View>
      </View>
    </PanelProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  panel: {
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fffdfd',
  },
});
