// import {
//     Canvas,
//     Circle,
//     Path,
//     Rect,
//     Skia,
//     useSharedValueEffect,
//     useValue,
//   } from "@shopify/react-native-skia";
//   import React from "react";
//   import { Dimensions, StyleSheet, Text, View } from "react-native";
//   import {
//     Gesture,
//     GestureDetector,
//     GestureHandlerRootView,
//   } from "react-native-gesture-handler";
//   import Animated, {
//     useAnimatedStyle,
//     useSharedValue,
//     useDerivedValue
//   } from "react-native-reanimated";
//   import { polar2Canvas } from "react-native-redash";
//   import Icon from './Icons.svg';
  
//   const { width, height } = Dimensions.get("window");
  
//   const ghost = require("./ghost.png");
  
//   const ArcSlider = () => {
//     const strokeWidth = 20;
//     const center = width / 2;
//     const r = (width - strokeWidth) / 2 - 40;
//     const startAngle = Math.PI;
//     const endAngle = 2 * Math.PI;
//     const x1 = center - r * Math.cos(startAngle);
//     const y1 = -r * Math.sin(startAngle) + center;
//     const x2 = center - r * Math.cos(endAngle);
//     const y2 = -r * Math.sin(endAngle) + center;
//     const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
//     const rawForegroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
//     const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);
//     const skiaForegroundPath = Skia.Path.MakeFromSVGString(rawForegroundPath);
  
//     const movableCx = useSharedValue(x2);
//     const movableCy = useSharedValue(y2);
//     const previousPositionX = useSharedValue(x2);
//     const previousPositionY = useSharedValue(y2);
//     const percentComplete = useSharedValue(0);
  
//     const skiaCx = useValue(x2);
//     const skiaCy = useValue(y2);
//     const skiaPercentComplete = useValue(0);
  
//     const gesture = Gesture.Pan()
//       .onUpdate(({ translationX, translationY, absoluteX }) => {
//         const oldCanvasX = translationX + previousPositionX.value;
//         const oldCanvasY = translationY + previousPositionY.value;
  
//         const xPrime = oldCanvasX - center;
//         const yPrime = -(oldCanvasY - center);
//         const rawTheta = Math.atan2(yPrime, xPrime);
  
//         let newTheta;
  
//         if (absoluteX < width / 2 && rawTheta < 0) {
//           newTheta = Math.PI;
//         } else if (absoluteX > width / 2 && rawTheta <= 0) {
//           newTheta = 0;
//         } else {
//           newTheta = rawTheta;
//         }
  
//         const percent = 1 - newTheta / Math.PI;
//         percentComplete.value = percent;
  
//         const newCoords = polar2Canvas(
//           {
//             theta: newTheta,
//             radius: r,
//           },
//           {
//             x: center,
//             y: center,
//           }
//         );
  
//         movableCx.value = newCoords.x;
//         movableCy.value = newCoords.y;
//       })
//       .onEnd(() => {
//         previousPositionX.value = movableCx.value;
//         previousPositionY.value = movableCy.value;
//       });
  
//     useSharedValueEffect(
//       () => {
//           console.log({percentComplete})
//         skiaCx.current = movableCx.value;
//         skiaCy.current = movableCy.value;
//         skiaPercentComplete.current = percentComplete.value;
//       },
//       movableCx,
//       movableCy,
//       percentComplete
//     );
  
//     const style = useAnimatedStyle(() => {
//       return { height: 200, width: 300, opacity: percentComplete.value };
//     }, [percentComplete]);
  
//     if (!skiaBackgroundPath || !skiaForegroundPath) {
//       return <View />;
//     };

//     console.log({style: style.opacity, percentComplete, skiaPercentComplete})
  
