// Smarkets quotes prices in basis points (1-10000), not the decimal odds people
// actually recognize. 10000 / price converts one to the other, e.g. 5000 -> 2.00 (evens).
export const priceToDecimal = (price: number): number => 10000 / price;

// Same conversion, but safe to call on a quote that hasn't arrived yet -
// no price (or a literal 0) just renders as a dash instead of "0.00" or NaN.
export const formatDecimal = (price: number | undefined | null): string =>
  price ? (10000 / price).toFixed(2) : "—";

// The API hands back event types as snake_case ("football_match"); this just
// makes them presentable in the UI.
export const formatEventType = (event_type: string) => {
  return event_type.split("_").join(" ").toLocaleLowerCase();
}