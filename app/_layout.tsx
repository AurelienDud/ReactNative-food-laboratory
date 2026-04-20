import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppProvider } from '@/src/components/AppProvider';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="project/[projectId]" options={{ headerShown: false }} />
        <Stack.Screen name="projectNew" options={{ 
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.7, 0.85],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
        }} />
      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}
