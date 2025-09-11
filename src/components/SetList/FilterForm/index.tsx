import React, {useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import {Text} from 'react-native-elements';

import {Colors} from '../../../constants';
import {GSLCard} from '../../../models/GSLCard';
import {InputField, SearchField} from './Fields';

interface FilterFormProps {
  data: GSLCard;
  formData: {setNumbers: string[]; rarities: string[]; series: string[]};
  onSubmit: (value: GSLCard) => void;
}

// Extended GSLCard interface to support arrays for multi-select fields
interface ExtendedGSLCard
  extends Omit<GSLCard, 'SetNumber' | 'Rarity' | 'SeriesName'> {
  SetNumber: string | string[];
  Rarity: string | string[];
  SeriesName: string | string[];
}

const FilterForm = (props: FilterFormProps) => {
  const {
    data,
    onSubmit,
    formData: {setNumbers, rarities, series},
  } = props;
  const [formData, setFormData] = useState<ExtendedGSLCard>({
    ...data,
    SetNumber: data.SetNumber
      ? data.SetNumber.includes('|')
        ? data.SetNumber.split('|').map((s) => s.trim())
        : data.SetNumber
      : '',
    Rarity: data.Rarity
      ? data.Rarity.includes('|')
        ? data.Rarity.split('|').map((s) => s.trim())
        : data.Rarity
      : '',
    SeriesName: data.SeriesName
      ? data.SeriesName.includes('|')
        ? data.SeriesName.split('|').map((s) => s.trim())
        : data.SeriesName
      : '',
  });

  const updateFormData = (key: keyof ExtendedGSLCard, value: string) => {
    const currentValue = formData[key];

    if (key === 'SetNumber' || key === 'Rarity' || key === 'SeriesName') {
      // Handle multi-select logic
      if (Array.isArray(currentValue)) {
        if (currentValue.includes(value)) {
          // Remove value if already selected
          setFormData({
            ...formData,
            [key]: currentValue.filter((item) => item !== value),
          });
        } else {
          // Add value if not selected
          setFormData({
            ...formData,
            [key]: [...currentValue, value],
          });
        }
      } else {
        // Convert to array if it's a string
        setFormData({
          ...formData,
          [key]: [value],
        });
      }
    } else {
      // Handle single-select logic for other fields
      if (formData[key] === value) {
        setFormData({...formData, [key]: ''});
      } else {
        setFormData({...formData, [key]: value});
      }
    }
  };

  const clearAll = (key: keyof ExtendedGSLCard) => {
    setFormData({
      ...formData,
      [key]: [],
    });
  };

  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.dragHandle} />
        <View style={styles.formHeader}>
          <MaterialIcons name="tune" size={40} color={Colors.black} />
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
              onSubmit(clearData);
            }}
          >
            <Text>{'Reset'}</Text>
          </Pressable>
        </View>

        <View style={styles.formFields}>
          <SearchField
            value={formData.SetNumber}
            label={'Set'}
            data={setNumbers}
            multiSelect={true}
            onPress={() => {}}
            onSelect={(item) => {
              updateFormData('SetNumber', item);
            }}
            onClearAll={() => {
              clearAll('SetNumber');
            }}
          />

          <InputField
            label={'Card No.'}
            onFocus={() => {}}
            onChangeText={(value) => {
              updateFormData('CardNumber', value);
            }}
            value={formData.CardNumber}
          />

          <SearchField
            value={formData.Rarity}
            label={'Rarity'}
            data={rarities}
            multiSelect={true}
            onPress={() => {}}
            onSelect={(item) => {
              updateFormData('Rarity', item);
            }}
            onClearAll={() => {
              clearAll('Rarity');
            }}
          />

          <InputField
            label={'Character'}
            onFocus={() => {}}
            onChangeText={(value) => {
              updateFormData('CharacterName', value);
            }}
            value={formData.CharacterName}
          />

          <SearchField
            value={formData.SeriesName}
            label={'Series'}
            data={series}
            multiSelect={true}
            onPress={() => {}}
            onSelect={(item) => {
              updateFormData('SeriesName', item);
            }}
            onClearAll={() => {
              clearAll('SeriesName');
            }}
          />
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              // Convert back to GSLCard format for submission
              const submitData: GSLCard = {
                ...formData,
                SetNumber: Array.isArray(formData.SetNumber)
                  ? formData.SetNumber.join('|')
                  : formData.SetNumber,
                Rarity: Array.isArray(formData.Rarity)
                  ? formData.Rarity.join('|')
                  : formData.Rarity,
                SeriesName: Array.isArray(formData.SeriesName)
                  ? formData.SeriesName.join('|')
                  : formData.SeriesName,
              };
              onSubmit(submitData);
            }}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'space-between',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.greyOutline,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  formHeader: {
    flexDirection: 'row',
    paddingBottom: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyOutline,
  },
  title: {marginLeft: 10, flex: 1},
  clear: {
    paddingTop: 12,
    paddingHorizontal: 10,
  },
  formFields: {
    flex: 1,
    paddingTop: 10,
  },

  submitContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  submitButton: {
    marginHorizontal: 0,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterForm;
