import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, YStack, useTheme} from 'tamagui';

interface InputFieldProps {
  label: string;
  value: string;
  onFocus: () => void;
  onChangeText: (value: string) => void;
}

export const InputField = (props: InputFieldProps) => {
  const {label, value, onFocus, onChangeText} = props;
  const theme = useTheme();
  return (
    <YStack
      style={styles.listItem}
      borderBottomWidth={1}
      borderColor={theme.borderColor?.val as any}
    >
      <Input
        style={styles.inputField}
        placeholder={label}
        placeholderTextColor={theme.muted?.val}
        onFocus={onFocus}
        onChangeText={onChangeText}
        value={value}
        backgroundColor="transparent"
        color={theme.color?.val as any}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 0,
    paddingVertical: 5,
    paddingHorizontal: 0,
    height: 50,
  },
  inputField: {
    textAlign: 'left',
    color: '#43484d',
  },
});
