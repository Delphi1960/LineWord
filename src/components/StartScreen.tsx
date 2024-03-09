import React, {useEffect, useRef} from 'react';
import {Animated, ImageBackground, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomImage from '../assets/image';

type Props = {navigation: any};

export default function StartScreen({navigation}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  //   const fadeIn = () => {
  //     Animated.sequence([
  //       Animated.timing(fadeAnim, {
  //         toValue: 0,
  //         duration: 2000,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 5000,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(fadeAnim, {
  //         toValue: 0,
  //         duration: 2000,
  //         useNativeDriver: true,
  //       }),
  //     ]).start();
  //   };

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            navigation.navigate('MainScreen');
          });
        });
      });
    };
    fadeIn();
  }, [fadeAnim, navigation]);

  return (
    <ImageBackground source={CustomImage.chapter3} style={styles.backImage}>
      <Animated.View style={[styles.imageContainer, {opacity: fadeAnim}]}>
        <FastImage
          style={styles.mainImage}
          source={CustomImage.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Animated.View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backImage: {
    width: '100%',
    height: '100%',
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {width: 200, height: 200},
});
