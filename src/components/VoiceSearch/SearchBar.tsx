import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {Button, Icon, SearchBar as RNESearchBar} from '@rneui/themed';

import {Colors} from '../../app/colors';
import {Icons} from '../../app/icons';
import {GoddessStory} from '../../models/GoddessStory';

const data: GoddessStory[] = require('../../app/data.json');

interface SearchBarProps {
  onSearch: (value: GoddessStory) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const {onSearch} = props;

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value.length > 0) {
      let result = `${e.value[0]}`.replace(/ /g, '').toUpperCase();
      result = result.replace(/S&R/g, 'SR');
      result = result.replace(/FOR/g, '4');
      result = result.replace(/TO/g, '2');
      result = result.replace(/O/g, '0');
      handleSearch(result);
    }
  };
  const handleSearch = (value: string) => {
    const card = data.find(
      (item) => item.Code.toLowerCase().trim() === value.toLowerCase().trim(),
    );
    setSearchValue(value);
    onSearch(card);
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
  }, []);
  return (
    <>
      <RNESearchBar
        containerStyle={styles.searchBarContainer}
        placeholder="Input set and card number"
        onChangeText={handleSearch}
        value={searchValue}
      />
      <Button
        containerStyle={styles.voiceSearchContainer}
        buttonStyle={styles.voiceSearchButton}
        type="solid"
        onPress={async () => {
          Voice.start('en-PH');
        }}
      >
        <Icon name={Icons.record} color="white" />
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    paddingLeft: 0,
    borderBottomColor: Colors.transparent,
    borderTopColor: Colors.transparent,
  },
  voiceSearchContainer: {
    marginTop: 10,
    marginRight: 8,
  },
  voiceSearchButton: {
    height: 46,
  },
});
