import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {useTheme} from 'tamagui';

type IconName =
  | 'home'
  | 'compass'
  | 'books'
  | 'bell'
  | 'person'
  | 'heart'
  | 'grid';

export function Icon({
  name,
  size,
  color,
  focused,
}: {
  name: IconName;
  size: number;
  color?: string;
  focused?: boolean;
}) {
  const theme = useTheme();
  const map: Record<IconName, keyof typeof Ionicons.glyphMap> = {
    home: focused ? 'home' : 'home-outline',
    compass: focused ? 'compass' : 'compass-outline',
    books: focused ? 'book' : 'book-outline',
    bell: focused ? 'notifications' : 'notifications-outline',
    person: focused ? 'person' : 'person-outline',
    heart: focused ? 'heart' : 'heart-outline',
    grid: focused ? 'grid' : 'grid-outline',
  };

  const finalColor = color ?? theme.color?.val ?? '#000';
  return <Ionicons name={map[name]} size={size} color={finalColor} />;
}
