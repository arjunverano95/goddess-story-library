import React from 'react';
// Removed StyleSheet usage
import {Text, XStack, YStack} from 'tamagui';

import {Sizes} from '../../../constants';
import {GSLCard} from '../../../models/GSLCard';
import CardDetailImage from './CardDetailImage';

interface CardDetailsProps {
  card: GSLCard;
}

const CardDetails = (props: CardDetailsProps) => {
  const {card} = props;

  if (!card) return null;

  return (
    <YStack
      flex={1}
      backgroundColor="$bg"
      alignItems="center"
      justifyContent="center"
    >
      <YStack
        backgroundColor="$cardBg"
        width="100%"
        maxWidth={Sizes.sm}
        padding={15}
        borderRadius={8}
      >
        <XStack flexDirection="row" alignItems="center">
          <YStack
            height={22}
            minWidth={45}
            paddingHorizontal={5}
            marginRight={5}
            alignItems="center"
            justifyContent="center"
            backgroundColor="$primary"
            borderRadius={6}
          >
            <Text fontWeight="bold" color="#fff">
              {card.Rarity}
            </Text>
          </YStack>
          <Text flex={1} textAlign="left">
            {card.CharacterName}
          </Text>
          <Text fontWeight="normal">{card.SetNumber}</Text>
        </XStack>
        <YStack
          style={{height: 1, backgroundColor: '#e0e0e0', marginVertical: 10}}
        />
        <YStack>
          <Text>{`Series: ${card.SeriesName}`}</Text>
          <Text>{`ID: ${card.ID}`}</Text>
        </YStack>
      </YStack>

      <YStack
        width="100%"
        maxWidth={Sizes.sm}
        flex={1}
        margin={15}
        backgroundColor="$cardBg"
      >
        <CardDetailImage data={card} />
      </YStack>
    </YStack>
  );
};

// Removed StyleSheet in favor of inline styles

export default CardDetails;
