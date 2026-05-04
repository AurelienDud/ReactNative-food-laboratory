import { FC } from "react";
import { StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ThemedText } from "../ThemedText";

interface AssetCardProps {
  uri: string;
  onDelete?: () => void;
  onLabel?: () => void;
}

export const AssetCard: FC<AssetCardProps> = props => {
  const { uri, onDelete, onLabel } = props;

  return (
    <Card>
      <Card.Cover
        style={styles.cover}
        source={{ uri }}
      />
      {/* <Card.Title title='coucou' collapsable /> */}
      <Card.Content>
        <ThemedText>
          Coucou
        </ThemedText>
      </Card.Content>
      <Card.Actions>
        <IconButton 
          icon="text-box-edit"
          mode="contained-tonal"
          onPress={onLabel}
        />
        <IconButton 
          icon="delete"
          mode="contained-tonal"
          onPress={onDelete}
        />
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});