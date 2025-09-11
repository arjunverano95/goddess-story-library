import {Ionicons} from '@expo/vector-icons';
import React from 'react';

type IconName = 'home' | 'compass' | 'books' | 'bell' | 'person';

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
  const map: Record<IconName, keyof typeof Ionicons.glyphMap> = {
    home: focused ? 'home' : 'home-outline',
    compass: focused ? 'compass' : 'compass-outline',
    books: focused ? 'book' : 'book-outline',
    bell: focused ? 'notifications' : 'notifications-outline',
    person: focused ? 'person' : 'person-outline',
  };

  return <Ionicons name={map[name]} size={size} color={color} />;
}
