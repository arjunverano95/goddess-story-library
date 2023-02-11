import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

import {Button, Icon, Text} from '@rneui/themed';

import {Colors, Icons} from '../app/constants';
import {isMobileWebBrowser} from '../app/utils/isMobileWebBrowser';

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}
const Wrapper = ({children}: WrapperProps) => {
  const {width} = useWindowDimensions();

  if (isMobileWebBrowser() || width <= 576) {
    return <>{children}</>;
  }
  // if (isMobileWebBrowser()) return children;

  return (
    <>
      {children}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {'For best experience, download the app'}
        </Text>
        <Button
          containerStyle={styles.submitButton}
          onPress={() => {
            window.open(
              'https://drive.google.com/file/d/1jSvF128oKd4pizkIhjIpiZFEoBw7kRCB/view?usp=share_link',
              '_blank',
            );
          }}
        >
          <Icon style={styles.buttonIcon} name={Icons.download} color="white" />
          Download (APK)
        </Button>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  footer: {
    // position: 'fixed',
    // bottom: 0,
    width: '100%',
    backgroundColor: Colors.black,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '1rem',
  },
  footerText: {
    color: Colors.white,
  },
  submitButton: {
    marginTop: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
});
export default Wrapper;
