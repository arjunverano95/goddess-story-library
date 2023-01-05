import {useState} from 'react';
import {Badge, Card, Text, SearchBar} from '@rneui/themed';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import goddessStoryList from '../app/data';
import {GoddessStory} from '../models/GoddessStory';

const LibraryView = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<GoddessStory>(undefined);
  const handleSearch = (value) => {
    const card = goddessStoryList.find(
      (item) => item.Code.toLowerCase().trim() === value.toLowerCase().trim(),
    );
    setSearchValue(value);
    setSearchResult(card);
  };
  const getRarityColor = (value) => {
    switch (value) {
      case 'R':
        return 'error';
      case 'SR':
        return 'warning';
      case 'SSR':
        return 'primary';
      default:
        return 'success';
    }
  };
  return (
    <>
      <View style={{paddingTop: 50, backgroundColor: '#393e42'}}>
        <SearchBar
          containerStyle={{
            backgroundColor: '#393e42',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          placeholder="Input set and card number"
          onChangeText={handleSearch}
          value={searchValue}
        />
        {/* <Button type="solid">
          Icon
          <Icon name="home" color="white" />
        </Button> */}
      </View>

      {searchResult && (
        <>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Badge
                badgeStyle={{
                  height: 25,
                  width: 45,
                  paddingHorizontal: 5,
                  marginRight: 5,
                }}
                textStyle={{alignSelf: 'flex-start'}}
                value={searchResult.Rarity}
                status={getRarityColor(searchResult.Rarity)}
              />
              <Card.Title>{`${searchResult.CharacterName}`}</Card.Title>
            </View>
            <Card.Divider />
            <View>
              <Text>{`Series: ${searchResult.SeriesName}`}</Text>
              <Text>{`ID: ${searchResult.SetNumber}-${searchResult.CardNumber}`}</Text>
              {/* <Text>{`Character Name: ${searchResult.CharacterName}`}</Text> */}
              {/* <Text>{`Rarity: ${searchResult.Rarity}`}</Text> */}
            </View>
          </Card>
          <WebView
            style={{flex: 1, marginVertical: 20}}
            source={{
              uri: `http://images.google.com/images?q=${searchResult.SeriesName} ${searchResult.CharacterName}`,
            }}
          />
        </>
      )}
    </>
  );
};
export default LibraryView;
