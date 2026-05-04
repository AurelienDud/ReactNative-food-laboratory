import { AssetCard } from "@/src/components/AssetCard";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { useCamera } from "@/src/features/useCamera";
import { useGallery } from "@/src/features/useGallery";
import { router } from "expo-router";
import { FC, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Button, Portal, Snackbar } from "react-native-paper";

type TemporaryAsset = {
  uri: string;
}

interface AssetNewScreenProps {
  mode: 'camera' | 'gallery'; 
}

export const AssetNewScreen: FC<AssetNewScreenProps> = props => {
  const { mode } = props;
  const [selectedAssets, setSelectedAssets] = useState<TemporaryAsset[]>([]);
  const [isGrantAlertVisible, setIsGrantAlertVisible] = useState(false);

  const { handleUseGallery } = useGallery({
    options: {
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      defaultTab: 'albums'
    },
    onSelect: images => setSelectedAssets(current => ([...current, ...images])),
    onCancel: () => router.back(),
    onGrantError: () => setIsGrantAlertVisible(true),
  });

  const { handleUseCamera } = useCamera({
    options: {
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 1,
    },
    onSelect: images => setSelectedAssets(current => ([...current, ...images])),
    onCancel: () => router.back(),
    onGrantError: () => setIsGrantAlertVisible(true),
  });

  const isInit = useRef(false)
  useEffect(() => {
    if (!isInit.current) {
      mode === 'camera' ? handleUseCamera() : handleUseGallery()
      isInit.current = false;
    }
  }, [mode]);

  return (
    <>
      <ScreenContainer>
        <FlatList 
          data={selectedAssets}
          scrollEnabled
          keyExtractor={asset => asset.uri}
          renderItem={({ item: asset }) => (
            <AssetCard 
              uri={asset.uri}
              onDelete={() => {}} 
              onLabel={() => {}} 
            />
          )}
          contentContainerStyle={{ gap: 8 }}
        />
        <Button>
          Submit
        </Button>
      </ScreenContainer>
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