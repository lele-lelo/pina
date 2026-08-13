export type TButton = {
  label: string;
  icon: string;
  color: string;
  clickFn?: () => void | Promise<void>;
};