//     return (
//         <View style={styles.wrapper}>
//       <GestureHandlerRootView style={styles.container}>
//         <GestureDetector gesture={gesture}>
//           <View style={styles.container}>
//             <View style={styles.ghost}>
//               <Animated.Image source={ghost} style={style} resizeMode="center" />
//               <Animated.Text style={{ color: '#fff' }}>
//               {Math.round(percentComplete.value * 100)}%
//             </Animated.Text>
//             </View>
//             <Canvas style={styles.canvas}>
//               <Rect x={0} y={0} width={width} height={height} color="black" />
//               <Path
//                 path={skiaBackgroundPath}
//                 style="stroke"
//                 strokeWidth={strokeWidth}
//                 strokeCap="round"
//                 color={"grey"}
//               />
//               <Path
//                 path={skiaForegroundPath}
//                 style="stroke"
//                 strokeWidth={strokeWidth}
//                 strokeCap="round"
//                 color={"orange"}
//                 start={0}
//                 end={skiaPercentComplete}
//               />
//               <Circle
//                 cx={skiaCx}
//                 cy={skiaCy}
//                 r={20}
//                 color="orange"
//                 style="fill"
//               />
//               <Circle cx={skiaCx} cy={skiaCy} r={15} color="white" style="fill" />
//             </Canvas>
//           </View>
//         </GestureDetector>
//       </GestureHandlerRootView>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//       wrapper: {
//         flex: 1,
//         backgroundColor: '#fff',    
//       },
//     container: {
//       flex: 1,
//     },
//     canvas: {
//       flex: 1,
//     },
//     cursor: {
//       backgroundColor: "green",
//     },
//     ghost: {
//       flex: 2,
//       backgroundColor: "black",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   });
// export default ArcSlider;

