import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {Icon, ListItem, Text} from '@rneui/themed';

import {Colors, Icons} from '../../../../constants';

interface SelectFieldProps {
  value: string;
  label: string;
  data: string[];
  isExpanded: boolean;
  onPress: () => void;
  onSelect: (item: string) => void;
}

export const SelectField = (props: SelectFieldProps) => {
  const {value, label, isExpanded, onPress} = props;

  return (
    <ListItem
      containerStyle={[styles.listItem, styles.listItemAccordion]}
      onPress={onPress}
    >
      <ListItem.Content>
        <Text style={[styles.formText, !value ? {} : {color: Colors.black}]}>
          {!value ? label : value}
        </Text>
      </ListItem.Content>
      <Icon
        name={isExpanded ? Icons.arrow_left : Icons.arrow_down}
        color={Colors.greyOutline}
      />
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
  listItemAccordion: {
    paddingLeft: 10,
    color: Colors.black,
  },
  formText: {fontSize: 18, color: Colors.greyOutline},
});
