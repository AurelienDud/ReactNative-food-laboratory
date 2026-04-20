import { AppHeader } from '@/src/components/AppHeader';
import { Stack } from 'expo-router';

export default function ProjectItemLayout() {
  return (
    <Stack screenOptions={{ header: props => <AppHeader.HeaderAdapted config={props} />, }}>
      <Stack.Screen name="index" options={{ 
        // Fallback title that will be dynamically replaced
        title: 'Project' 
      }} />
      <Stack.Screen name="stepNew" options={{ 
        headerShown: false,
        presentation: 'formSheet',
        sheetAllowedDetents: [0.8, 0.85],
        sheetInitialDetentIndex: 0,
        sheetGrabberVisible: true,
      }} />
      <Stack.Screen name="[stepId]" options={{ headerShown: false }} />
    </Stack>
  );
}