import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import { Svg, Path, G, Circle } from 'react-native-svg';
const ArcSlider = () => {
  const [speed, setSpeed] = useState(0);
  const radius = 120;
  const strokeWidth = 10;
  const dotRadius = 6;
  const circumference = 2 * Math.PI * radius;
  const sliderWidth = 250;
  const numDots = 5; // Number of dots to render
    // const arcLength = ((speed / 100) * (2 * Math.PI * (radius - strokeWidth / 2))).toFixed(2);
      const dotPositions = Array.from({ length: numDots }).map((_, index) => {
    const percentage = (index / (numDots - 1)) * 100;
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    return { x, y };
  });
  console.log({speed})
  const getTitle = () => {
    if(speed > 0 && speed < 19) {
        return ''
    }
    if(speed >= 20 && speed <= 39) {
        return '>18';
    }
    if(speed >= 40 && speed <= 59) {
        return '18-24';
    }
    if(speed >= 60 && speed <= 79) {
        return '25-34';
    }
    if(speed >= 80 && speed <= 99) {
        return '35-44';
    }
    if(speed >= 100) {
        return '45+'
    }
  }


  const getThumbIcon = () => {
    if(speed > 0 && speed < 19) {
        return require('./images/small.png')
    }
    if(speed >= 20 && speed <= 39) {
        return require('./images/small.png')
    }
    if(speed >= 40 && speed <= 59) {
        return require('./images/medium.png')
    }
    if(speed >= 60 && speed <= 79) {
        return require('./images/large.png')
    }
    if(speed >= 80 && speed <= 99) {
        return require('./images/xl.png')
    }
    if(speed >= 100) {
        return require('./images/xxl.png')
    }
  }

  return (
    <View style={styles.container}>
               <View style={{
                height: 200,
                width: 250,
            }}>
              <Pressable 
              onPress={() => setSpeed(20)}
              style={{
                  backgroundColor: speed > 20 ? '#FFC0BC' : '#fff',
                  height: 8,
                  width: 8,
                  borderRadius: 10,
                  position: 'absolute',
                  left: '12.5%',
                  bottom: '45%',
                  zIndex: speed > 18 && speed < 24 ? 0 : 9999,
            }} />
            <Pressable 
            onPress={() => setSpeed(40)}
            style={{
                  backgroundColor: speed > 40 ? '#FFC0BC' :'#fff',
                  height: 8,
                  width: 8,
                  borderRadius: 10,
                  position: 'absolute',
                  left: '25%',
                  top: '25%',
                  zIndex: speed > 38 && speed < 45 ? 0 : 9999,
            }} />
            <Pressable 
            onPress={() => setSpeed(60)} style={{
                  backgroundColor: speed > 60 ? '#FFC0BC' : '#fff',
                  height: 8,
                  width: 8,
                  borderRadius: 10,
                  position: 'absolute',
                  left: '48%',
                  top: '14%',
                  zIndex: speed > 58 && speed < 65 ? 0 : 9999,
            }} />
                <Pressable 
            onPress={() => setSpeed(80)} style={{
                      backgroundColor: speed > 80 ? '#FFC0BC' : '#fff',
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      position: 'absolute',
                      right: '25%',
                      top: '25%',
                      zIndex: speed > 78 && speed < 85 ? 0 : 9999,
                }} />
            <Pressable 
            onPress={() => setSpeed(100)} style={{
                  backgroundColor: speed > 100 ? '#FFC0BC' : '#fff',
                  height: 8,
                  width: 8,
                  borderRadius: 10,
                  position: 'absolute',
                  right: '13.5%',
                  bottom: '45%',
                  zIndex: speed > 98 && speed < 105 ? 0 : 9999,
            }} />
           
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
            thumbImage={getThumbIcon()}
            sliderWidth={25}
            isHideValue
            title={getTitle()}
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
            value={speed} min={0} max={120} onComplete={x => {
                if(x > 0 && x < 19) {
                    setSpeed(0)
                } else if(x >= 20 && x <= 39) {
                  setSpeed(20)
                } else if(x >= 40 && x <= 59) {
                    setSpeed(40) 
                } else if(x >= 60 && x <= 79) {
                    setSpeed(60)
                } else if(x >= 80 && x <= 99) {
                    setSpeed(80)
                } else if(x >= 100) {
                    setSpeed(100)
                } else {
                    setSpeed(x)
                }
            }} />
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

// import React, { useRef, useState } from 'react';
// import { View, Text, PanResponder } from 'react-native';
// import { Surface, Shape, Group } from '@react-native-community/art';

// export const ArcSlider = () => {
//   const radius = 120;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   const sliderWidth = 250;
//   const numDots = 10; // Number of dots to render

//   const [sliderValue, setSliderValue] = useState(60);

//   const handlePanResponderMove = (_, gestureState) => {
//     // Calculate the angle based on the touch position
//     const angle = Math.atan2(gestureState.moveY - radius, gestureState.moveX - radius);
//     // Convert angle to a percentage (0 to 100)
//     const percentage = ((angle + Math.PI) / (2 * Math.PI)) * 100;

//     // Update the slider value, clamping it between 0 and 100
//     setSliderValue(Math.min(100, Math.max(0, percentage)));
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: handlePanResponderMove,
//     })
//   ).current;

//   // Calculate the positions of the dots along the slider track
//   const dotPositions = Array.from({ length: numDots }).map((_, index) => {
//     const percentage = (index / (numDots - 1)) * 100;
//     const angle = (percentage / 100) * 2 * Math.PI - Math.PI;
//     const x = radius + radius * Math.cos(angle);
//     const y = radius + radius * Math.sin(angle);
//     return { x, y };
//   });

//   return (
//     <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }} {...panResponder.panHandlers}>
//       <Surface width={radius * 2} height={radius * 2}>
//         <Group rotation={-90} originX={radius} originY={radius}>
//           {/* Arc slider track */}
//           <Shape
//             d={`M ${radius} 0 A ${radius} ${radius} 0 1 1 ${radius} ${radius * 2}`}
//             stroke="#E4E7EB"
//             strokeWidth={strokeWidth}
//           />

//           {/* Arc slider progress */}
//           <Shape
//             d={`M ${radius} 0 A ${radius} ${radius} 0 ${(sliderValue / 100) * 1} 1 ${radius - 1} 240`}
//             stroke="#FF7A59"
//             strokeWidth={strokeWidth}
//           />

//           {/* Dots */}
//           {dotPositions.map(({ x, y }, index) => (
//             <Shape
//               key={index}
//               d={`M ${x} ${y} L ${x} ${y + 5}`}
//               stroke="#FF7A59"
//               strokeWidth={3}
//             />
//           ))}
//         </Group>
//       </Surface>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sliderWidth }}>
//         <Text>0%</Text>
//         <Text>100%</Text>
//       </View>
//     </View>
//   );
// };

// // export default ArcSlider;
// import React, { useRef, useState } from 'react';
// import { View, Text, PanResponder } from 'react-native';
// import { Svg, Path, G, Circle } from 'react-native-svg';

// const ArcSlider = () => {
//   const radius = 120;
//   const strokeWidth = 20;
//   const dotRadius = 6;
//   const sliderWidth = 250;

//   const [sliderValue, setSliderValue] = useState(60);

//   const handlePanResponderMove = (_, gestureState) => {
//     // Calculate the angle based on the touch position
//     const angle = Math.atan2(gestureState.moveY - radius, gestureState.moveX - radius);
//     // Convert angle to a percentage (0 to 100)
//     const percentage = ((angle + Math.PI) / (2 * Math.PI)) * 100;

//     // Update the slider value, clamping it between 0 and 100
//     setSliderValue(Math.min(100, Math.max(0, percentage)));
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: handlePanResponderMove,
//     })
//   ).current;

//   // Calculate the positions of the dots along the slider track
//   const dotPositions = Array.from({ length: 7 }).map((_, index) => {
//     const percentage = (index / 6) * 100;
//     const angle = (percentage / 100) * 2 * Math.PI - Math.PI;
//     const x = radius + (radius - dotRadius - 5) * Math.cos(angle);
//     const y = radius + (radius - dotRadius - 5) * Math.sin(angle);
//     return { x, y };
//   });

//   // Calculate the arc length based on the slider value
//   const arcLength = ((sliderValue / 100) * (2 * Math.PI * (radius - strokeWidth / 2))).toFixed(2);

//   return (
//     <View style={{ alignItems: 'center' }} {...panResponder.panHandlers}>
//       <Svg height={radius * 2} width={radius * 2}>
//         <G rotation="-90" origin={`${radius}, ${radius}`}>
//           <Path
//             stroke="#E4E7EB"
//             strokeWidth={strokeWidth}
//             d={`M ${radius} 0 A ${radius} ${radius} 0 1 1 ${radius} ${radius * 2}`}
//           />
//           <Path
//             stroke="#FF7A59"
//             strokeWidth={strokeWidth}
//             strokeLinecap="round"
//             strokeDasharray={[arcLength, (2 * Math.PI * (radius - strokeWidth / 2)).toFixed(2)]}
//             d={`M ${radius} 0 A ${radius} ${radius} 0 ${
//               sliderValue <= 50 ? 0 : 1
//             } 1 ${radius - 1} 240`}
//           />
//           {dotPositions.map(({ x, y }, index) => (
//             <Circle key={index} cx={x} cy={y} r={dotRadius} fill="#FF7A59" />
//           ))}
//         </G>
//         <Circle
//           cx={radius}
//           cy={radius}
//           r={radius - strokeWidth / 2}
//           fill="transparent"
//           stroke="transparent"
//         />
//       </Svg>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sliderWidth }}>
//         <Text style={{ color: '#FF7A59' }}>0%</Text>
//         <Text style={{ color: '#FF7A59' }}>100%</Text>
//       </View>
//     </View>
//   );
// };

export default ArcSlider;
