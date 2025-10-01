import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, YStack} from 'tamagui';
import {GSLCard} from '../../../models/GSLCard';

interface WebSearchIframeProps {
  data: GSLCard;
}

const WebSearchIframe: React.FC<WebSearchIframeProps> = ({data}) => {
  useEffect(() => {
    // Update URL with search parameters
    if (typeof window !== 'undefined') {
      window.history.pushState(
        null,
        '',
        `#gsc.tab=1&gsc.q=${encodeURIComponent(`${data.SeriesName} ${data.CharacterName}`)}`,
      );

      const script = document.createElement('script');
      document.head.append(script);
      script.src = `https://cse.google.com/cse.js?cx=64bb5bd8971ac4f24`;

      return () => {
        script.remove();
      };
    }
  }, [data.SeriesName, data.CharacterName]);

  const handleSearchClick = () => {
    const searchQuery = encodeURIComponent(
      `${data.SeriesName} ${data.CharacterName}`,
    );
    window.open(
      `https://www.google.com/search?q=${searchQuery}&tbm=isch`,
      '_blank',
    );
  };

  return (
    <YStack style={styles.container}>
      <YStack style={styles.searchContainer}>
        <Text style={styles.searchTitle}>
          No image available for: {data.SeriesName} {data.CharacterName}
        </Text>
        <Text style={styles.searchSubtitle}>
          Try searching online for this character
        </Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchClick}
        >
          <Text style={styles.searchButtonText}>Search Images on Google</Text>
        </TouchableOpacity>
      </YStack>

      {/* Google Custom Search for images */}
      <YStack style={styles.imageWebview}>
        <div className="gcse-searchresults-only"></div>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#43484d',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchSubtitle: {
    fontSize: 14,
    color: '#43484d',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  searchButton: {
    backgroundColor: '#e85d64',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  imageWebview: {
    flex: 1,
    minHeight: 400,
  },
});

export default WebSearchIframe;
