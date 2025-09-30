import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, {useMemo, useRef, useState} from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {MaterialIcons} from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Colors} from '../constants';
import {usePanel} from '../contexts/PanelContext';
import {GSLCard} from '../models/GSLCard';
import Overlay from './Overlay';
import FilterForm from './screens/cards/FilterForm';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  // Optional filter/sort controls
  filter?: GSLCard;
  formData?: {setNumbers: string[]; rarities: string[]; series: string[]};
  sort?: 'asc' | 'desc';
  onFilter?: (value: GSLCard) => void;
  onSort?: (value: 'asc' | 'desc') => void;
}

const PanelHeader = (props: HeaderProps) => {
  const {
    children,
    showBackButton,
    title,
    filter,
    formData,
    sort,
    onFilter,
    onSort,
  } = props;
  const navigation = useNavigation();
  const {togglePanel, isOpen} = usePanel();

  const menuScale = useSharedValue(1);
  const backScale = useSharedValue(1);

  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: menuScale.value}],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: backScale.value}],
    };
  });

  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Filter form state
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleOpenFilter = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsMenuOpen(false);
    setIsFilterFormVisible(true);
  };

  const handleSort = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsMenuOpen(false);
    if (onSort && sort) {
      onSort(sort === 'asc' ? 'desc' : 'asc');
    }
  };

  const handleMenuPress = () => {
    menuScale.value = withSpring(0.9, {damping: 15, stiffness: 300});
    setTimeout(() => {
      menuScale.value = withSpring(1, {damping: 15, stiffness: 300});
    }, 100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    togglePanel();
  };

  const handleBackPress = async () => {
    backScale.value = withSpring(0.9, {damping: 15, stiffness: 300});
    setTimeout(() => {
      backScale.value = withSpring(1, {damping: 15, stiffness: 300});
    }, 100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.headerContainer,
        showBackButton ? {backgroundColor: Colors.background} : {},
      ]}
    >
      <View style={styles.headerContent}>
        {showBackButton ? (
          <Animated.View style={backAnimatedStyle}>
            <TouchableOpacity
              style={styles.toggleDrawerContainer}
              onPress={handleBackPress}
            >
              <MaterialIcons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View style={menuAnimatedStyle}>
            <TouchableOpacity
              style={styles.toggleDrawerContainer}
              onPress={handleMenuPress}
            >
              <MaterialIcons
                name={isOpen ? 'menu-open' : 'menu'}
                size={24}
                color={Colors.black}
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        {title ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : null}

        {children ? (
          <View style={styles.headerContentContainer}>{children}</View>
        ) : null}

        {/* Rightmost menu button */}
        {(onFilter || onSort) && (
          <View style={styles.menuButtonWrapper}>
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
              <MaterialIcons name="more-vert" size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Dropdown menu */}
      <Modal
        visible={isMenuOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <Pressable
          style={styles.menuBackdrop}
          onPress={() => setIsMenuOpen(false)}
        />
        <View style={styles.dropdownContainer}>
          {onFilter && formData && filter && (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleOpenFilter}
            >
              <Text style={styles.dropdownItemText}>Filter</Text>
            </TouchableOpacity>
          )}
          {onSort && (
            <TouchableOpacity style={styles.dropdownItem} onPress={handleSort}>
              <Text style={styles.dropdownItemText}>Sort</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {/* Filter form presentation */}
      {Platform.OS === 'web' ? (
        <Overlay
          isVisible={isFilterFormVisible}
          toggleOverlay={() => setIsFilterFormVisible(false)}
          type="bottom-drawer"
        >
          {filter && formData && onFilter ? (
            <FilterForm
              data={filter}
              formData={formData}
              onSubmit={(value) => {
                onFilter(value);
                setIsFilterFormVisible(false);
              }}
            />
          ) : (
            <View />
          )}
        </Overlay>
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          index={isFilterFormVisible ? 0 : -1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onChange={(index) => {
            if (index === -1 && isFilterFormVisible) {
              setIsFilterFormVisible(false);
            }
          }}
          backdropComponent={(backdropProps) => (
            <BottomSheetBackdrop
              {...backdropProps}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
        >
          <BottomSheetView>
            {filter && formData && onFilter ? (
              <FilterForm
                data={filter}
                formData={formData}
                onSubmit={(value) => {
                  onFilter(value);
                  setIsFilterFormVisible(false);
                }}
              />
            ) : (
              <View />
            )}
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
  },
  menuButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    marginTop: 5,
    marginHorizontal: 5,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 120,
  },
  dropdownItemText: {
    color: Colors.black,
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.black,
  },
  toggleDrawerContainer: {
    marginTop: 5,
    marginHorizontal: 5,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerContentContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
  },
});

export default PanelHeader;
