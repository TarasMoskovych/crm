export interface Tap {
  open: () => void;
  close: () => void;
  destroy: () => void;
}
