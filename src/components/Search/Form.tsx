import {useState, useEffect} from 'react';
import {SearchBar, Button, Icon} from '@rneui/themed';
import {View} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';

import {GoddessStory} from '../../models/GoddessStory';
import Header from '../Header';

const data: GoddessStory[] = require('../../app/data.json');

interface SearchFormProps {
  onSearch: (value: GoddessStory) => void;
}

const SearchForm = (props: SearchFormProps) => {
  const [searchValue, setSearchValue] = useState('');
  const {onSearch} = props;

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value.length > 0) {
      let result = `${e.value[0]}`.replace(/ /g, '').toUpperCase();
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
      <>
        <SearchBar
          containerStyle={{
            flex: 1,
            paddingLeft: 0,
            backgroundColor: '#393e42',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          placeholder="Input set and card number"
          onChangeText={handleSearch}
          value={searchValue}
        />
        <Button
          containerStyle={{
            marginTop: 10,
            marginRight: 8,
          }}
          buttonStyle={{
            height: 46,
          }}
          type="solid"
          onPress={async () => {
            Voice.start('en-PH');
          }}
        >
          <Icon name="mic" color="white" />
        </Button>
      </>
    </Header>
  );
};
export default SearchForm;
