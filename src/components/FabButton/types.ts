/**
 * Must be compatible with FabButton component, FabButtons component and FabButtons items. 
 */
export interface FabButtonProps {
  icon: string;
  label?: string;
  onPress: () => void;
}