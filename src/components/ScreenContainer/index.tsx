import { FC, PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";

interface ScreenContainerProps {
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: FC<PropsWithChildren<ScreenContainerProps>> = props => {
  const { children, style } = props;

  return (
    <ThemedView style={[styles.content, style]}>
      {children}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
});