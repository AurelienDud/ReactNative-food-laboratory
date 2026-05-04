import { AppHeader } from '@/src/components/AppHeader';
import { Stack } from 'expo-router';

export default function ProjectStepItemLayout() {
  return (
    <Stack screenOptions={{ header: props => <AppHeader.HeaderAdapted config={props} />, }}>
      <Stack.Screen name="index" options={{ title: 'Step' }} />
      <Stack.Screen name="assetCameraNew" options={{ 
        headerShown: true,
        presentation: 'card', 
      }} />
      <Stack.Screen name="assetGalleryNew" options={{ 
        headerShown: true,
        presentation: 'card', 
      }} />
      <Stack.Screen name="[assetId]" options={{ headerShown: false }} />
    </Stack>
  );
}

