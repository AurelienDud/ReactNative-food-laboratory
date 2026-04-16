import { FC, PropsWithChildren, useMemo } from "react";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

interface SafeViewContainerProps {
  mode?: 'fullscreen';
}

export const SafeViewContainer: FC<PropsWithChildren<SafeViewContainerProps>> = props => {
  const { children, mode } = props;

  const edges: Edges = useMemo(() => {
    if (mode === 'fullscreen') {
      return ['top', 'right', 'bottom', 'left'];
    }

    return ['right', 'bottom', 'left'];
  }, [mode])

  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      {children}
    </SafeAreaView>
  );
}