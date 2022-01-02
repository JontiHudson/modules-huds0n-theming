import React from 'react';
import { Appearance, StyleSheet } from 'react-native';

import { useEffect, useState } from '@huds0n/utilities';

type Colors<
  lC extends Record<string, string>,
  dC extends Record<string, string>,
> = typeof lightColorScheme & typeof darkColorScheme & lC & dC;

export type Theme<
  lC extends Record<string, string>,
  dC extends Record<string, string>,
  D extends Record<string, number | string>,
  F extends Record<string, number>,
  S extends Record<string, number | string>,
> = {
  colors: Colors<lC, dC>;
  colorsDark: Colors<lC, dC>;
  colorsLight: Colors<lC, dC>;
  dimensions: typeof _dimensions & D;
  fontSizes: typeof _fontSizes & F;
  spacings: typeof _spacings & S;
};

export const lightColorScheme = {
  BACKGROUND: '#FFFFFF',
  BADGE: '#E63B2E',
  BLACK: '#000000',
  BORDER: '#262626',
  DISABLED: '#B2B2B2',
  ERROR: '#E63B2E',
  GREY: '#7D7D7D',
  KEYBOARD: '#D2D5D8',
  PRIMARY: '#2980B9',
  SECONDARY: '#B96229',
  SUCCESS: '#84c397',
  TEXT: '#262626',
  TRANSPARENT: '#FFFFFF00',
  WARN: '#EC8213',
  WHITE: '#FFFFFF',
};

export const darkColorScheme = {
  BACKGROUND: '#000000',
  ERROR: '#ffd700',
  TEXT: '#e5e5e5',
  BORDER: '#e5e5e5',
  KEYBOARD: '#2B2B2B',
  SECONDARY: '#2980B9',
  PRIMARY: '#B96229',
};

const _dimensions = {
  BUTTON_HEIGHT: 40,
  BUTTON_WIDTH: 200,
  INPUT_WIDTH: 400,
};
const _fontSizes = {
  BODY: 20,
  HEADER: 30,
  LABEL: 16,
  NOTE: 12,
  SUBHEADER: 24,
};
const _spacings = {
  HAIRLINE: StyleSheet.hairlineWidth,
  L: 20,
  M: 10,
  NONE: 0,
  S: 5,
  XL: 30,
  XS: 2,
};

export const theme = {
  colors: isDarkMode()
    ? { ...lightColorScheme, ...darkColorScheme }
    : { ...darkColorScheme, ...lightColorScheme },
  get colorsDark() {
    return { ...lightColorScheme, ...darkColorScheme };
  },
  get colorsLight() {
    return { ...darkColorScheme, ...lightColorScheme };
  },
  dimensions: _dimensions,
  fontSizes: _fontSizes,
  spacings: _spacings,
};

export function isDarkMode() {
  return Appearance.getColorScheme() === 'dark';
}

function _updateTheme() {
  isDarkMode()
    ? Object.assign(theme.colors, lightColorScheme, darkColorScheme)
    : Object.assign(theme.colors, darkColorScheme, lightColorScheme);
}

Appearance.addChangeListener(_updateTheme);

export function createTheme<
  lC extends Record<string, string>,
  dC extends Record<string, string>,
  D extends Record<string, number | string>,
  F extends Record<string, number>,
  S extends Record<string, number | string>,
>(customTheme?: {
  lightColorScheme?: lC;
  darkColorScheme?: dC;
  dimensions?: D;
  fontSizes?: F;
  spacings?: S;
}): Theme<lC, dC, D, F, S> {
  if (customTheme) {
    customTheme.lightColorScheme &&
      Object.assign(lightColorScheme, customTheme.lightColorScheme);
    customTheme.darkColorScheme &&
      Object.assign(darkColorScheme, customTheme.darkColorScheme);
    customTheme.dimensions &&
      Object.assign(theme.dimensions, customTheme.dimensions);
    customTheme.fontSizes &&
      Object.assign(theme.fontSizes, customTheme.fontSizes);
    customTheme.spacings && Object.assign(theme.spacings, customTheme.spacings);
  }

  _updateTheme();

  return theme as Theme<lC, dC, D, F, S>;
}

export function useIsDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    return isDarkMode();
  });

  useEffect(
    () => {
      const listener = () => {
        setIsDark(isDarkMode());
      };

      Appearance.addChangeListener(listener);

      return () => Appearance.removeChangeListener(listener);
    },
    [],
    { layout: 'BEFORE' },
  );

  return isDark;
}

export function ThemeWrapper(props: {
  children: (isDark: boolean) => React.ReactNode;
}): React.ReactNode {
  const isDark = useIsDarkMode();

  return props.children(isDark);
}
