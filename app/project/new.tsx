import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import { ProjectNewScreen } from "@/src/screens/ProjectNewScreen";

export default function ProjectNewRoute() {
  return (
    <SafeViewContainer>
      <ProjectNewScreen />
    </SafeViewContainer>
  )
}