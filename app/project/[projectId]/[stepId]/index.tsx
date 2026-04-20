import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import StackLoader from "@/src/components/StackLoader";
import { useGetProjectStep } from "@/src/data/query/useGetProjectStep";
import { StepScreen } from "@/src/screens/StepScreen";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ProjectStep() {
  const { projectId, stepId } = useLocalSearchParams<{ projectId: string, stepId: string }>();
  const { data, isLoading } = useGetProjectStep({ stepId: parseInt(stepId) });

  if (!projectId || !stepId) {
    throw new Error('Wrong route');
  }

  if (isLoading || !data) {
    return <StackLoader />;
  }
  
  return (
    <>
      <Stack.Screen options={{
        title: data.title,
      }} />
      <SafeViewContainer>
        <StepScreen projectId={projectId} data={data} />
      </SafeViewContainer>
    </>
  )
}