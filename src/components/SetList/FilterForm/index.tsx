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

interface FilterFormProps {
  onSubmit: (value: GoddessStory) => void;
}
const FilterForm = (props: FilterFormProps) => {
  const {onSubmit} = props;
  const [expanded, setExpanded] = useState('');
  const [filterData, setFilterData] = useState<GoddessStory>({
    Code: '',
    SetNumber: '',
    CardNumber: '',
    CharacterName: '',
    SeriesName: '',
    Rarity: '',
    ImageUrl: '',
  });
  const handleExpanded = (value: string) => {
    if (expanded === value) setExpanded(null);
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
          <Text h3 style={{marginLeft: 10}}>
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
            setExpanded(null);
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
            setExpanded(null);
          }}
          onChangeText={(value) => {
            updateFilterData('CharacterName', value);
          }}
          value={filterData.CharacterName}
        />
        <SearchField value={filterData.SeriesName} label={'Series'} />

        <Button
          containerStyle={styles.submitButton}
          title={'Submit'}
          onPress={() => {
            setExpanded(null);
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

  submitButton: {
    marginTop: 20,
  },
});

export default FilterForm;
