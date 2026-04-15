import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

type SpaceSize = 'small' | 'medium' | 'large';

interface SpacerProps {
  size?: SpaceSize;
}

export const Spacer: FC<PropsWithChildren<SpacerProps>> = props => {
  const { children, size = 'medium' } = props;
  const styles = makeStyles(size);

  return (
    <ThemedView style={styles.container}>
      {children}
    </ThemedView>
  )
}

function convertSpaceSizeToPixel(size: SpaceSize): number {
  switch(size) {
    case 'small': 
      return 4;
    case 'large': 
      return 24;
    case 'medium': 
    default: 
      return 12;
  }
}

const makeStyles = (size: SpaceSize) => StyleSheet.create({
  container: {
    gap: convertSpaceSizeToPixel(size),
  },
});