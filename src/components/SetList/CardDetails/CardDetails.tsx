import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Badge, Text} from 'react-native-elements';

import {Colors, Sizes} from '../../../constants';
import {GSLCard} from '../../../models/GSLCard';
import CardDetailImage from './CardDetailImage';

interface CardDetailsProps {
  card: GSLCard;
}

const CardDetails = (props: CardDetailsProps) => {
  const {card} = props;

  if (!card) return null;

  return (
    <View style={styles.container}>
      {/* Custom X Close Button */}

      {/* Card Info Section - Following Original Design */}
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Badge
            badgeStyle={styles.rarityBadge}
            textStyle={styles.rarityText}
            value={card.Rarity}
            status="warning"
          />
          <Text style={styles.cardTitle}>{card.CharacterName}</Text>
          <Text style={styles.cardSubTitle}>{card.SetNumber}</Text>
        </View>
        <View style={styles.divider} />
        <View>
          <Text>{`Series: ${card.SeriesName}`}</Text>
          <Text>{`ID: ${card.ID}`}</Text>
        </View>
      </View>

      {/* Card Image Section */}
      <View style={styles.imageContainer}>
        <CardDetailImage data={card} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 1000,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    maxWidth: Sizes.sm,
    padding: 15,
    borderRadius: 8,
  },
  cardTitleContainer: {
    flexDirection: 'row',
  },
  rarityBadge: {
    height: 22,
    minWidth: 45,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  rarityText: {
    fontWeight: 'bold',
  },
  cardTitle: {
    flex: 1,
    textAlign: 'left',
  },
  cardSubTitle: {
    fontWeight: 'normal',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  imageContainer: {
    width: '100%',
    maxWidth: Sizes.sm,
    flex: 1,
    margin: 15,
    backgroundColor: Colors.white,
  },
  closeButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardDetails;
