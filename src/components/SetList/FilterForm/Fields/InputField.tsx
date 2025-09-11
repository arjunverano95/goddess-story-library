import React from 'react';
import {StyleSheet} from 'react-native';

import {ListItem} from 'react-native-elements';

import {Colors} from '../../../../constants';

interface InputFieldProps {
  label: string;
  value: string;
  onFocus: () => void;
  onChangeText: (value: string) => void;
}

export const InputField = (props: InputFieldProps) => {
  const {label, value, onFocus, onChangeText} = props;
  return (
    <ListItem containerStyle={styles.listItem}>
      <ListItem.Content>
        <ListItem.Input
          style={styles.inputField}
          placeholder={label}
          placeholderTextColor={Colors.greyOutline}
          onFocus={onFocus}
          onChangeText={onChangeText}
          value={value}
        />
      </ListItem.Content>
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
  inputField: {
    textAlign: 'left',
    color: Colors.black,
  },
});
