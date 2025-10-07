import React, {useRef} from 'react';
// Removed StyleSheet usage
import {WebView} from 'react-native-webview';
import {YStack} from 'tamagui';
import {GSLCard} from '../../../models/GSLCard';

interface MobileWebViewProps {
  data: GSLCard;
}

const MobileWebView: React.FC<MobileWebViewProps> = ({data}) => {
  const webViewRef = useRef<WebView>(null);

  // Google Custom Search HTML content for images
  const googleSearchHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .search-container {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
          }
          .search-title {
            color: #333;
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 600;
          }
          .search-subtitle {
            color: #333;
            margin-bottom: 20px;
            font-size: 14px;
            opacity: 0.7;
          }
          .search-button {
            background-color: #007AFF;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
          }
          .gcse-searchresults-only {
            min-height: 400px;
          }
          .gsc-control-cse {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        </style>
        <script async src="https://cse.google.com/cse.js?cx=64bb5bd8971ac4f24"></script>
      </head>
      <body>
        <div class="search-container">
          <div class="search-title">No image available for: ${data.SeriesName} ${data.CharacterName}</div>
          <div class="search-subtitle">Try searching online for this character</div>
          <a href="https://www.google.com/search?q=${encodeURIComponent(`${data.SeriesName} ${data.CharacterName}`)}&tbm=isch" target="_blank" class="search-button">Search Images on Google</a>
        </div>
        <div class="gcse-searchresults-only"></div>
        <script>
          // Set the search query for images
          window.__gcse = {
            parsetags: 'explicit',
            callback: function() {
              var element = google.search.cse.element.getElement('searchresults-only0');
              if (element) {
                element.execute('${data.SeriesName} ${data.CharacterName}');
              }
            }
          };
        </script>
      </body>
    </html>
  `;

  return (
    <YStack
      flex={1}
      margin={15}
      backgroundColor="$cardBg"
      borderRadius={8}
      overflow="hidden"
    >
      <WebView
        ref={webViewRef}
        source={{html: googleSearchHTML}}
        style={{flex: 1, backgroundColor: 'transparent'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onMessage={(event: any) => {
          // Handle any messages from WebView if needed
          console.log('WebView message:', event.nativeEvent.data);
        }}
      />
    </YStack>
  );
};

// Removed StyleSheet in favor of inline styles

export default MobileWebView;
