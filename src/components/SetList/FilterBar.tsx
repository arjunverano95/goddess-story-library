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
  const [title, setTitle] = useState('Goddess Story');

  const toggleBottomSheet = () => {
    setIsBSVisible(!isBSVisible);
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
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
          onSubmit={(data) => {
            onSearch(data);
            setTitle(data.SetNumber === '' ? 'Goddess Story' : data.SetNumber);
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
  formContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  formHeader: {flexDirection: 'row', paddingVertical: 25},
  listItem: {
    marginHorizontal: 0,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: Colors.greyOutline,
    height: 50,
  },
  listItemAccordion: {
    paddingLeft: 10,
    color: Colors.black,
  },
  listItemText: {
    paddingLeft: 10,
    color: Colors.black,
  },
  selectContainer: {
    height: 200,
  },
  selectListItem: {
    paddingVertical: 5,
  },
  inputField: {
    textAlign: 'left',
    color: Colors.black,
  },
  formText: {fontSize: 18, color: Colors.greyOutline},
  submitButton: {
    marginTop: 20,
  },
});
