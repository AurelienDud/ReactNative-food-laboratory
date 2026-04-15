import { FC } from "react";
import { Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { ThemedView } from "../../ThemedView";

interface DateFieldValueProps {
  onOpenPicker: () => void;
  displayedValue: string;
  label: string; 
}

export const DateFieldValue: FC<DateFieldValueProps> = props => {
  const { displayedValue, label, onOpenPicker } = props;

  return (
    <Pressable onPress={onOpenPicker}>
      <ThemedView pointerEvents="none">
        <TextInput
          label={label}
          value={displayedValue}
          mode="flat"
          editable={false}
          right={<TextInput.Icon icon="calendar" onPress={onOpenPicker}/>}
        />
      </ThemedView>
    </Pressable>
  )
}