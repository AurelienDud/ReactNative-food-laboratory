import { useCamera } from '@/src/features/useCamera';
import { useGallery } from '@/src/features/useGallery';
import { ImagePickerOptions } from 'expo-image-picker';
import { FC, useState } from "react";
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Portal, Snackbar } from "react-native-paper";
import { AssetsGrid } from '../AssetsGrid';
import { Spacer } from '../Spacer';
import { ThemedView } from "../ThemedView";

type TemporaryAsset = {
  uri: string;
}

const IMAGE_PICKER_OPTIONS: ImagePickerOptions = {
  mediaTypes: ['images', 'videos'],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
  allowsMultipleSelection: true,
  defaultTab: 'albums'
}

export const AssetUploader: FC = () => {
  const [selectedAssets, setSelectedAssets] = useState<TemporaryAsset[]>([]);
  const [isGrantAlertVisible, setIsGrantAlertVisible] = useState(false);

  const { handleUseGallery } = useGallery({
    options: IMAGE_PICKER_OPTIONS,
    onSelect: images => setSelectedAssets(current => ([...current, ...images])),
    onGrantError: () => setIsGrantAlertVisible(true),
  })

  const { handleUseCamera } = useCamera({
    options: IMAGE_PICKER_OPTIONS,
    onSelect: images => setSelectedAssets(current => ([...current, ...images])),
    onGrantError: () => setIsGrantAlertVisible(true),
  })

  const vh = Dimensions.get('window').height;
  const [selectedAssetId, setSelectedAssetId] = useState<string[]>([]);
  const getAssetId = (asset: TemporaryAsset): string => asset.uri;
  const handleToggleAssetSelection = (asset: TemporaryAsset) => {
    setSelectedAssetId(current => {
      const assetId = getAssetId(asset);
      if (current.includes(assetId)) {
        const copy = [...current];
        copy.splice(current.indexOf(assetId), 1);
        return copy;
      } else {
        return [...current, assetId]
      }
    })
  }
  
  const handleRemoveSelectedAssets = () => {
    setSelectedAssets(current => [...current.filter(asset => !selectedAssetId.includes(getAssetId(asset)))]);
    setSelectedAssetId([]);
  }

  return (
    <>
      <ThemedView>
        <Spacer >
          {selectedAssets.length ? (
            <AssetsGrid 
              data={selectedAssets}
              numColumns={4}
              maxHeight={vh * 0.2}
              selectedAssetId={selectedAssetId}
              getAssetId={getAssetId}
              onSelectAsset={handleToggleAssetSelection}
            />
          ) : null}

          <ThemedView style={styles.buttons}>
            {selectedAssetId.length ? (
              <Button icon='delete' mode="outlined" onPress={handleRemoveSelectedAssets} textColor='red'>
                Remove
              </Button>
            ) : (
              <>
                <Button icon='camera' mode="outlined" onPress={handleUseCamera}>
                  Camera
                </Button>
                <Button icon='file' mode="outlined" onPress={handleUseGallery}>
                  Gallery
                </Button>
              </>
            )}
          </ThemedView>
        </Spacer>
      </ThemedView>
      
      <Portal>
        <Snackbar
          visible={isGrantAlertVisible}
          onDismiss={() => setIsGrantAlertVisible(false)}
          duration={2000}
        >
          Permissions are required to access media on your device. 
        </Snackbar>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
});