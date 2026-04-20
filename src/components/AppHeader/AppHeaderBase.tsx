import { FC, ReactNode } from "react";
import { Appbar } from "react-native-paper";

interface AppHeaderProps {
  title?: string;
  onGoBack?: () => void;
  headerRight?: () => ReactNode,
  headerLeft?: () => ReactNode,
  shouldRemoveStatusBarSpacing?: boolean;
};

export const AppHeaderBase: FC<AppHeaderProps> = props => {
  const { onGoBack, title = '', headerRight = () => null, headerLeft = () => null, shouldRemoveStatusBarSpacing } = props;
  const canGoBack = onGoBack !== undefined;

  return (
    <Appbar.Header 
      mode='center-aligned' 
      elevated 
      statusBarHeight={shouldRemoveStatusBarSpacing ? 0 : undefined}
    >
      {canGoBack ? <Appbar.BackAction onPress={onGoBack} /> : headerLeft()}
      <Appbar.Content title={title} />
      {headerRight()}
    </Appbar.Header>
  )
}