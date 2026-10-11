export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === '') return '০'; // Return default '০'

  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}