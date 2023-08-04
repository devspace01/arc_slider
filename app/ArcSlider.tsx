import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import { SLIDER_DOTS } from './constants';
const ArcSlider = () => {
  const [speed, setSpeed] = useState(0);

// TODO: if need to show image during sliding
//   const getThumbIcon = () => {
//     if(speed > 0 && speed < 19) {
//         return require('./images/small.png')
//     }
//     if(speed >= 20 && speed <= 39) {
//         return require('./images/small.png')
//     }
//     if(speed >= 40 && speed <= 59) {
//         return require('./images/medium.png')
//     }
//     if(speed >= 60 && speed <= 79) {
//         return require('./images/large.png')
//     }
//     if(speed >= 80 && speed <= 99) {
//         return require('./images/xl.png')
//     }
//     if(speed >= 100) {
//         return require('./images/xxl.png')
//     }
//     return ''
//   }

  const sliderProps = useMemo(() => {
      let title = '';
      let image = '';
      let value = 0;
    if(speed > 0 && speed <= 19) {
        title = '';
        image = '';
        value = 0;
    }
    if(speed >= 20 && speed <= 39) {
        if(speed === 20) {
            image = require('./images/small.png')
        } else {
            image = ''
        }
        title = '>18';
        value = 20;
    }
    if(speed >= 40 && speed <= 59) {
        if(speed === 40) {
            image = require('./images/medium.png')
        }  else {
            image = ''
        }
        title = '18-24';
        value = 40;
    }
    if(speed >= 60 && speed <= 79) {
        if(speed === 60) {
            image = require('./images/large.png')
        } else {
            image = ''
        }
        title = '25-34';
        value = 60;
    }
    if(speed >= 80 && speed <= 99) {
        if(speed === 80) {
            image = require('./images/xl.png')
        } else {
            image = ''
        }
        title = '35-44';
        value = 80;
    }
    if(speed >= 100) {
        if(speed === 100) {
            image =  require('./images/xxl.png')
        } else {
            image = ''
        }
        title = '45+';
        value = 80;
    }
    return {
        title,
        image,
        speed: speed
    }
  }, [speed])

  return (
    <View style={styles.container}>
               <View style={{
                height: 200,
                width: 250,
                backgroundColor: 'transparent',
            }}>
                {SLIDER_DOTS.map((item, index) => {
                    const dotSpeed = (index + 1) * 20
                    return (
                        <TouchableOpacity 
                        key={index}
                        onPress={() => setSpeed(dotSpeed)} style={{
                            ...item,
                            backgroundColor: speed > dotSpeed ? '#FFC0BC' : '#FFFFFF',
                            height: 8,
                            width: 8,
                            borderRadius: 10,
                            position: 'absolute',
                            zIndex: speed > (dotSpeed - 5) && speed < (dotSpeed + 5) ? 0 : 9999,
                        }} />
                    )
                })}
              
            <RadialSlider 
            fixedMarker
            lineColor="#FF645A"
            isHideLines
            isHideButtons
            isHideTailText
            sliderTrackColor={speed >= 100 ? '#FF645A' : '#F3F3F3'}
            thumbColor="#FF645A"
            linearGradient={[{
               color:  "#FF645A",
               offset: '1'
            }]}
            thumbRadius={20}
            thumbImage={sliderProps.image}
            sliderWidth={25}
            isHideValue
            title={sliderProps.title}
            subTitle={"Years old"}
            isHideSubtitle={speed < 20}
            subTitleStyle={{
                fontWeight: '600',
                fontSize: 13
            }}
            titleStyle={{
                color: '#000',
                fontSize: 28,
                fontWeight: '700'
            }}
            onChange={setSpeed}
            value={speed} min={0} max={120} />
            </View>   
            
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ArcSlider;
