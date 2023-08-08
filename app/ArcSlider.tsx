import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RadialSlider} from 'react-native-radial-slider';
import {
  SLIDER_DOTS,
  COLORS,
  THUMB_RADIUS,
  SLIDER_WIDTH,
  INCREMENT_VALUE,
  SUBTITLE,
  MIN_VAL,
  MAX_VAL,
} from './constants';
import useArcSliderHooks from './ArcSlider.hooks';
const ArcSlider: React.FC = () => {
  const {sliderValue, setSliderValue, sliderProps, handleDragComplete} =
    useArcSliderHooks();

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <SliderDotsComponent
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />
        <RadialSlider
          fixedMarker
          lineColor={COLORS.theme}
          isHideLines
          isHideButtons
          isHideTailText
          sliderTrackColor={sliderValue >= 100 ? COLORS.theme : COLORS.gray}
          thumbColor={COLORS.theme}
          linearGradient={[{color: COLORS.theme, offset: '1'}]}
          thumbRadius={THUMB_RADIUS}
          thumbImage={sliderProps.image}
          sliderWidth={SLIDER_WIDTH}
          onStart={() => {
            setSliderValue(p => p + INCREMENT_VALUE);
          }}
          isHideValue
          title={sliderProps.title}
          subTitle={SUBTITLE}
          isHideSubtitle={sliderValue < 20}
          subTitleStyle={styles.subTitle}
          titleStyle={styles.sliderTitle}
          value={sliderValue}
          min={MIN_VAL}
          max={MAX_VAL}
          onComplete={handleDragComplete}
        />
      </View>
    </View>
  );
};

interface SliderDotsProps {
  sliderValue: number;
  setSliderValue: (value: number) => void;
}

const SliderDotsComponent = ({
  sliderValue,
  setSliderValue,
}: SliderDotsProps) => {
  return (
    <>
      {SLIDER_DOTS.map((style, index) => {
        const sliderStepValue = (index + 1) * 20;
        const isActive = sliderValue > sliderStepValue;
        const isSliderStepValue =
          parseInt(String(sliderValue)) === sliderStepValue;
        const isNearbyValue =
          sliderValue > sliderStepValue - 5 &&
          sliderValue < sliderStepValue + 5;

        const backgroundColor = isActive ? COLORS.themeBlur : COLORS.white;
        const zIndex =
          !Number.isInteger(sliderValue) && isSliderStepValue
            ? 9999
            : isNearbyValue
            ? 0
            : 9999;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setSliderValue(sliderStepValue)}
            style={[
              {
                ...(style as any),
                backgroundColor,
                zIndex,
              },
              styles.sliderDots,
            ]}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderTitle: {
    color: COLORS.black,
    fontSize: 28,
    fontWeight: '700',
  },
  sliderDots: {
    height: 8,
    width: 8,
    borderRadius: 10,
    position: 'absolute',
  },
  dotsContainer: {
    height: 200,
    width: 250,
    backgroundColor: 'transparent',
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ArcSlider;
