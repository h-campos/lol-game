export const randomSelect = <T>(array: T[]): number => {
  return Math.floor(Math.random() * array.length);
};