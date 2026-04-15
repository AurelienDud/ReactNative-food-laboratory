import { AppHeader } from '@/src/components/AppHeader';
import { Stack } from 'expo-router';

export default function ProjectLayout() {
  return (
    <Stack screenOptions={{ header: props => <AppHeader.HeaderAdapted config={props} />, }}>
      <Stack.Screen name="new" options={{ title: 'New Project', presentation: 'formSheet' }} />
      <Stack.Screen name="[id]" options={{ title: '' }} />
    </Stack>
  );
}