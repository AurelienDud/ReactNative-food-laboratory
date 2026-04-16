import { FlatList, StyleSheet } from 'react-native';

import Card from '@/src/components/Card';
import { ScreenContainer } from '@/src/components/ScreenContainer';
import { ThemedText } from '@/src/components/ThemedText/index';
import { ThemedView } from '@/src/components/ThemedView';
import { useGetProjects } from '@/src/data/query';

export const HomeScreen = () => {
  const { data } = useGetProjects();

  return (
    <ScreenContainer style={styles.viewContainer}>
      {/* Greating */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Auré!</ThemedText>
      </ThemedView>
      
      {/* Project list */}
      <ThemedView>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Card title={item.title} url={{ pathname: '/project/[id]', params: { id: item.id } }}  />
          )}
          contentContainerStyle={{ gap: 12 }}
        />
      </ThemedView>
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