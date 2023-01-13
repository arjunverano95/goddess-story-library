import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {BottomSheet, Button, Icon, Text} from '@rneui/themed';

import {Colors} from '../../app/colors';
import {Icons} from '../../app/icons';
import {GoddessStory} from '../../models/GoddessStory';
import FilterForm from './FilterForm';

interface FilterBarProps {
  onSearch: (value: GoddessStory) => void;
}

export const FilterBar = (props: FilterBarProps) => {
  const {onSearch} = props;
  const [isBSVisible, setIsBSVisible] = useState(false);
  const [filterData, setFilterData] = useState<GoddessStory>({
    Code: '',
    SetNumber: '',
    CardNumber: '',
    CharacterName: '',
    SeriesName: '',
    Rarity: '',
    ImageUrl: '',
  });

  const toggleBottomSheet = () => {
    setIsBSVisible(!isBSVisible);
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {filterData.SetNumber === '' ? 'Goddess Story' : filterData.SetNumber}
        </Text>
      </View>
      <Button
        containerStyle={styles.filterContainer}
        buttonStyle={styles.filterButton}
        type="clear"
        onPress={async () => {
          setIsBSVisible(true);
        }}
      >
        <Icon name={Icons.filter} color="white" />
      </Button>
      <BottomSheet
        onBackdropPress={() => {
          toggleBottomSheet();
        }}
        isVisible={isBSVisible}
      >
        <FilterForm
          data={filterData}
          onSubmit={(data) => {
            onSearch(data);
            setFilterData(data);
            toggleBottomSheet();
          }}
        />
      </BottomSheet>
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
  filterContainer: {
    marginTop: 10,
    marginRight: 8,
  },
  filterButton: {
    height: 46,
  },
});
