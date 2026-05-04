import { type ImagePickerOptions, launchCameraAsync, requestCameraPermissionsAsync } from 'expo-image-picker';

type TemporaryAsset = {
  uri: string;
}

interface UseCameraConfig {
  onSelect: (images: TemporaryAsset[]) => void;
  onGrantError?: () => void;
  onCancel?: () => void;
  options?: ImagePickerOptions;
}

interface UseCameraResult {
  handleUseCamera: () => void;
}

export function useCamera(config: UseCameraConfig): UseCameraResult {
  const { onSelect, onCancel, onGrantError, options = {}} = config;

  const handleUseCamera = async () => {
    const permissionResult = await requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      return onGrantError?.();
    }

    const result = await launchCameraAsync(options);

    if (result.canceled) {
      return onCancel?.();
    }

    return onSelect(result.assets.map(({ uri }) => ({ uri })));
  }

  return {
    handleUseCamera
  }
}