import { ImagePickerOptions, launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';

type TemporaryAsset = {
  uri: string;
}

interface UseGalleryConfig {
  onSelect: (images: TemporaryAsset[]) => void;
  onGrantError?: () => void;
  onCancel?: () => void;
  options?: ImagePickerOptions;
}

interface UseGalleryResult {
  handleUseGallery: () => void;
}

export function useGallery(config: UseGalleryConfig): UseGalleryResult {
  const { onSelect, onCancel, onGrantError, options = {}} = config;

  const handleUseGallery = async () => {
    const permissionResult = await requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return onGrantError?.();
    }

    const result = await launchImageLibraryAsync(options);

    if (result.canceled) {
      return onCancel?.();
    }

    return onSelect(result.assets.map(({ uri }) => ({ uri })));
  }

  return {
    handleUseGallery
  }
}