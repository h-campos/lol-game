export const generateFakePrices = (truePrice: number, numFakePrice: number): number[] => {
  const fakePrices: number[] = [];
  for (let i = 0; i < numFakePrice; i++) {
    const randomOffset = Math.floor(Math.random() * 21) - 40;
    const fakePrice = truePrice + randomOffset;
    const roundedFakePrice = Math.round(fakePrice / 10) * 10;
    if (roundedFakePrice < 0) {
      fakePrices.push(0);
    } else {
      fakePrices.push(roundedFakePrice);
    }
  }
  return [...fakePrices, truePrice];
};