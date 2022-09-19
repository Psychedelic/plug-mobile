type Key = string | number;
export type GenericObjectInterface<T> = {
  [key in Key]: T;
};

export type StringObject = GenericObjectInterface<string>;
export type NumberObject = GenericObjectInterface<number>;

export type Nullable<T> = T | null;

export interface FontMakerOptions {
  size?: number;
  color?: string;
  weight?: string;
  family?: string;
}

declare global {
  interface Console {
    tron: any;
  }
}
