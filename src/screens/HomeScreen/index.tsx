import { FlatList, StyleSheet } from 'react-native';

import Card from '@/src/components/Card';
import { ScreenContainer } from '@/src/components/ScreenContainer';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { readProjects } from '@/src/data/db';
import { Project } from '@/src/types/project';
import { useEffect, useState } from 'react';

function useGetProjects() {
  const [data, setData] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    readProjects()
      .then(data => setData(data))
      .finally(() => setIsLoading(false));
  }, [])

  return {
    data, 
    isLoading
  }
} 

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