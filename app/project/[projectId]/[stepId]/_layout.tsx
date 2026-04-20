import { AppHeader } from '@/src/components/AppHeader';
import { Stack } from 'expo-router';

export default function ProjectStepItemLayout() {
  return (
    <Stack screenOptions={{ header: props => <AppHeader.HeaderAdapted config={props} />, }}>
      <Stack.Screen name="index" options={{ title: 'Step' }} />
      <Stack.Screen name="assetNew" options={{ 
        title: 'Add a asset', 
        presentation: 'formSheet', 
        sheetAllowedDetents: [0.25, 0.75], 
      }} />
      <Stack.Screen name="[assetId]" options={{ headerShown: false }} />
    </Stack>
  );
}

