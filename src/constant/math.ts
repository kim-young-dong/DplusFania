// 소수점 자리수 반올림
const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));
// 최소, 최대값 제한
const clamp = (value: number, min = 0, max = 100) => {
  return Math.min(Math.max(value, min), max);
};
// 1 ~ n 사이의 랜덤한 자연수 반환
const getRandomNumber = (n: number): number => {
  if (n < 1) {
    throw new Error("n should be a natural number greater than 0");
  }
  return Math.floor(Math.random() * n) + 1;
};

export { round, clamp, getRandomNumber };
