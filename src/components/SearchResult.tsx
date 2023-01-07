import {useNetInfo} from '@react-native-community/netinfo';
import {Badge, Card, Text} from '@rneui/themed';
import {useEffect} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {GoddessStory} from '../models/GoddessStory';

interface SearchProps {
  data: GoddessStory;
}

const SearchResult = (props: SearchProps) => {
  const {data} = props;
  const netInfo = useNetInfo();

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

  if (!data) return <></>;

  return (
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
            value={data.Rarity}
            status={getRarityColor(data.Rarity)}
          />
          <Card.Title>{`${data.CharacterName}`}</Card.Title>
        </View>
        <Card.Divider />
        <View>
          <Text>{`Series: ${data.SeriesName}`}</Text>
          <Text>{`ID: ${data.SetNumber}-${data.CardNumber}`}</Text>
          {/* <Text>{`Character Name: ${data.CharacterName}`}</Text> */}
          {/* <Text>{`Rarity: ${data.Rarity}`}</Text> */}
        </View>
      </Card>
      {netInfo.isConnected && (
        <WebView
          style={{flex: 1, marginVertical: 20}}
          source={{
            uri: `http://images.google.com/images?q=${data.SeriesName} ${data.CharacterName}`,
          }}
        />
      )}
    </>
  );
};
export default SearchResult;
