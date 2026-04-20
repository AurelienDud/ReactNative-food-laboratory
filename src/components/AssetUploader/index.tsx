import { ImagePickerOptions, launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
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
}

export const AssetUploader: FC = () => {
  const [selectedAssets, setSelectedAssets] = useState<TemporaryAsset[]>([]);
  const [isGrantAlertVisible, setIsGrantAlertVisible] = useState(false);

  const handlePickDocuments = async () => {
    const permissionResult = await requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setIsGrantAlertVisible(true);
      return;
    }

    let result = await launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);

    if (!result.canceled) {
      const uris = result.assets.map(({ uri }) => ({ uri }));
      setSelectedAssets(current => ([...current, ...uris]));
    }
  }

  const handleTakePhoto = async () => {
    const permissionResult = await requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      setIsGrantAlertVisible(true);
      return;
    }

    let result = await launchCameraAsync(IMAGE_PICKER_OPTIONS);

    if (!result.canceled) {
      const uris = result.assets.map(({ uri }) => ({ uri }));
      setSelectedAssets(current => ([...current, ...uris]));
    }
  }

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
                <Button icon='camera' mode="outlined" onPress={handleTakePhoto}>
                  Camera
                </Button>
                <Button icon='file' mode="outlined" onPress={handlePickDocuments}>
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