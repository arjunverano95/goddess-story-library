import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Badge, Card, Text, Button, Icon} from '@rneui/themed';

import {Colors, Icons, Sizes} from '../../../constants';
import {GSLCard} from '../../../models/GSLCard';
import GalleryImage from './GalleryImage';

interface CardDetailsProps {
  card: GSLCard;
  onClose: () => void;
}

const CardDetails = (props: CardDetailsProps) => {
  const {card, onClose} = props;

  if (!card) return null;

  return (
    <View style={styles.container}>
      {/* Custom X Close Button */}
      <View style={styles.closeButtonContainer}>
        <Button
          type="clear"
          onPress={onClose}
          icon={<Icon name={Icons.close} size={24} color={Colors.black} />}
          buttonStyle={styles.closeButton}
        />
      </View>

      {/* Card Info Section - Following Original Design */}
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Badge
            badgeStyle={styles.rarityBadge}
            textStyle={styles.rarityText}
            value={card.Rarity}
            status="warning"
          />
          <Card.Title style={styles.cardTitle}>{card.CharacterName}</Card.Title>
          <Card.Title style={styles.cardSubTitle}>{card.SetNumber}</Card.Title>
        </View>
        <Card.Divider />
        <View>
          <Text>{`Series: ${card.SeriesName}`}</Text>
          <Text>{`ID: ${card.ID}`}</Text>
        </View>
      </Card>

      {/* Card Image Section */}
      <View style={styles.imageContainer}>
        <GalleryImage data={card} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  closeButton: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: 40,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    borderWidth: 0,
    backgroundColor: Colors.white,
    marginTop: 10,
    width: '100%',
    maxWidth: Sizes.sm,
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
  imageContainer: {
    width: '100%',
    maxWidth: Sizes.sm,
    flex: 1,
    margin: 15,
    backgroundColor: Colors.white,
  },
});

export default CardDetails;
