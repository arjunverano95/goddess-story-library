import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Icon, ListItem, SearchBar, Text, useTheme} from '@rneui/themed';
import {FlashList} from '@shopify/flash-list';

import {Colors, Icons} from '../../../../app/constants';
import Overlay from '../../../Overlay';

interface SearchFieldProps {
  label: string;
  value: string;
  data: string[];
  onPress: () => void;
  onSelect: (item: string) => void;
}
export const SearchField = (props: SearchFieldProps) => {
  const {label, value, data, onPress, onSelect} = props;
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const {theme} = useTheme();

  const formattedData = !value
    ? data
    : [value, ...data.filter((item) => item !== value)];
  const listData = useRef(formattedData);

  const toggleOverlay = () => {
    listData.current = formattedData;
    setSearchValue('');
    setIsOverlayVisible(!isOverlayVisible);
  };
  const handleSearch = (value: string) => {
    if (!value) listData.current = formattedData;
    else
      listData.current = [
        ...data.filter((item) => {
          return `${item}`.toLowerCase().includes(value.toLowerCase());
        }),
      ];
    setSearchValue(value);
  };
  const renderItem = useCallback(
    ({item}: {item: string}) => {
      return (
        <ListItem containerStyle={styles.selectListItem}>
          <ListItem.CheckBox
            // Use ThemeProvider to change the defaults of the checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={item === value}
            onPress={() => {
              onSelect(item);
              toggleOverlay();
            }}
          />
          <ListItem.Content>
            <ListItem.Subtitle>{item}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    },
    [toggleOverlay],
  );
  return (
    <>
      <ListItem
        containerStyle={[styles.listItem, styles.listItemText]}
        onPress={() => {
          onPress();
          toggleOverlay();
        }}
      >
        <ListItem.Content>
          <Text style={[styles.formText, !value ? {} : {color: Colors.black}]}>
            {!value ? label : value}
          </Text>
        </ListItem.Content>
        <Icon name={Icons.arrow_right} />
      </ListItem>
      <Overlay isVisible={isOverlayVisible} toggleOverlay={toggleOverlay}>
        <SearchBar
          lightTheme={true}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={{backgroundColor: theme.colors.grey5}}
          placeholder={label}
          onChangeText={handleSearch}
          value={searchValue}
        />
        <SafeAreaView style={styles.overlayContentContainer}>
          <FlashList
            data={listData.current}
            renderItem={renderItem}
            estimatedItemSize={36}
            keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </Overlay>
    </>
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

  overlayContentContainer: {
    margin: 10,
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.transparent,
    borderTopColor: Colors.transparent,
  },
  searchBarInputContainer: {
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.transparent,
    borderTopColor: Colors.transparent,
  },
  selectListItem: {
    paddingVertical: 5,
  },
});
