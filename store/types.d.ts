export interface BasicAction {
  type: string;
  meta?: {
    [key: string]: unknown;
  };
  payload?: {
    [key: string]: unknown;
  };
}
