import { FC } from "react";
import { Appbar } from "react-native-paper";
import { IconName, ThemedIcon } from "../ThemedIcon";

interface AppHeaderActionProps {
  iconName: IconName;
  onPress: () => void;
}

export const AppHeaderAction: FC<AppHeaderActionProps> = ({ iconName, onPress }) => (
  <Appbar.Action icon={({ size, color }) => <ThemedIcon name={iconName} size={size} color={color} />} onPress={onPress} />
)