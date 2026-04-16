import { ScreenContainer } from "@/src/components/ScreenContainer";
import { ThemedText } from "@/src/components/ThemedText/index";
import { Project } from "@src/types/project";
import { FC } from "react";

interface ProjectDetailsScreenProps {
  projectData: Project;
}

export const ProjectDetailsScreen: FC<ProjectDetailsScreenProps> = props => {
  const { projectData } = props;

  return (
    <ScreenContainer>
      <ThemedText>
        {projectData.title}
      </ThemedText>
      <ThemedText>
        {projectData.description}
      </ThemedText>
    </ScreenContainer>
  )
}