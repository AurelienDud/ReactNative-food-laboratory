import { FlatList, StyleSheet } from 'react-native';

import { CardInline } from '@/src/components/CardInline';
import { ScreenContainer } from '@/src/components/ScreenContainer';
import { ThemedText } from '@/src/components/ThemedText/index';
import { ThemedView } from '@/src/components/ThemedView';
import { useGetProjects } from '@/src/data/query';
import { router } from 'expo-router';

export const HomeScreen = () => {
  const { data } = useGetProjects();

  return (
    <ScreenContainer style={styles.viewContainer}>
      {/* Greating */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome Auré!
        </ThemedText>
      </ThemedView>

      {/* Project list */}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <CardInline 
            title={item.title}
            date={item.created_at} 
            onPress={() => router.navigate({ pathname: '/project/[projectId]', params: { projectId: item.id } })}  />
        )}
        contentContainerStyle={{ gap: 12 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
  },
  titleContainer: {
    marginBottom: 12,
  },
  
});

