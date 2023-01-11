import {useState, useEffect} from 'react';
import {SearchBar, Button, Icon} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';

import {GoddessStory} from '../../models/GoddessStory';
import Header from '../Header';

const data: GoddessStory[] = require('../../app/data.json');

interface FormProps {
  onSearch: (value: GoddessStory) => void;
}

export const Form = (props: FormProps) => {
  const [searchValue, setSearchValue] = useState('');
  const {onSearch} = props;

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value.length > 0) {
      let result = `${e.value[0]}`.replace(/ /g, '').toUpperCase();
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
    <Header>
      <SearchBar
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
        <Icon name="mic" color="white" />
      </Button>
    </Header>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    paddingLeft: 0,
    backgroundColor: '#393e42',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  voiceSearchContainer: {
    marginTop: 10,
    marginRight: 8,
  },
  voiceSearchButton: {
    height: 46,
  },
});
