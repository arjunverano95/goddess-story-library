import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {Button, Icon, SearchBar as RNESearchBar} from '@rneui/themed';

import {Colors, Icons} from '../../app/constants';
import {useGSL} from '../../app/hooks/useGSL';
import {GoddessStory} from '../../models/GoddessStory';

interface SearchBarProps {
  onSearch: (value: GoddessStory) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const {data} = useGSL();
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
    return () => {
      Voice.removeAllListeners();
    };
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
          if (await Voice.isRecognizing()) {
            await Voice.stop();
          } else {
            handleSearch('');
            Voice.start('en-US');
          }
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
