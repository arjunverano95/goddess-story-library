import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {Text, YStack, useTheme,Sheet} from 'tamagui';

import {MaterialIcons} from '@expo/vector-icons';
import {usePanel} from '../../contexts/PanelContext';
import {GSLCard} from '../../models/GSLCard';
import FilterForm from '../screens/cards/FilterForm';
import Header from './BaseHeader';

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
  const theme = useTheme();
  const {togglePanel, isOpen} = usePanel();

  // Using haptics only; visual feedback can be handled via activeOpacity

  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Filter form state
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false);

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    togglePanel();
  };

  const handleBackPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <>
      <Header
        title={title}
        showBackButton={showBackButton}
        onBackPress={handleBackPress}
        left={
          !showBackButton ? (
            <Animated.View>
              <TouchableOpacity
                style={styles.toggleDrawerContainer}
                activeOpacity={0.8}
                onPress={handleMenuPress}
              >
                <MaterialIcons
                  name={isOpen ? 'menu-open' : 'menu'}
                  size={24}
                  color={theme.color?.val || '#43484d'}
                />
              </TouchableOpacity>
            </Animated.View>
          ) : undefined
        }
        right={
          onFilter || onSort ? (
            <YStack style={styles.menuButtonWrapper}>
              <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                <MaterialIcons
                  name="more-vert"
                  size={24}
                  color={theme.color?.val || '#43484d'}
                />
              </TouchableOpacity>
            </YStack>
          ) : undefined
        }
      >
        {children}
      </Header>

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
        <YStack
          style={[
            styles.dropdownContainer,
            {
              backgroundColor: theme.cardBg?.val || 'white',
              borderColor: '#e0e0e0',
            },
          ]}
        >
          {onFilter && formData && filter && (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleOpenFilter}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  {color: theme.color?.val || '#43484d'},
                ]}
              >
                Filter
              </Text>
            </TouchableOpacity>
          )}
          {onSort && (
            <TouchableOpacity style={styles.dropdownItem} onPress={handleSort}>
              <Text
                style={[
                  styles.dropdownItemText,
                  {color: theme.color?.val || '#43484d'},
                ]}
              >
                Sort
              </Text>
            </TouchableOpacity>
          )}
        </YStack>
      </Modal>

      {/* Filter form presentation using Tamagui Sheet */}
      <Sheet
        modal
        open={isFilterFormVisible}
        onOpenChange={setIsFilterFormVisible}
        dismissOnSnapToBottom
        snapPointsMode="fit"
      >
        <Sheet.Overlay />
        <Sheet.Frame padding={0} backgroundColor={theme.cardBg?.val as any}>
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
            <YStack />
          )}
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const styles = StyleSheet.create({
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
    color: '#43484d',
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
    color: '#43484d',
  },
  toggleDrawerContainer: {
    marginTop: 5,
    marginHorizontal: 5,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default PanelHeader;
