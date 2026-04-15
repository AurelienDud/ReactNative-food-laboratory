import { Theme } from "@/src/types/lib";
import { FC, PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";

interface ScreenContainerProps {
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: FC<PropsWithChildren<ScreenContainerProps>> = props => {
  const { children, style } = props;
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={[styles.container, style]}>
      <ThemedView style={styles.content}>
        {children}
      </ThemedView>
    </SafeAreaView>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});