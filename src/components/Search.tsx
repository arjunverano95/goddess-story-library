import {useState, useEffect} from 'react';
import {SearchBar, Button, Icon} from '@rneui/themed';
import {View} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';

import {GoddessStory} from '../models/GoddessStory';
import goddessStoryList from '../app/data';

interface SearchProps {
  onSearch: (value: GoddessStory) => void;
}

const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const {onSearch} = props;

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log(e.value);
    if (e.value.length > 0) {
      let result = `${e.value[0]}`.replace(/ /g, '').toUpperCase();
      result = result.replace(/TO/g, '2');
      result = result.replace(/O/g, '0');
      handleSearch(result);
    }
  };
  const handleSearch = (value: string) => {
    const card = goddessStoryList.find(
      (item) => item.Code.toLowerCase().trim() === value.toLowerCase().trim(),
    );
    setSearchValue(value);
    onSearch(card);
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
  }, []);
  return (
    <View
      style={{
        paddingTop: 50,
        backgroundColor: '#393e42',
        flexDirection: 'row',
      }}
    >
      <SearchBar
        containerStyle={{
          flex: 1,
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
    </View>
  );
};
export default Search;
