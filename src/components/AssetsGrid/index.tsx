import { ReactNode } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";

type BaseAsset = {
  uri: string;
}

const DEFAULT_GET_ASSET_ID_FN = <T extends BaseAsset>(asset: T): string => asset.uri;

interface AssetsGridProps<T> {
  data: T[];
  numColumns?: number;
  maxHeight?: number;
  selectedAssetId?: string[];
  getAssetId: (asset: T) => string;
  onSelectAsset?: (asset: T) => void;
}

export const AssetsGrid = <T extends BaseAsset>(props: AssetsGridProps<T>): ReactNode => {
  const { data, numColumns = 4, maxHeight, onSelectAsset, selectedAssetId = [], getAssetId = DEFAULT_GET_ASSET_ID_FN} = props;

  const paddedData: (T|null)[] = [
    ...data,
    ...Array(
      (numColumns - (data.length % numColumns)) % numColumns
    ).fill(null),
  ];

  return (
    <FlatList
      scrollEnabled={true}
      data={paddedData}
      numColumns={numColumns}
      columnWrapperStyle={{ gap: 8 }}
      contentContainerStyle={{ gap: 8 }}
      extraData={selectedAssetId}
      keyExtractor={(asset, index) => !!asset ? getAssetId(asset) : index.toString()}
      renderItem={({ item: asset }) => asset ? (
        <Pressable 
          style={styles.asset} 
          onPress={() => onSelectAsset?.(asset)} 
        >
          <Image
            source={{ uri: asset.uri }}
            resizeMode="cover"
            style={[styles.image, {
              opacity: selectedAssetId.includes(getAssetId(asset)) ? 0.2 : 1,
            }]}
          />
        </Pressable>
      ) : (
        <View style={styles.asset} />
      )}
      style={[styles.container, { maxHeight }]}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0D0D0',
    padding: 8,
  },
  asset: {
    flex: 1,
    aspectRatio: 1,
  },
  image: {
    flex: 1
  }
});