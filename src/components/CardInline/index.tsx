import { useLocalAssetUri } from "@/src/features/useLocalAssetUri";
import { FC } from "react";
import { Image, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ThemedView } from "../ThemedView";


interface CardInlineProps {
  title: string;
  date?: string;
  imageUri?: string;
  onPress?: () => void;
}

export const CardInline: FC<CardInlineProps> = props => {
  const { title, imageUri, date, onPress } = props;
  const cardCoverPlaceholderUri = useLocalAssetUri(require('@/assets/images/icon.png'));

  return (
    <Card onPress={onPress}>
      <ThemedView style={styles.row}>
        <Image source={{ uri: imageUri ?? cardCoverPlaceholderUri }} style={styles.cover} />
        <ThemedView style={styles.content}>
          <Card.Title title={title} subtitle={date} />
        </ThemedView>
      </ThemedView>
    </Card>
  )
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row' 
  },
  cover: { 
    height: '100%',
    maxWidth: '25%',
    aspectRatio: 1, 
  },
  content: { 
    flex: 1 
  },
});