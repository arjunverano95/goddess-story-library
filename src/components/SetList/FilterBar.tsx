import * as Haptics from 'expo-haptics';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {Button, Icon, Text} from '@rneui/themed';

import {Colors, Icons} from '../../constants';
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
          {!filter.SetNumber ? title : filter.SetNumber}
        </Text>
      </View>
      <Animated.View style={filterAnimatedStyle}>
        <Button
          containerStyle={styles.filterButtonContainer}
          buttonStyle={styles.headerButton}
          type="clear"
          onPress={toggleFilterForm}
        >
          <Icon name={Icons.filter} color="white" />
        </Button>
      </Animated.View>
      <Animated.View style={sortAnimatedStyle}>
        <Button
          containerStyle={styles.sortButtonContainer}
          buttonStyle={styles.headerButton}
          type="clear"
          onPress={handleSort}
        >
          <Icon
            name={sort === 'asc' ? Icons.sort_asc : Icons.sort_desc}
            color="white"
            type="material-community"
          />
        </Button>
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
    marginRight: 8,
  },
  sortButtonContainer: {
    marginTop: 10,
    marginRight: 8,
  },
  headerButton: {
    height: 46,
  },
});
