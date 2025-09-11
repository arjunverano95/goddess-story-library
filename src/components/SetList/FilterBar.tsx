import * as Haptics from 'expo-haptics';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Text} from 'react-native-elements';

import {Colors} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import Overlay from '../Overlay';
import FilterForm from './FilterForm';

interface FilterBarProps {
  title: string;
  filter: GSLCard;
  formData: {setNumbers: string[]; rarities: string[]; series: string[]};
  sort: 'asc' | 'desc';
  onFilter: (value: GSLCard) => void;
  onSort: (value: 'asc' | 'desc') => void;
}

export const FilterBar = (props: FilterBarProps) => {
  const {title, filter, formData, sort, onFilter, onSort} = props;
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false);

  const filterScale = useSharedValue(1);
  const sortScale = useSharedValue(1);

  const filterAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: filterScale.value}],
    };
  });

  const sortAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: sortScale.value}],
    };
  });

  const toggleFilterForm = () => {
    filterScale.value = withSpring(0.9, {damping: 15, stiffness: 300});
    setTimeout(() => {
      filterScale.value = withSpring(1, {damping: 15, stiffness: 300});
    }, 100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFilterFormVisible(!isFilterFormVisible);
  };

  const handleSort = async () => {
    sortScale.value = withSpring(0.9, {damping: 15, stiffness: 300});
    setTimeout(() => {
      sortScale.value = withSpring(1, {damping: 15, stiffness: 300});
    }, 100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSort(sort === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {!filter.SetNumber ? title : filter.SetNumber.split('|').join(', ')}
        </Text>
      </View>
      <Animated.View style={filterAnimatedStyle}>
        <TouchableOpacity
          style={styles.filterButtonContainer}
          onPress={toggleFilterForm}
        >
          <MaterialIcons name="tune" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={sortAnimatedStyle}>
        <TouchableOpacity
          style={styles.sortButtonContainer}
          onPress={handleSort}
        >
          <MaterialCommunityIcons
            name={sort === 'asc' ? 'sort-ascending' : 'sort-descending'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>
      <Overlay
        isVisible={isFilterFormVisible}
        toggleOverlay={toggleFilterForm}
        type="bottom-drawer"
      >
        <FilterForm
          data={filter}
          formData={formData}
          onSubmit={(value) => {
            onFilter(value);
            toggleFilterForm();
          }}
        />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 19,
    color: Colors.white,
  },
  filterButtonContainer: {
    marginTop: 10,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sortButtonContainer: {
    marginTop: 10,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
