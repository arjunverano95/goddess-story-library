import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Icon, Overlay as RNEOverlay} from '@rneui/themed';

import {Colors, Icons} from '../app/constants';

interface HeaderProps {
  isVisible: boolean;
  toggleOverlay: () => void;
  children: JSX.Element | JSX.Element[];
  showClose?: boolean;
}
const Overlay = (props: HeaderProps) => {
  const {children, isVisible, toggleOverlay, showClose} = props;
  return (
    <RNEOverlay
      overlayStyle={styles.overlay}
      fullScreen={true}
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
  overlay: {padding: 0},
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
