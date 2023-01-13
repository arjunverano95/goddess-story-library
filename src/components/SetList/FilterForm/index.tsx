import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Icon, Text} from '@rneui/themed';

import {Colors} from '../../../app/colors';
import {Icons} from '../../../app/icons';
import {GoddessStory} from '../../../models/GoddessStory';
import {InputField, SearchField, SelectField} from './Fields';

const data: GoddessStory[] = require('../../../app/data.json');
const setNumberList = [...new Set(data.map((item) => item.SetNumber))];
const rarityList = [...new Set(data.map((item) => item.Rarity))];
const seriesList = [...new Set(data.map((item) => item.SeriesName))].sort();

interface FilterFormProps {
  data: GoddessStory;
  onSubmit: (value: GoddessStory) => void;
}
const FilterForm = (props: FilterFormProps) => {
  const {data, onSubmit} = props;
  const [expanded, setExpanded] = useState('');
  const [filterData, setFilterData] = useState<GoddessStory>(data);
  const handleExpanded = (value?: string) => {
    if (!value || expanded === value) setExpanded(null);
    else setExpanded(value);
  };
  const updateFilterData = (key: string, value: string) => {
    if (filterData[key] === value)
      setFilterData({...filterData, ...{[key]: ''}});
    else setFilterData({...filterData, ...{[key]: value}});
  };
  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Icon name={Icons.filter} size={45} />
          <Text h3 style={styles.title}>
            {'Filter'}
          </Text>
        </View>
        <SelectField
          label={'Set'}
          value={filterData.SetNumber}
          data={setNumberList}
          isExpanded={expanded === 'SetNumber'}
          onPress={() => {
            handleExpanded('SetNumber');
          }}
          onSelect={(item) => {
            updateFilterData('SetNumber', item);
            handleExpanded('SetNumber');
          }}
        />
        <InputField
          label={'Card No.'}
          onFocus={() => {
            handleExpanded();
          }}
          onChangeText={(value) => {
            updateFilterData('CardNumber', value);
          }}
          value={filterData.CardNumber}
        />

        <SelectField
          label={'Rarity'}
          value={filterData.Rarity}
          data={rarityList}
          isExpanded={expanded === 'Rarity'}
          onPress={() => {
            handleExpanded('Rarity');
          }}
          onSelect={(item) => {
            updateFilterData('Rarity', item);
            handleExpanded('Rarity');
          }}
        />
        <InputField
          label={'Character'}
          onFocus={() => {
            handleExpanded();
          }}
          onChangeText={(value) => {
            updateFilterData('CharacterName', value);
          }}
          value={filterData.CharacterName}
        />
        <SearchField
          value={filterData.SeriesName}
          label={'Series'}
          data={seriesList}
          onPress={() => {
            handleExpanded();
          }}
          onSelect={(item) => {
            updateFilterData('SeriesName', item);
          }}
        />

        <Button
          containerStyle={styles.submitButton}
          title={'Submit'}
          onPress={() => {
            handleExpanded();
            onSubmit(filterData);
          }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  formHeader: {flexDirection: 'row', paddingVertical: 25},
  title: {marginLeft: 10},
  submitButton: {
    marginTop: 20,
  },
});

export default FilterForm;
