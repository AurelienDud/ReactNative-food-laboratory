
import type { IconProps } from '@expo/vector-icons/build/createIconSet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@src/theme/useThemeColor';
import { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type ThemedIconProps = IconProps<IconName> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({ style, lightColor, darkColor, ...otherProps }: ThemedIconProps) {
  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return <Ionicons style={[{ color: iconColor }, style]} {...otherProps}  />;
}
