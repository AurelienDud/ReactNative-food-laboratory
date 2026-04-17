import { FC } from "react";
import { FieldError } from "react-hook-form";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { Spacer } from "../Spacer";

interface TextFieldProps extends Omit<TextInputProps, 'error'> {
  error?: FieldError; 
}

export const TextField: FC<TextFieldProps> = props => {
  const { error, ...textInputProps } = props;
  const hasError = error !== undefined;

  return (
    <Spacer size="small">
      <TextInput
        {...textInputProps}
        error={hasError}
      />
      {hasError ? (
        <HelperText type="error" visible>
          {error?.message}
        </HelperText>
      ) : null}
    </Spacer>
  );
};