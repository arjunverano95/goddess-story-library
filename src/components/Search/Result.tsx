import {useNetInfo} from '@react-native-community/netinfo';
import {Badge, Card, Text} from '@rneui/themed';
import {View, Image, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {GoddessStory} from '../../models/GoddessStory';

interface ResultProps {
  data: GoddessStory;
}

export const Result = (props: ResultProps) => {
  const {data} = props;
  const netInfo = useNetInfo();

  if (!data) return <></>;

  const CardImage = () => {
    if (data.ImageUrl)
      return (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: data.ImageUrl}} />
        </View>
      );
    else
      return (
        <>
          {netInfo.isConnected && (
            <WebView
              style={styles.imageWebview}
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
        <View style={styles.cardTitleContainer}>
          <Badge
            badgeStyle={styles.rarityBadge}
            textStyle={styles.raritytext}
            value={data.Rarity}
            status="warning"
          />
          <Card.Title
            style={styles.cardTitle}
          >{`${data.CharacterName}`}</Card.Title>
          <Card.Title style={styles.cardSubTitle}>{data.SetNumber}</Card.Title>
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

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 20,
  },
  image: {
    flex: 1,
    height: null,
    resizeMode: 'contain',
    width: null,
  },
  imageWebview: {flex: 1, margin: 20},
  cardTitleContainer: {flexDirection: 'row'},
  rarityBadge: {
    height: 25,
    width: 45,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  raritytext: {fontWeight: 'bold'}, // alignSelf: 'flex-start'}
  cardTitle: {flex: 1, textAlign: 'left'},
  cardSubTitle: {fontWeight: 'normal'},
});
