import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, {useState} from 'react';
import {Modal, Pressable, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {Sheet, Text, YStack, useTheme} from 'tamagui';

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
                style={{
                  marginTop: 5,
                  marginHorizontal: 5,
                  height: 46,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
                activeOpacity={0.8}
                onPress={handleMenuPress}
              >
                <MaterialIcons
                  name={isOpen ? 'menu-open' : 'menu'}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </Animated.View>
          ) : undefined
        }
        right={
          onFilter || onSort ? (
            <YStack style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  marginHorizontal: 5,
                  height: 46,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
                onPress={toggleMenu}
              >
                <MaterialIcons name="more-vert" size={24} color="white" />
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
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          onPress={() => setIsMenuOpen(false)}
        />
        <YStack
          style={{
            position: 'absolute',
            top: 50,
            right: 10,
            backgroundColor: (theme.cardBg?.val as any) || 'white',
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
          }}
        >
          {onFilter && formData && filter && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                minWidth: 120,
              }}
              onPress={handleOpenFilter}
            >
              <Text
                style={{color: theme.color?.val || '#43484d', fontSize: 16}}
              >
                Filter
              </Text>
            </TouchableOpacity>
          )}
          {onSort && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                minWidth: 120,
              }}
              onPress={handleSort}
            >
              <Text
                style={{color: theme.color?.val || '#43484d', fontSize: 16}}
              >
                Sort
              </Text>
            </TouchableOpacity>
          )}
        </YStack>
      </Modal>

      {/* Filter form presentation using Tamagui Sheet */}
      <Sheet
        forceRemoveScrollEnabled={isFilterFormVisible}
        modal
        open={isFilterFormVisible}
        onOpenChange={setIsFilterFormVisible}
        snapPoints={[85]}
        snapPointsMode="percent"
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="medium"
          backgroundColor="rgba(0,0,0,0.4)"
          enterStyle={{opacity: 0}}
          exitStyle={{opacity: 0}}
          opacity={0.45}
        />
        <Sheet.Handle
          backgroundColor={theme.borderColor?.val as any}
          marginBottom={5}
        />
        <Sheet.Frame
          padding={0}
          backgroundColor={theme.cardBg?.val as any}
          borderTopRightRadius={20}
          borderTopLeftRadius={20}
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
            <YStack />
          )}
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

// Removed StyleSheet in favor of inline styles

export default PanelHeader;
