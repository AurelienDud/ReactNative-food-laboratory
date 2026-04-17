import { ScreenContainer } from "@/src/components/ScreenContainer";
import { ThemedText } from "@/src/components/ThemedText/index";
import { ThemedView } from "@/src/components/ThemedView";
import { useGetProjectSteps } from "@/src/data/query/useGetProjectSteps";
import { Project } from "@/src/data/types";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface ProjectDetailsScreenProps {
  projectData: Project;
}

export const ProjectDetailsScreen: FC<ProjectDetailsScreenProps> = props => {
  const { projectData } = props;

  const { data: projectSteps } = useGetProjectSteps({ id: projectData.id });

  return (
    <ScreenContainer>
      <ThemedText>
        {projectData.title}
      </ThemedText>
      <ThemedText>
        {projectData.description}
      </ThemedText>
      <ThemedView>
        {projectSteps.map(projectStep => (
          <ThemedView key={projectStep.id}>
            <ThemedText>
              {projectStep.title}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.navigate(`/project/${projectData.id}/step`)}
        label="Add a step"
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})