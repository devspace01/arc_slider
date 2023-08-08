import {useMemo, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {getThresholdValue} from "./utils";

const useArcSliderHooks = () => {
  const [sliderValue, setSliderValue] = useState(20);
  const sliderProps = useMemo(() => {
    let title = '';
    let image: ImageSourcePropType | undefined;

    if (sliderValue >= 0 && sliderValue <= 19) {
      title = '';
    } else if (sliderValue >= 20 && sliderValue <= 39) {
      image = sliderValue === 20 ? require('./images/small.png') : undefined;
      title = '>18';
    } else if (sliderValue >= 40 && sliderValue <= 59) {
      image = sliderValue === 40 ? require('./images/medium.png') : undefined;
      title = '18-24';
    } else if (sliderValue >= 60 && sliderValue <= 79) {
      image = sliderValue === 60 ? require('./images/large.png') : undefined;
      title = '25-34';
    } else if (sliderValue >= 80 && sliderValue <= 99) {
      image = sliderValue === 80 ? require('./images/xl.png') : undefined;
      title = '35-44';
    } else if (sliderValue >= 100) {
      image = sliderValue === 100 ? require('./images/xxl.png') : undefined;
      title = '45+';
    }

    return {
      title,
      image,
    };
  }, [sliderValue]);

  const handleDragComplete = (value: number) => {
      setSliderValue(getThresholdValue(value));
  }
  return {sliderValue, sliderProps, setSliderValue, handleDragComplete};
};

export default useArcSliderHooks;
