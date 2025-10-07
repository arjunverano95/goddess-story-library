import React from 'react';
// Removed StyleSheet usage
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
      style={{
        marginHorizontal: 0,
        paddingVertical: 5,
        paddingHorizontal: 0,
        height: 50,
      }}
      borderBottomWidth={1}
      borderColor={theme.borderColor?.val as any}
    >
      <Input
        style={{textAlign: 'left', color: '#43484d'}}
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
// Removed StyleSheet in favor of inline styles
