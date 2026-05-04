import { FC, useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { styles } from "./styles";
import { FabButtonProps } from "./types";

interface FabButtonsProps extends Omit<FabButtonProps, 'onPress'> {
  iconOpen?: string;
  onPress?: (isOpen: boolean) => void;
  actions: FabButtonProps[];
}

export const FabButtons: FC<FabButtonsProps> = props => {
  const { actions, icon, iconOpen, onPress, label } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        label={label}
        open={isOpen}
        visible
        onPress={() => onPress?.(isOpen)}
        icon={isOpen ? (iconOpen ?? icon) : icon}
        onStateChange={({ open }) => setIsOpen(open)}
        style={styles.fab}
        actions={actions}
      />
    </Portal>
  )
}

