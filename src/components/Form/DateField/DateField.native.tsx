import DateTimePicker from '@react-native-community/datetimepicker';
import { FC, useState } from "react";
import { Platform } from "react-native";
import { ThemedView } from '../../ThemedView';
import { DateFieldValue } from './DateFieldValue';

interface DateFieldProps {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}

export const DateField: FC<DateFieldProps> = props => {
  const { value, onChange, label } = props;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOpenPicker = (): void => {
    setShowDatePicker(true);
  }

  const handleChange = (date: Date): void => {
    // Fit the Android native behavior
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    onChange(date);
  }

  return (
    <ThemedView>
      <DateFieldValue
        displayedValue={value ? value.toLocaleDateString() : ''}
        label={label}
        onOpenPicker={handleOpenPicker}
      />

      {(showDatePicker) ? (
        <DateTimePicker
          value={value}
          mode="date"
          onValueChange={(_, date) => handleChange(date)}
        />
      ) : null}
    </ThemedView>
  )
}