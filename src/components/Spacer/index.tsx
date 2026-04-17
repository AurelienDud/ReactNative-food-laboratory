import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

type SpaceSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

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
    case 'xsmall': 
      return 4;
    case 'small': 
      return 8;
    case 'large': 
      return 24;
    case 'xlarge': 
      return 32;
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