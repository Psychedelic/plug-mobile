type Key = string | number;
export type GenericObjectInterface<T> = {
  [key in Key]: T;
};

export type StringObject = GenericObjectInterface<string>;

export interface FontMakerOptions {
  size?: number;
  color?: string;
  weight?: string;
  family?: string;
}
