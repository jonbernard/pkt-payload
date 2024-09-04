export type Content = {
  [k: string]: unknown;
  type: string;
  version: number;
};

export type ContentRoot = {
  type: string;
  children?: Content[];
  direction: ('ltr' | 'rtl') | null;
  format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
  indent: number;
  version: number;
};
