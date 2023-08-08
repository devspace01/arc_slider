export const getSliderThresholdValue = (number: number) => {
  // get 60 % of th provided number
  return number - 8;
};

export const getThresholdValue = (x: number) => {
  if (x >= 0 && x <= 19) {
    return 20;
  } else if (x >= 20 && x <= 39) {
    if (x >= getSliderThresholdValue(40)) {
      return 40;
    } else {
      return 20;
    }
  } else if (x >= 40 && x <= 59) {
    if (x >= getSliderThresholdValue(60)) {
      return 60;
    } else {
      return 40;
    }
  } else if (x >= 60 && x <= 79) {
    if (x >= getSliderThresholdValue(80)) {
      return 80;
    } else {
      return 60;
    }
  } else if (x >= 80 && x <= 99) {
    if (x >= getSliderThresholdValue(100)) {
      return 100;
    } else {
      return 80;
    }
  } else if (x >= 100) {
    return 100;
  } else {
    return x;
  }
};
