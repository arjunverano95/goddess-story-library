import {useState} from 'react';
import {Badge, Button, Card, Icon, SearchBar} from '@rneui/themed';
import {View} from 'react-native';
import goddessStoryList from '../assets/data';
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
  return (
    <>
      <View>
        <SearchBar
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
        <Card containerStyle={{}} wrapperStyle={{}}>
          <View>
            <Card.Title>{searchResult.CharacterName}</Card.Title>
            <Badge value={searchResult.Rarity} status="error" />
          </View>
          <Card.FeaturedSubtitle>
            {searchResult.SeriesName}
          </Card.FeaturedSubtitle>
          <Card.Divider />
          <View></View>
        </Card>
      )}
    </>
  );
};
export default LibraryView;
