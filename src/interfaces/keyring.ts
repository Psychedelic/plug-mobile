//TODO Should this be in the controller package?

export interface Token {
  symbol: string;
  canisterId: string;
  name: string;
  decimals: number;
  standard: string; // TODO: Should we add an enum here? Ask Rocky
}

export interface Asset {
  token: Token;
  amount: string;
}
