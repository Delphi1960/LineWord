import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import OpenTheWord from './OpenTheWord';
import {LinewordGrid} from './LinewordGrid';
import CircleButtonsGesture from './CircleButtonsGesture';
import CustomImage from '../../assets/image';
import {useMMKVBoolean} from 'react-native-mmkv';

export default function LineWordGesture() {
  const [showGrid] = useMMKVBoolean('@showGrid');
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        start={{x: 0.5, y: 0.0}}
        end={{x: 0.5, y: 1.0}}
        colors={['#94e0ff', '#e9ff']}
        style={styles.gradient}
      /> */}
      <ImageBackground
        source={showGrid ? CustomImage.sky : CustomImage.milkPath}
        style={styles.backImage}>
        <LinewordGrid />

        <OpenTheWord />

        <CircleButtonsGesture />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  backImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 1,
  },
});
