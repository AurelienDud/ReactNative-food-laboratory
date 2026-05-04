import { SafeViewContainer } from "@/src/components/SafeViewContainer";
import { AssetNewScreen } from "@/src/screens/AssetNewScreen";

export default function AssetGalleryNew() {
  return (
    <SafeViewContainer>
      <AssetNewScreen mode="gallery" />
    </SafeViewContainer>
  )
}