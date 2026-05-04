import { FC } from "react";
import { FAB } from "react-native-paper";
import { styles } from "./styles";
import { FabButtonProps } from "./types";

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

