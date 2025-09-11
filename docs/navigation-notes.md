# Navigation Structure Documentation

## Overview

This app uses Expo Router with a nested navigation structure that combines bottom tabs with a drawer navigation for the Home tab only.

## Route Groups

### `(tabs)` Group

- **Location**: `app/(tabs)/`
- **Purpose**: Contains the bottom tab navigation with 5 tabs
- **Layout**: `app/(tabs)/_layout.tsx` - Uses `Tabs` from expo-router
- **Tabs**:
  - `index` - Home (contains drawer navigation)
  - `explore` - Explore placeholder
  - `library` - Library placeholder
  - `notifications` - Notifications placeholder
  - `profile` - Profile placeholder

### Home Tab Drawer

- **Location**: `app/(tabs)/index/`
- **Purpose**: Contains the drawer navigation (only accessible from Home tab)
- **Layout**: `app/(tabs)/index.tsx` - Uses `Drawer` from expo-router/drawer
- **Screens**:
  - `home` - Main Goddess Story screen
  - `senpai-goddess-haven` - Senpai Goddess Haven screen

## Navigation Flow

1. **Root Layout** (`app/_layout.tsx`):
   - Provides global providers and theme
   - Contains Stack navigator with `(tabs)` group
   - Handles offline state

2. **Tab Navigation**:
   - Bottom tab bar appears on all screens
   - Home tab contains drawer navigation
   - Other tabs show placeholder screens without drawer

3. **Drawer Navigation**:
   - Only available when on Home tab
   - Contains the original app content (Goddess Story, Senpai Goddess Haven)
   - Uses custom drawer content with social links

## Key Components

### Icons

- **Location**: `src/components/icons.tsx`
- **Purpose**: Centralized icon management for tab bar
- **Usage**: `<Icon name="home" size={size} color={color} focused={focused} />`
- **Available Icons**: home, compass, books, bell, person

### Header

- **Location**: `src/components/Header.tsx`
- **Purpose**: Custom header with drawer toggle
- **Usage**: Only used within the `(home)` group screens

## Adding New Tabs

1. Add new tab screen in `app/(tabs)/`
2. Update `app/(tabs)/_layout.tsx` to include new tab
3. Add icon to `src/components/icons.tsx` if needed

## Adding New Drawer Screens

1. Add new screen in `app/(tabs)/index/`
2. Update `app/(tabs)/index.tsx` to include new drawer screen
3. Update `src/components/CustomDrawerContent.tsx` for navigation

## Important Notes

- **Drawer is only available on Home tab** - other tabs have no drawer access
- **Header behavior**: Only shows on Home tab screens, hidden on other tabs
- **Deep linking**: All existing deep links continue to work
- **Back navigation**: Properly handles back navigation without showing drawer on non-Home tabs
