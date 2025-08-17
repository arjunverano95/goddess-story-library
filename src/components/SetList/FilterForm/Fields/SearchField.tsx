import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button, Icon, ListItem, SearchBar, Text, useTheme} from '@rneui/themed';
import {FlashList} from '@shopify/flash-list';

import {Colors, Icons} from '../../../../constants';
import Overlay from '../../../Overlay';

interface SearchFieldProps {
  label: string;
  value: string | string[];
  data: string[];
  onPress: () => void;
  onSelect: (item: string) => void;
  multiSelect?: boolean;
}

export const SearchField = (props: SearchFieldProps) => {
  const {label, value, data, onPress, onSelect, multiSelect = false} = props;
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const {theme} = useTheme();
  const backgroundColor = theme?.colors?.grey5 || Colors.greyOutline;

  // Handle both single and multi-select values
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const formattedData =
    selectedValues.length === 0
      ? data
      : [
          ...selectedValues,
          ...data.filter((item) => !selectedValues.includes(item)),
        ];
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
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={selectedValues.includes(item)}
            onPress={() => {
              onSelect(item);
              if (!multiSelect) {
                toggleOverlay();
              }
            }}
          />
          <ListItem.Content>
            <ListItem.Subtitle>{item}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    },
    [onSelect, selectedValues, multiSelect, toggleOverlay],
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
          <Text
            style={[
              styles.formText,
              selectedValues.length === 0 ? {} : {color: Colors.black},
            ]}
          >
            {selectedValues.length === 0 ? label : selectedValues.join(', ')}
          </Text>
        </ListItem.Content>
        <Icon name={Icons.arrow_right} />
      </ListItem>
      <Overlay
        isVisible={isOverlayVisible}
        toggleOverlay={toggleOverlay}
        type="fullscreen"
      >
        <View style={styles.searchOverlayContainer}>
          <View style={styles.searchHeader}>
            <Text h4 style={styles.searchTitle}>
              {label}
            </Text>
            <Button
              type="clear"
              onPress={toggleOverlay}
              icon={<Icon name={Icons.close} size={24} color={Colors.black} />}
            />
          </View>
          <SearchBar
            lightTheme={true}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={{backgroundColor}}
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
              extraData={selectedValues}
            />
          </SafeAreaView>
        </View>
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
  searchOverlayContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyOutline,
  },
  searchTitle: {
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
