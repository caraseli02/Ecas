export function formatNumberWithCommas(number: number, prefix = ''): string {
    const [wholePart, decimalPart] = number.toFixed(2).split('.');
    const formattedWholePart = parseInt(wholePart, 10).toLocaleString('en-US');
    return prefix ? `${prefix} ${formattedWholePart}.${decimalPart}` : `${formattedWholePart}.${decimalPart}`;
}
