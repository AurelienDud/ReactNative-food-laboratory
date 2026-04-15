import { FC, PropsWithChildren } from "react";
import { Button } from "react-native-paper";

interface SubmitProps {
  onSubmit: () => void;
  isDisabled?: boolean;
}

export const Submit: FC<PropsWithChildren<SubmitProps>> = props => {
  const { children, onSubmit, isDisabled } = props;

  return (
    <Button
      onPress={onSubmit}
      disabled={isDisabled}
      mode="contained"
    >
      {children}
    </Button>
  )
}