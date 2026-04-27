export interface FormSelectOption {
  label: string;
  value: string;
  icon?: unknown;
}

export interface InputObject {
  value: unknown;
  error: string;
  type?: 'email';
}
