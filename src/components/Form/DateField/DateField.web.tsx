import { FC, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import { ThemedView } from '../../ThemedView';
import { DateFieldValue } from './DateFieldValue';

interface DateFieldProps {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}

export const DateField: FC<DateFieldProps> = props => {
  const { value, onChange, label } = props;
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = (): void => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  }

  const handleChange = (rawDate: string): void => {
    // Fit the Android native behavior
    if (Platform.OS === 'android') {
      inputRef.current?.blur();
    }

    if (rawDate) {
      onChange(new Date(rawDate));
    }
  }

  return (
    <ThemedView>
      <DateFieldValue
        displayedValue={value ? value.toLocaleDateString() : ''}
        label={label}
        onOpenPicker={handleOpenPicker}
      />

      <input
        ref={inputRef}
        type="date"
        value={value.toISOString().slice(0, 10)}
        onChange={event => handleChange(event.target.value)}
        style={styles.input}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  input: {
  position: 'absolute',
  inset: 0,
  opacity: 0,
  pointerEvents: 'none',
  }
})
