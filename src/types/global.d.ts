export type TButton = {
  label: string;
  icon: string;
  color: string;
  clickFn?: (...args: any[]) => void | Promise<void>;
};
