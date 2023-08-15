const getIsEqualZero = (num: number | undefined) => {
  if (num === undefined) {
    return false;
  }

  return num <= 0;
};

export default getIsEqualZero;
