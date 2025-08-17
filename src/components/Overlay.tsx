import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Icon, Overlay as RNEOverlay} from '@rneui/themed';

import {Colors, Icons} from '../constants';

interface HeaderProps {
  isVisible: boolean;
  toggleOverlay: () => void;
  children: React.ReactElement | React.ReactElement[];
  showClose?: boolean;
  type?: 'fullscreen' | 'bottom-drawer';
}

const Overlay = (props: HeaderProps) => {
  const {
    children,
    isVisible,
    toggleOverlay,
    showClose,
    type = 'bottom-drawer',
  } = props;

  const overlayStyle =
    type === 'fullscreen'
      ? styles.fullscreenOverlay
      : styles.bottomDrawerOverlay;

  return (
    <RNEOverlay
      overlayStyle={overlayStyle}
      fullScreen={type === 'fullscreen'}
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
    >
      {showClose && (
        <View style={styles.overlayHeaderContainer}>
          <Button
            containerStyle={styles.closeOverlayButtonContainer}
            buttonStyle={styles.closeOverlayButton}
            type="clear"
            onPress={() => {
              toggleOverlay();
            }}
          >
            <Icon name={Icons.close} color={Colors.black} />
          </Button>
        </View>
      )}

      {children && <>{props.children}</>}
    </RNEOverlay>
  );
};

Overlay.defaultProps = {
  showClose: true,
};

const styles = StyleSheet.create({
  bottomDrawerOverlay: {
    padding: 0,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullscreenOverlay: {
    padding: 0,
    width: '100%',
    height: '100%',
  },
  overlayHeaderContainer: {
    flexDirection: 'row-reverse',
  },
  closeOverlayButtonContainer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  closeOverlayButton: {
    height: 46,
  },
});

export default Overlay;
