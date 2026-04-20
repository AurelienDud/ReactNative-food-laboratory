import { FabButton } from "@/src/components/FabButton";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { Spacer } from "@/src/components/Spacer";
import { ThemedText } from "@/src/components/ThemedText/index";
import { useGetProjectSteps } from "@/src/data/query/useGetProjectSteps";
import { Project } from "@/src/data/types";
import { router } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

interface ProjectScreenProps {
  projectData: Project;
}

export const ProjectScreen: FC<ProjectScreenProps> = props => {
  const { projectData } = props;

  const { data: projectSteps } = useGetProjectSteps({ id: projectData.id });

  return (
    <ScreenContainer>
      <Spacer>
        <ThemedText>
          Description: {projectData.description}
        </ThemedText>

        <Spacer>
          <ThemedText>
            Steps: 
          </ThemedText>

          <Spacer>
            {projectSteps.map(projectStep => (
              <Pressable key={projectStep.id} onPress={() => router.navigate(`/project/${projectData.id}/${projectStep.id}`)}>
                <Spacer>
                  <ThemedText>
                    {projectStep.title}
                  </ThemedText>
                  {projectStep.description ? (
                    <ThemedText>
                      {projectStep.description}
                    </ThemedText>
                  ) : null}
                </Spacer>
              </Pressable>
            ))}
          </Spacer>
        </Spacer>
      </Spacer>
      
      <FabButton
        icon="plus"
        onPress={() => router.navigate(`/project/${projectData.id}/stepNew`)}
        label="Add a step"
      />
    </ScreenContainer>
  )
}