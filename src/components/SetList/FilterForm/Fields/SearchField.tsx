import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MaterialIcons} from '@expo/vector-icons';
import {ListItem, SearchBar, Text} from 'react-native-elements';

import {Colors} from '../../../../constants';
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
  // const {theme} = useTheme();

  const backgroundColor = Colors.searchBg;

  // Normalize selected values to an array
  const selectedValues = useMemo<string[]>(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  // Keep selected values at the top of the list
  const formattedData = useMemo<string[]>(
    () =>
      selectedValues.length === 0
        ? data
        : [
            ...selectedValues,
            ...data.filter((item) => !selectedValues.includes(item)),
          ],
    [data, selectedValues],
  );

  // Use state (not ref) so searches re-render correctly
  const [listData, setListData] = useState<string[]>(formattedData);

  // Open/close & reset overlay state safely
  const toggleOverlay = useCallback(() => {
    setListData(formattedData);
    setSearchValue('');
    setIsOverlayVisible((v) => !v);
  }, [formattedData]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (!value?.trim()) {
        setListData(formattedData);
        return;
      }
      const lower = value.toLowerCase();
      setListData(
        data.filter((item) => String(item).toLowerCase().includes(lower)),
      );
    },
    [data, formattedData],
  );

  const renderItem = useCallback(
    ({item}: {item: string}) => {
      const checked = selectedValues.includes(item);
      return (
        <ListItem containerStyle={styles.selectListItem}>
          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={checked}
            onPress={() => {
              onSelect(item);
              if (!multiSelect) toggleOverlay();
            }}
          />
          <ListItem.Content>
            <ListItem.Subtitle>{item}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    },
    [multiSelect, onSelect, selectedValues, toggleOverlay],
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
              selectedValues.length === 0 ? undefined : {color: Colors.black},
            ]}
            numberOfLines={2}
          >
            {selectedValues.length === 0 ? label : selectedValues.join('|')}
          </Text>
        </ListItem.Content>
        <MaterialIcons name="arrow-forward" size={24} color={Colors.black} />
      </ListItem>

      <Overlay
        isVisible={isOverlayVisible}
        toggleOverlay={toggleOverlay}
        type="fullscreen"
      >
        <View style={styles.searchOverlayContainer}>
          {/* Header */}
          <View style={styles.searchHeader}>
            <Text h4 style={styles.searchTitle}>
              {label}
            </Text>

            <View style={styles.headerActions}>
              {/* Optional Clear (only shows when something is selected) */}
              {selectedValues.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    // Clear is delegated to the parent via onSelect for single values;
                    // For multi-select parents typically handle remove/toggle.
                    // Here we try to "clear all" by toggling off each selected item.
                    // Parent should support this by updating `value` accordingly.
                    selectedValues.forEach((v) => onSelect(v));
                  }}
                >
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleOverlay}
              >
                <MaterialIcons name="close" size={24} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <SearchBar
            {...({
              lightTheme: true,
              containerStyle: styles.searchBarContainer,
              inputContainerStyle: {backgroundColor},
              placeholder: label,
              onChangeText: handleSearch,
              value: searchValue,
              platform: 'default',
            } as any)}
          />

          {/* List */}
          <SafeAreaView style={styles.overlayContentContainer}>
            <FlatList
              data={listData}
              renderItem={renderItem}
              keyExtractor={(item) => String(item)}
              extraData={selectedValues}
              keyboardShouldPersistTaps="handled"
            />
          </SafeAreaView>

          {/* Multi-select footer */}
          {multiSelect && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={toggleOverlay}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  selectListItem: {
    paddingVertical: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.greyOutline,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  doneButton: {
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
