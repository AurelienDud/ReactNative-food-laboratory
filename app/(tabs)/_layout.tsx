import { AppHeader } from '@/src/components/AppHeader';
import { HapticTab } from '@/src/components/HapticTab/index';
import { IconSymbol } from '@/src/components/IconSymbol/icon-symbol';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationRoute, ParamListBase } from '@react-navigation/native';
import { Colors } from '@src/theme/theme';
import { useColorScheme } from '@src/theme/useColorScheme';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { BottomNavigation } from 'react-native-paper';

/**
 * Extract a label text from the route config through React Native Paper BottomNavigation component
 */
function getBottomNavigationLabelText(
  route: NavigationRoute<ParamListBase, string>, 
  descriptors: BottomTabBarProps['descriptors']
): string {
  const { options } = descriptors[route.key];
  return typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title ?? route.name;
}

/**
 * Handle the tab press action through React Native Paper BottomNavigation component
 */
function handleBottomNavigationTabPress(
  route: NavigationRoute<ParamListBase, string>, 
  navigation: BottomTabBarProps['navigation'], 
  state: BottomTabBarProps['state'], 
  onPreventDefault: () => void
) {
  const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (event.defaultPrevented) {
      onPreventDefault();
    } else {
      navigation.dispatch({
        ...CommonActions.navigate(route.name, route.params),
        target: state.key,
      });
    }

}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleAddProject = () => {
    router.push('/project/new');  
  }

  return (
    <Tabs
      tabBar={({ descriptors, insets, navigation, state }) => (
        <BottomNavigation.Bar 
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => handleBottomNavigationTabPress(route, navigation, state, preventDefault)}
          renderIcon={({ route, color, focused }) => (
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24
            }) || null
          )}
          getLabelText={({ route }) => getBottomNavigationLabelText(route, descriptors)}
        />
      )}
      screenOptions={{
        header: props => <AppHeader.HeaderAdapted config={props} />,
        headerLeft: () => (
          <AppHeader.Action 
            iconName='add'
            onPress={handleAddProject}
          />
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerTitle: '',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
