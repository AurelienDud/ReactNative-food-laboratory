import { FC, PropsWithChildren } from "react";
import { Button } from "react-native-paper";

interface SubmitProps {
  onSubmit: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export const Submit: FC<PropsWithChildren<SubmitProps>> = props => {
  const { children, onSubmit, isDisabled, isLoading } = props;

  return (
    <Button
      onPress={onSubmit}
      disabled={isDisabled}
      mode="contained"
      loading={isLoading}
    >
      {children}
    </Button>
  )
}