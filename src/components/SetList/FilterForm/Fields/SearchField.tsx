import React from 'react';
import {StyleSheet} from 'react-native';

import {Icon, ListItem, Text} from '@rneui/themed';

import {Colors} from '../../../../app/colors';
import {Icons} from '../../../../app/icons';

interface SearchFieldProps {
  label: string;
  value: string;
}
export const SearchField = (props: SearchFieldProps) => {
  const {label, value} = props;
  return (
    <ListItem
      containerStyle={[styles.listItem, styles.listItemText]}
      onPress={() => {
        alert('');
      }}
    >
      <ListItem.Content>
        <Text
          style={[styles.formText, value === '' ? {} : {color: Colors.black}]}
        >
          {value === '' ? label : value}
        </Text>
      </ListItem.Content>
      <Icon name={Icons.arrow_right} />
    </ListItem>
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
  formText: {fontSize: 18, color: Colors.greyOutline},
  listItemText: {
    paddingLeft: 10,
    color: Colors.black,
  },
});
