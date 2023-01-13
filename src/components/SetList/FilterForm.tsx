import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {Button, Icon, ListItem, Text} from '@rneui/themed';

import {Colors} from '../../app/colors';
import {Icons} from '../../app/icons';
import {GoddessStory} from '../../models/GoddessStory';

const data: GoddessStory[] = require('../../app/data.json');
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
        <ListItem.Accordion
          icon={<Icon name={Icons.arrow_down} />}
          containerStyle={[styles.listItem, styles.listItemAccordion]}
          content={
            <ListItem.Content>
              <Text
                style={[
                  styles.formText,
                  filterData.SetNumber === '' ? {} : {color: Colors.black},
                ]}
              >
                {filterData.SetNumber === '' ? 'Set' : filterData.SetNumber}
              </Text>
            </ListItem.Content>
          }
          isExpanded={expanded === 'SetNumber'}
          onPress={() => {
            handleExpanded('SetNumber');
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.greyOutline,
            }}
          >
            <View style={styles.selectContainer}>
              <FlatList
                data={setNumberList}
                renderItem={({item}) => (
                  <ListItem containerStyle={styles.selectListItem}>
                    <ListItem.CheckBox
                      // Use ThemeProvider to change the defaults of the checkbox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={item === filterData.SetNumber}
                      onPress={() => {
                        updateFilterData('SetNumber', item);
                        handleExpanded('SetNumber');
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Subtitle>{item}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </ListItem.Accordion>

        <ListItem containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Input
              style={styles.inputField}
              placeholder={'Card No.'}
              placeholderTextColor={Colors.greyOutline}
              onFocus={() => {
                setExpanded(null);
              }}
              onChangeText={(value) => {
                updateFilterData('CardNumber', value);
              }}
              value={filterData.CardNumber}
            />
          </ListItem.Content>
        </ListItem>

        <ListItem.Accordion
          icon={<Icon name={Icons.arrow_down} />}
          containerStyle={[styles.listItem, styles.listItemAccordion]}
          content={
            <ListItem.Content>
              <Text
                style={[
                  styles.formText,
                  filterData.Rarity === '' ? {} : {color: Colors.black},
                ]}
              >
                {filterData.Rarity === '' ? 'Rarity' : filterData.Rarity}
              </Text>
            </ListItem.Content>
          }
          isExpanded={expanded === 'Rarity'}
          onPress={() => {
            handleExpanded('Rarity');
          }}
        >
          <View style={styles.selectContainer}>
            <FlatList
              data={rarityList}
              renderItem={({item}) => (
                <ListItem containerStyle={styles.selectListItem}>
                  <ListItem.CheckBox
                    // Use ThemeProvider to change the defaults of the checkbox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checked={item === filterData.Rarity}
                    onPress={() => {
                      updateFilterData('Rarity', item);
                      handleExpanded('Rarity');
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Subtitle>{item}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </ListItem.Accordion>

        <ListItem containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Input
              style={styles.inputField}
              placeholder={'Character'}
              placeholderTextColor={Colors.greyOutline}
              onFocus={() => {
                setExpanded(null);
              }}
              onChangeText={(value) => {
                updateFilterData('CharacterName', value);
              }}
              value={filterData.CharacterName}
            />
          </ListItem.Content>
        </ListItem>

        <ListItem
          containerStyle={[styles.listItem, styles.listItemText]}
          onPress={() => {
            alert('');
          }}
        >
          <ListItem.Content>
            <Text
              style={[
                styles.formText,
                filterData.SeriesName === '' ? {} : {color: Colors.black},
              ]}
            >
              {filterData.SeriesName === '' ? 'Series' : filterData.SeriesName}
            </Text>
          </ListItem.Content>
          <Icon name={Icons.arrow_right} />
        </ListItem>
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

export default FilterForm;
