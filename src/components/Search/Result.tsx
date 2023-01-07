import {useNetInfo} from '@react-native-community/netinfo';
import {Badge, Card, Text} from '@rneui/themed';
import {View, Image} from 'react-native';
import WebView from 'react-native-webview';
import cardImages from '../../app/cardImages';
import {GoddessStory} from '../../models/GoddessStory';

interface SearchResultProps {
  data: GoddessStory;
}

const SearchResult = (props: SearchResultProps) => {
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

  const CardImage = () => {
    const key = `${data.SetNumber.replace(/-/g, '')}${
      data.CardNumber
    }${data.Rarity.replace(/\//g, '')}`;
    const img = cardImages[key];
    if (img)
      return (
        <View
          style={{
            flex: 1,
            margin: 20,
            justifyContent: 'flex-start',
          }}
        >
          <Image
            style={{
              flex: 1,
              height: null,
              resizeMode: 'contain',
              width: null,
            }}
            source={img}
          />
        </View>
      );
    else
      return (
        <>
          {netInfo.isConnected && (
            <WebView
              style={{flex: 1, margin: 20}}
              source={{
                uri: `http://images.google.com/images?q=${data.SeriesName} ${data.CharacterName}`,
              }}
            />
          )}
        </>
      );
  };
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
      <CardImage />
    </>
  );
};
export default SearchResult;
