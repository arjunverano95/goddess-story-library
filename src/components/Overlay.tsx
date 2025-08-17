import React, {useEffect} from 'react';
import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Button, Icon} from '@rneui/themed';

import {Colors, Icons} from '../constants';

interface HeaderProps {
  isVisible: boolean;
  toggleOverlay: () => void;
  children: React.ReactElement | React.ReactElement[];
  showClose?: boolean;
  type?: 'fullscreen' | 'bottom-drawer';
}

const {height: screenHeight} = Dimensions.get('window');

const Overlay = (props: HeaderProps) => {
  const {
    children,
    isVisible,
    toggleOverlay,
    showClose,
    type = 'bottom-drawer',
  } = props;

  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      translateY.value = withTiming(screenHeight, {
        duration: 250,
        easing: Easing.in(Easing.cubic),
      });
      opacity.value = withTiming(0, {
        duration: 250,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    if (type === 'bottom-drawer') {
      return {
        transform: [{translateY: translateY.value}],
        opacity: opacity.value,
      };
    }
    return {
      opacity: opacity.value,
    };
  });

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={toggleOverlay}
    >
      <View style={styles.modalOverlay}>
        {type === 'bottom-drawer' && (
          <Pressable style={styles.backdrop} onPress={toggleOverlay} />
        )}
        <Animated.View
          style={[
            type === 'bottom-drawer'
              ? styles.bottomDrawerOverlay
              : styles.fullscreenOverlay,
            animatedStyle,
          ]}
        >
          {showClose && (
            <View style={styles.overlayHeaderContainer}>
              <Button
                containerStyle={styles.closeOverlayButtonContainer}
                buttonStyle={styles.closeOverlayButton}
                type="clear"
                onPress={toggleOverlay}
              >
                <Icon name={Icons.close} color={Colors.black} />
              </Button>
            </View>
          )}

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

Overlay.defaultProps = {
  showClose: true,
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  bottomDrawerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
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
