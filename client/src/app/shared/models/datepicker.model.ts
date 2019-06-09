export interface DatePicker {
  open: () => void;
  close: () => void;
  destroy: () => void;
  date?: Date;
}
