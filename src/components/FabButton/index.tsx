import { FC } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface FabButtonProps {
  icon: string;
  label?: string;
  onPress: () => void;
}

export const FabButton: FC<FabButtonProps> = props => {
  const { onPress, label, icon } = props;

  return (
    <FAB
      icon={icon}
      style={styles.fab}
      onPress={onPress}
      label={label}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})