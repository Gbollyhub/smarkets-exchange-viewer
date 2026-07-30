export const priceToDecimal = (price: number): number => 10000 / price;

export const formatDecimal = (price: number | undefined | null): string =>
  price ? (10000 / price).toFixed(2) : "—";

export const formatEventType = (event_type: string) => {
  return event_type.split("_").join(" ").toLocaleLowerCase();
}