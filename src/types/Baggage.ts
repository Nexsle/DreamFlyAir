export type BaggageType = "adult" | "infant" | "child";

export type BaggageItem = {
  id: number;
  type: "adult" | "infant" | "child";
  departure: "outbound" | "return";
  weight: number;
  price: number;
};

export type Baggage = {
  weight: number;
  price: number;
  type: BaggageType;
};

export enum BaggageRate {
  adult = 20,
  child = 10,
  infant = 5,
}
