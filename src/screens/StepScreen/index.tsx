import { FabButtons } from "@/src/components/FabButton";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { Spacer } from "@/src/components/Spacer";
import { ThemedText } from "@/src/components/ThemedText";
import { ProjectStep } from "@/src/data/types";
import { router } from "expo-router";
import { FC } from "react";

interface StepScreenProps {
  projectId: string;
  data: ProjectStep;
}

export const StepScreen: FC<StepScreenProps> = props => {
  const { data, projectId } = props;

  return (
    <ScreenContainer>
      <Spacer>
        <ThemedText>
          date: {data.occurred_at}
        </ThemedText>

        {data.description ? (
          <ThemedText>
            description: {data.description}
          </ThemedText>
        ) : null}

        <ThemedText>
          Assets: 
        </ThemedText>
      </Spacer>

      <FabButtons
        icon="plus"
        actions={[
          {
            label: 'Take a photo',
            icon: 'camera',
            onPress: () => router.navigate(`/project/${projectId}/${data.id}/assetCameraNew`),
          },
          {
            label: 'Choose in gallery',
            icon: 'image',
            onPress: () => router.navigate(`/project/${projectId}/${data.id}/assetGalleryNew`),
          },
        ]}
      />
    </ScreenContainer>
  )
}