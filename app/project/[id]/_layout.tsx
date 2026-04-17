import { AppHeader } from '@/src/components/AppHeader';
import { Stack } from 'expo-router';

export default function ProjectItemLayout() {
  return (
    <Stack screenOptions={{ header: props => <AppHeader.HeaderAdapted config={props} />, }}>
      <Stack.Screen name="index" options={{ title: 'Project' }} />
      <Stack.Screen name="step" options={{ title: 'Add a step' }} />
    </Stack>
  );
}