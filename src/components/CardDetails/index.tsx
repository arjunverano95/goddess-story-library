import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Badge, Card, Text} from '@rneui/themed';

import {Colors, Sizes} from '../../app/constants';
import {GSLCard} from '../../models/GSLCard';
import CardImage from './CardImage';

interface CardDetailsProps {
  data: GSLCard;
}

const CardDetails = (props: CardDetailsProps) => {
  const {data} = props;

  if (!data) return <></>;

  return (
    <>
      <View style={styles.container}>
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
            <Card.Title style={styles.cardSubTitle}>
              {data.SetNumber}
            </Card.Title>
          </View>
          <Card.Divider />
          <View>
            <Text>{`Series: ${data.SeriesName}`}</Text>
            <Text>{`ID: ${data.ID}`}</Text>
            {/* <Text>{`Character Name: ${data.CharacterName}`}</Text> */}
            {/* <Text>{`Rarity: ${data.Rarity}`}</Text> */}
          </View>
        </Card>
        <View style={styles.imageContainer}>
          <CardImage data={data} />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {alignItems: 'center', paddingHorizontal: 10, flex: 1},
  cardContainer: {
    borderWidth: 0,
    backgroundColor: Colors.white,
    marginTop: 10,
    width: '100%',
    maxWidth: Sizes.sm,
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
  imageContainer: {
    width: '100%',
    maxWidth: Sizes.sm,
    flex: 1,
  },
});
export default CardDetails;
