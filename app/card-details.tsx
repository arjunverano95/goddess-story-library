import {Header} from '@/src/components';
import {CardDetails} from '@/src/components/SetList';
import {GSLCard} from '@/src/models/GSLCard';
import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

export default function CardDetailsScreen() {
  const router = useRouter();
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
    <View style={styles.container}>
      <Header title="Card Details" showBackButton />
      <CardDetails card={card} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
