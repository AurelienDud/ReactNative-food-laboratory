import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import { AssetNewScreen } from "@/src/screens/AssetNewScreen";

export default function AssetCameraNew() {
  return (
    <SafeViewContainer>
      <AssetNewScreen mode="camera" />
    </SafeViewContainer>
  )
}