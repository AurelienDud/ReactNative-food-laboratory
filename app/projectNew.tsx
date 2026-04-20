import { AppHeader } from "@/src/components/AppHeader";
import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import { ProjectNewScreen } from "@/src/screens/ProjectNewScreen";

export default function ProjectNewRoute() {
  return (
    <SafeViewContainer>
      <AppHeader.Header 
        title="Add a project"
        shouldRemoveStatusBarSpacing
      />
      <ProjectNewScreen />
    </SafeViewContainer>
  )
}