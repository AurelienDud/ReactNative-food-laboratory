import { AppHeader } from "@/src/components/AppHeader";
import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import { StepNewScreen } from "@/src/screens/StepNewScreen";

export default function StepNew() {
  return (
    <SafeViewContainer>
      <AppHeader.Header 
        title="Add a step"
        shouldRemoveStatusBarSpacing
      />
      <StepNewScreen />
    </SafeViewContainer>
  )
}