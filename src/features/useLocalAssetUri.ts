import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

type VirtualAssetModule = Parameters<typeof Asset.fromModule>[0];

/**
 * @example
 * const uri = useLocalAssetUri(require('path/in/the/project.png'));
 */
export function useLocalAssetUri(requiredPath: VirtualAssetModule): string {
  const [uri, setUri] = useState<string>();

  const getUri = async () => {
    const asset = Asset.fromModule(requiredPath);
    await asset.downloadAsync();
    setUri(asset.localUri ?? asset.uri);
  }

  useEffect(() => {
    getUri();
  }, []);
  
  return uri ?? '';
}