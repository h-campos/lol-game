export const calculateScore = (value: number): number | undefined => {
  if (value === 0) {
    return 5;
  } else if (value === 1) {
    return 4;
  } else if (value === 2) {
    return 3;
  } else if (value === 3) {
    return 2;
  } else if (value === 4) {
    return 1;
  } else if (value === 5) {
    return 0;
  } else {
    return 100;
  }
};