import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {BottomSheet, Button, Icon, Text} from '@rneui/themed';

import {Colors, Icons} from '../../app/constants';
import {GSLCard} from '../../models/GSLCard';
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
  const [isBSVisible, setIsBSVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsBSVisible(!isBSVisible);
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {!filter.SetNumber ? title : filter.SetNumber}
        </Text>
      </View>
      <Button
        containerStyle={styles.filterButtonContainer}
        buttonStyle={styles.headerButton}
        type="clear"
        onPress={async () => {
          setIsBSVisible(true);
        }}
      >
        <Icon name={Icons.filter} color="white" />
      </Button>
      <Button
        containerStyle={styles.sortButtonContainer}
        buttonStyle={styles.headerButton}
        type="clear"
        onPress={async () => {
          onSort(sort === 'asc' ? 'desc' : 'asc');
        }}
      >
        <Icon
          name={sort === 'asc' ? Icons.sort_asc : Icons.sort_desc}
          color="white"
        />
      </Button>
      <BottomSheet
        onBackdropPress={() => {
          toggleBottomSheet();
        }}
        isVisible={isBSVisible}
      >
        <FilterForm
          data={filter}
          formData={formData}
          onSubmit={(data) => {
            onFilter(data);
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
  filterButtonContainer: {
    marginTop: 10,
  },
  sortButtonContainer: {
    marginTop: 10,
    marginRight: 8,
  },
  headerButton: {
    height: 46,
  },
});
