import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Icon, ListItem, Text} from '@rneui/themed';

import {Colors} from '../../../../app/colors';
import {Icons} from '../../../../app/icons';

interface SelectFieldProps {
  value: string;
  label: string;
  data: string[];
  isExpanded: boolean;
  onPress: () => void;
  onSelect: (item: string) => void;
}
export const SelectField = (props: SelectFieldProps) => {
  const {value, label, data, isExpanded, onPress, onSelect} = props;
  const renderItem = useCallback(
    ({item}: {item: string}) => {
      return (
        <ListItem key={item} containerStyle={styles.selectListItem}>
          <ListItem.CheckBox
            // Use ThemeProvider to change the defaults of the checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={item === value}
            onPress={() => {
              onSelect(item);
            }}
          />
          <ListItem.Content>
            <ListItem.Subtitle>{item}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    },
    [onSelect],
  );
  const SelectList = () => {
    return <>{data.map((item) => renderItem({item}))}</>;
  };
  return (
    <ListItem.Accordion
      icon={<Icon name={Icons.arrow_down} />}
      containerStyle={[styles.listItem, styles.listItemAccordion]}
      content={
        <ListItem.Content>
          <Text style={[styles.formText, !value ? {} : {color: Colors.black}]}>
            {!value ? label : value}
          </Text>
        </ListItem.Content>
      }
      isExpanded={isExpanded}
      onPress={onPress}
    >
      <View style={styles.selectContainer}>
        <ScrollView style={styles.selectList}>
          <SelectList />
        </ScrollView>
      </View>
    </ListItem.Accordion>
  );
};
const styles = StyleSheet.create({
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
  selectContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.greyOutline,
    height: 200,
  },
  selectList: {
    height: 200,
  },
  selectListItem: {
    paddingVertical: 5,
  },
  formText: {fontSize: 18, color: Colors.greyOutline},
});
