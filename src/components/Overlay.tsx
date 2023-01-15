import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Icon, Overlay as RNEOverlay} from '@rneui/themed';

import {Colors} from '../app/colors';
import {Icons} from '../app/icons';

interface HeaderProps {
  isVisible: boolean;
  toggleOverlay: () => void;
  children?: JSX.Element | JSX.Element[];
}
const Overlay = (props: HeaderProps) => {
  const {children, isVisible, toggleOverlay} = props;
  return (
    <RNEOverlay
      overlayStyle={styles.overlay}
      fullScreen={true}
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
    >
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
      {children && <>{props.children}</>}
    </RNEOverlay>
  );
};

export default Overlay;
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
