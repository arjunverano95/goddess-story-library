import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {Button, Icon, Text} from '@rneui/themed';

import {Colors, Icons} from '../../../app/constants';
import {GSLCard} from '../../../models/GSLCard';
import {InputField, SearchField, SelectField} from './Fields';

interface FilterFormProps {
  data: GSLCard;
  formData: {setNumbers: string[]; rarities: string[]; series: string[]};
  onSubmit: (value: GSLCard) => void;
}
const FilterForm = (props: FilterFormProps) => {
  const {
    data,
    onSubmit,
    formData: {setNumbers, rarities, series},
  } = props;
  const [expanded, setExpanded] = useState('');
  const [formData, setFormData] = useState<GSLCard>({...data});

  const handleExpanded = (value?: string) => {
    if (!value || expanded === value) setExpanded(null);
    else setExpanded(value);
  };
  const updateFormData = (key: string, value: string) => {
    if (formData[key] === value) setFormData({...formData, ...{[key]: ''}});
    else setFormData({...formData, ...{[key]: value}});
  };
  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Icon name={Icons.filter} size={45} />
          <Text h3 style={styles.title}>
            {'Filter'}
          </Text>
          <Pressable
            style={styles.clear}
            onPress={() => {
              const clearData: GSLCard = {
                ID: '',
                Code: '',
                SetNumber: '',
                CardNumber: '',
                CharacterName: '',
                SeriesName: '',
                Rarity: '',
                ImageUrl: '',
                HasImage: '',
              };
              setFormData(clearData);
              handleExpanded();
              onSubmit(clearData);
            }}
          >
            <Text>{'Reset'}</Text>
          </Pressable>
        </View>
        <SelectField
          label={'Set'}
          value={formData.SetNumber}
          data={setNumbers}
          isExpanded={expanded === 'SetNumber'}
          onPress={() => {
            handleExpanded('SetNumber');
          }}
          onSelect={(item) => {
            updateFormData('SetNumber', item);
            handleExpanded('SetNumber');
          }}
        />
        <InputField
          label={'Card No.'}
          onFocus={() => {
            handleExpanded();
          }}
          onChangeText={(value) => {
            updateFormData('CardNumber', value);
          }}
          value={formData.CardNumber}
        />

        <SelectField
          label={'Rarity'}
          value={formData.Rarity}
          data={rarities}
          isExpanded={expanded === 'Rarity'}
          onPress={() => {
            handleExpanded('Rarity');
          }}
          onSelect={(item) => {
            updateFormData('Rarity', item);
            handleExpanded('Rarity');
          }}
        />
        <InputField
          label={'Character'}
          onFocus={() => {
            handleExpanded();
          }}
          onChangeText={(value) => {
            updateFormData('CharacterName', value);
          }}
          value={formData.CharacterName}
        />
        <SearchField
          value={formData.SeriesName}
          label={'Series'}
          data={series}
          onPress={() => {
            handleExpanded();
          }}
          onSelect={(item) => {
            updateFormData('SeriesName', item);
          }}
        />

        <Button
          containerStyle={styles.submitButton}
          title={'Submit'}
          onPress={() => {
            handleExpanded();
            onSubmit(formData);
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
  title: {marginLeft: 10, flex: 1},
  clear: {
    paddingTop: 12,
    paddingHorizontal: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default FilterForm;
