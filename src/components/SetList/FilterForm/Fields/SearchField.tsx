import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Button,
  Icon,
  ListItem,
  Overlay,
  SearchBar,
  Text,
  useTheme,
} from '@rneui/themed';

import {Colors} from '../../../../app/colors';
import {Icons} from '../../../../app/icons';

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
  const formattedData =
    value === '' ? data : [value, ...data.filter((item) => item !== value)];
  const [listData, setListData] = useState(formattedData);

  const toggleOverlay = () => {
    setSearchValue('');
    setListData(formattedData);
    setIsOverlayVisible(!isOverlayVisible);
  };
  const handleSearch = (value: string) => {
    if (value === '') setListData(formattedData);
    else
      setListData([
        ...data.filter((item) => {
          return `${item}`.toLowerCase().includes(value.toLowerCase());
        }),
      ]);
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
          <Text
            style={[styles.formText, value === '' ? {} : {color: Colors.black}]}
          >
            {value === '' ? label : value}
          </Text>
        </ListItem.Content>
        <Icon name={Icons.arrow_right} />
      </ListItem>
      <Overlay
        overlayStyle={styles.overlay}
        fullScreen={true}
        isVisible={isOverlayVisible}
        onBackdropPress={toggleOverlay}
      >
        <View style={styles.overlayHeaderContainer}>
          <Button
            containerStyle={styles.closeOverlayButtonContainer}
            buttonStyle={styles.closeOverlayButton}
            type="clear"
            onPress={async () => {
              toggleOverlay();
            }}
          >
            <Icon name={Icons.close} color={Colors.black} />
          </Button>
        </View>
        <SearchBar
          lightTheme={true}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={{backgroundColor: theme.colors.grey5}}
          placeholder={label}
          onChangeText={handleSearch}
          value={searchValue}
        />
        <SafeAreaView style={styles.overlayContentContainer}>
          <FlatList
            data={listData}
            renderItem={renderItem}
            initialNumToRender={25}
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
  overlay: {padding: 0},
  overlayHeaderContainer: {
    flexDirection: 'row-reverse',
  },
  closeOverlayButtonContainer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  closeOverlayButton: {
    height: 46,
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
  // searchBar: {
  //   backgroundColor: theme..grey5,
  // },
});
