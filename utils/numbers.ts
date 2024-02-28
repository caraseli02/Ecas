export function formatNumberWithCommas(number: number): string {
  const [wholePart, decimalPart] = number.toFixed(2).split('.');
  const formattedWholePart = parseInt(wholePart, 10).toLocaleString('en-US');
  return `$ ${formattedWholePart}.${decimalPart}`;
}
