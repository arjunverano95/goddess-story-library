import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Badge, Card, Text} from '@rneui/themed';

import {Colors} from '../../app/colors';
import {GoddessStory} from '../../models/GoddessStory';
import CardImage from './CardImage';

interface CardDetailsProps {
  data: GoddessStory;
}

const CardDetails = (props: CardDetailsProps) => {
  const {data} = props;

  if (!data) return <></>;

  return (
    <>
      <Card containerStyle={styles.cardContainer}>
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

      <CardImage data={data} />
    </>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0,
    backgroundColor: Colors.white,
  },
  cardTitleContainer: {flexDirection: 'row'},
  rarityBadge: {
    height: 22,
    minWidth: 45,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  raritytext: {fontWeight: 'bold'}, // alignSelf: 'flex-start'}
  cardTitle: {flex: 1, textAlign: 'left'},
  cardSubTitle: {fontWeight: 'normal'},
});
export default CardDetails;
