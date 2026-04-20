import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import { useGetProject } from "@/src/data/query";
import { ProjectScreen } from "@/src/screens/ProjectScreen";
import StackLoader from "@src/components/StackLoader";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ProjectRoute() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { data, isLoading } = useGetProject({ id: parseInt(projectId) });

  if (isLoading || !data) {
    return <StackLoader />
  }

  return (
    <>
      <Stack.Screen options={{
        title: data?.title,
      }} />
      <SafeViewContainer>
        <ProjectScreen projectData={data} />
      </SafeViewContainer>
    </>
  )
}