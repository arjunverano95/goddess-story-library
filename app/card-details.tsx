import {Header} from '@/src/components';
import {CardDetails} from '@/src/components/screens/card-details';
import {GSLCard} from '@/src/models/GSLCard';
import {useLocalSearchParams} from 'expo-router';
import React, {useMemo} from 'react';
import {YStack} from 'tamagui';

export default function CardDetailsScreen() {
  const params = useLocalSearchParams();

  const card: GSLCard = useMemo(() => {
    const get = (key: string) => {
      const value = params[key as keyof typeof params];
      if (Array.isArray(value)) return value[0] ?? '';
      return (value as string) ?? '';
    };

    return {
      ID: get('ID'),
      Code: get('Code'),
      SetNumber: get('SetNumber'),
      CardNumber: get('CardNumber'),
      CharacterName: get('CharacterName'),
      SeriesName: get('SeriesName'),
      Rarity: get('Rarity'),
      ImageUrl: get('ImageUrl'),
      HasImage: get('HasImage'),
    };
  }, [params]);
  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="Card Details" showBackButton />
      <CardDetails card={card} />
    </YStack>
  );
}
