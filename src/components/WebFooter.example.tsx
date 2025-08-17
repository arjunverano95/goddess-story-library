import React from 'react';
import {View} from 'react-native';
import WebFooter from './WebFooter';

// Example usage of WebFooter component
export const WebFooterExamples = () => {
  return (
    <View style={{flex: 1}}>
      {/* Default footer */}
      <WebFooter />

      {/* Custom footer with different text and download URL */}
      <WebFooter
        downloadUrl="https://example.com/my-app.apk"
        downloadText="Get the App"
        footerText="Enhance your experience with our mobile app"
      />

      {/* Another custom example */}
      <WebFooter
        downloadUrl="https://play.google.com/store/apps/details?id=com.example.app"
        downloadText="Download from Play Store"
        footerText="Get the full app experience on mobile"
      />
    </View>
  );
};

export default WebFooterExamples;
