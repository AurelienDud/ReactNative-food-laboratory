import { useGetProject } from "@/src/data/query";
import { ProjectDetailsScreen } from "@/src/screens/ProjectDetailsScreen";
import StackLoader from "@src/components/StackLoader";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ProjectDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetProject({ id: parseInt(id) });

  if (isLoading || !data) {
    return <StackLoader />
  }

  return (
    <>
      <Stack.Screen options={{
        title: data?.title,
      }} />
      <ProjectDetailsScreen projectData={data} />
    </>
  )
}