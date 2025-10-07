import {createAnimations} from '@tamagui/animations-moti';
import {createTamagui} from 'tamagui';

const animations = createAnimations({
  quick: {type: 'spring', damping: 20, mass: 1.2, stiffness: 250},
  medium: {type: 'spring', damping: 14, mass: 1, stiffness: 180},
  slow: {type: 'spring', damping: 20, stiffness: 80},
});

/**
 * Brand palette (updated: deep pink primary)
 */
const palette = {
  goldMain: '#D7B23A',
  goldDeep: '#A8871F',
  greenMain: '#B6C7A7',
  greenDeep: '#8FA57F',

  // 🔴 deep pink brand
  pinkMain: '#E91E63', // primary
  pinkHover: '#F06292', // hover (lighter)
  pinkPress: '#C2185B', // press (deeper)

  pinkBg: '#F7D6D5',
  pinkAcc: '#F3AEB0',
  pinkDeep: '#D08A90',

  ink: '#2D2310',
  olive: '#8B8D79',
  paper: '#FFF9F9',
  border: '#E6E1DE',
  darkBg: '#181310',
  darkCard: '#1F1915',
  darkBorder: '#3A3028',
};

export const config = createTamagui({
  animations,

  tokens: {
    size: {xs: 4, sm: 8, md: 12, true: 12, lg: 20, xl: 32},
    space: {xs: 2, sm: 4, md: 8, true: 8, lg: 12, xl: 16},
    radius: {none: 0, sm: 3, md: 6, true: 3, lg: 10},
    color: {
      // brand (🔴 switched to deep pink)
      primary: palette.pinkMain,
      primaryHover: palette.pinkHover,
      primaryPress: palette.pinkPress,

      secondary: palette.greenMain,
      secondaryHover: '#C7D6BA',
      secondaryPress: palette.greenDeep,

      // surfaces
      background: palette.paper,
      black: palette.ink,
      white: '#FFFFFF',
      card: '#FFFFFF',
      mutedText: palette.olive,
      greyOutline: palette.border,

      // extras
      searchBg: palette.pinkBg,
      transparent: 'transparent',
    },

    zIndex: {xs: 0, sm: 10, md: 100, lg: 1000, xl: 10000},
  },

  fonts: {
    body: {
      family: 'SpaceMono',
      size: {1: 12, 2: 14, 3: 16, 4: 18, 5: 20, 6: 24},
      lineHeight: {1: 18, 2: 20, 3: 24, 4: 28, 5: 32, 6: 36},
      weight: {1: '400', 4: '400', 7: '700'},
      letterSpacing: {1: 0, 7: 0},
    },
    heading: {
      family: 'SpaceMono',
      size: {1: 14, 2: 16, 3: 20, 4: 24, 5: 28, 6: 32},
      lineHeight: {1: 20, 2: 22, 3: 26, 4: 30, 5: 34, 6: 38},
      weight: {1: '700', 4: '700', 7: '700'},
      letterSpacing: {1: 0, 7: 0},
    },
    mono: {
      family: 'SpaceMono',
      size: {1: 12, 2: 14, 3: 16, 4: 18},
      lineHeight: {1: 18, 2: 20, 3: 24, 4: 28},
      weight: {1: '400', 7: '700'},
      letterSpacing: {1: 0, 7: 0},
    },
  },

  themes: {
    // Light theme
    light: {
      bg: palette.paper,
      color: palette.ink,

      // 🔴 deep pink primary
      primary: palette.pinkMain,
      primaryHover: palette.pinkHover,
      primaryPress: palette.pinkPress,

      secondary: palette.greenMain,
      secondaryHover: '#C7D6BA',
      secondaryPress: palette.greenDeep,

      borderColor: palette.border,
      cardBg: '#FFFFFF',
      muted: palette.olive,

      subtleBg: palette.pinkBg,
    },

    // Dark theme
    dark: {
      bg: palette.darkBg,
      color: '#F6F0EB',

      // keep press a bit deeper for dark
      primary: palette.pinkHover,
      primaryHover: palette.pinkMain,
      primaryPress: palette.pinkPress,

      secondary: palette.greenDeep,
      secondaryHover: '#9BAD8E',
      secondaryPress: '#617557',

      borderColor: palette.darkBorder,
      cardBg: palette.darkCard,
      muted: '#C8C0BB',

      subtleBg: '#3A2A2D',
    },
  },

  media: {
    xs: {maxWidth: 767},
    sm: {maxWidth: 768},
    md: {maxWidth: 1024},
    lg: {maxWidth: 1200},
    xl: {maxWidth: 1400},
    gtSm: {minWidth: 769},
    gtMd: {minWidth: 1025},
    gtLg: {minWidth: 1201},
    short: {maxHeight: 820},
    hoverNone: {hover: 'none'},
    pointerCoarse: {pointer: 'coarse'},
  },

  shorthands: {
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    mx: 'marginHorizontal',
    my: 'marginVertical',
  },

  settings: {
    disableSSR: true,
    allowedStyleValues: 'somewhat-strict-web',
    defaultTheme: 'light',
  },
});

type OurConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends OurConfig {
    __typeBrand?: never;
  }
}
