import {Ionicons} from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Sizes} from '../constants';

interface WebFooterProps {
  downloadUrl?: string;
  downloadText?: string;
  footerText?: string;
}

const WebFooter: React.FC<WebFooterProps> = ({
  downloadUrl = 'https://drive.google.com/file/d/1jSvF128oKd4pizkIhjIpiZFEoBw7kRCB/view?usp=share_link',
  downloadText = 'Download (APK)',
  footerText = 'For best experience, download the app',
}) => {
  const [hideFooter, setHideFooter] = useState(false);
  const [isWeb, setIsWeb] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check if we're on web
    setIsWeb(Platform.OS === 'web');

    // Get initial window width
    if (Platform.OS === 'web') {
      setWindowWidth(window.innerWidth);

      // Check localStorage for saved state
      const savedState = localStorage.getItem('defaultFooterState');
      if (savedState === 'hidden') {
        setHideFooter(true);
      }

      // Add resize listener
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Don't render on mobile or small screens
  if (!isWeb || windowWidth <= Sizes.sm || hideFooter) {
    return null;
  }

  const handleHideFooter = () => {
    localStorage.setItem('defaultFooterState', 'hidden');
    setHideFooter(true);
  };

  const handleDownload = () => {
    if (Platform.OS === 'web') {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.closeButton} onPress={handleHideFooter}>
        <Ionicons name="close" size={20} color={Colors.white} />
      </TouchableOpacity>

      <Text style={styles.footerText}>{footerText}</Text>

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Ionicons
          name="cloud-download"
          size={20}
          color={Colors.white}
          style={styles.buttonIcon}
        />
        <Text style={styles.downloadButtonText}>{downloadText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: Colors.black,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 16,
    padding: 8,
  },
  footerText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 160,
    justifyContent: 'center',
  },
  downloadButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default WebFooter;
