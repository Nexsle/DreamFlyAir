export default function flightReviver(key: string, value: any) {
  switch (key) {
    case "departure":
    case "arrival":
      return new Date(value);
    default:
      return value;
  }
}
