import { FC, ReactNode } from "react";
import { Appbar } from "react-native-paper";

interface AppHeaderProps {
  title?: string;
  onGoBack?: () => void;
  headerRight?: () => ReactNode,
  headerLeft?: () => ReactNode,
};

export const AppHeaderBase: FC<AppHeaderProps> = props => {
  const { onGoBack, title = '', headerRight = () => null, headerLeft = () => null } = props;
  const canGoBack = onGoBack !== undefined;

  return (
    <Appbar.Header>
      {canGoBack ? <Appbar.BackAction onPress={onGoBack} /> : headerLeft()}
      <Appbar.Content title={title} />
      {headerRight()}
    </Appbar.Header>
  )
}