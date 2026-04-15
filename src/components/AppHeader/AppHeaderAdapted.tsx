import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FC } from "react";
import { AppHeaderBase } from './AppHeaderBase';

interface AppHeaderAdaptedProps {
  config: NativeStackHeaderProps | BottomTabHeaderProps;
}

/**
 * Helper function that render a AppHeader
 * from props provided basic Expo Router components like Stack or Tabs
 */
export const AppHeaderAdapted: FC<AppHeaderAdaptedProps> = ({ config }) => {
  const { navigation, options, route} = config;

  const headerItemProps = {
    tintColor: undefined,
    canGoBack: navigation.canGoBack(),
  }
  return <AppHeaderBase 
    title={getHeaderTitle(options, route.name)}
    onGoBack={navigation.canGoBack() ? navigation.goBack : undefined}
    headerLeft={() => options.headerLeft ? options.headerLeft(headerItemProps) : undefined}
    headerRight={() => options.headerRight ? options.headerRight(headerItemProps) : undefined}
  />
}