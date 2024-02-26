import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import OpenTheWord from './OpenTheWord';
import {LinewordGrid} from './LinewordGrid';
import CircleButtonsGesture from './CircleButtonsGesture';
import CustomImage from '../../assets/image';
import {useMMKVBoolean, useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {MAX_LEVEL} from '../../types/constants';
import CustomButton from '../../assets/load.button';
import Sound from 'react-native-sound';

// sound------------------------------------
let sound = new Sound(require('../../assets/sound/melody.wav'));
sound.setVolume(1);
Sound.setCategory('Playback', true); //если false - остановит воспроизведение

export default function LineWordGesture({navigation}: any) {
  const [showGrid] = useMMKVBoolean('@showGrid');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');
  const [chapter, setСhapter] = useMMKVString('@chapter');
  const [level, setLevel] = useMMKVString('@level');

  const [label, showLabel] = useState(false);

  const nLevel = Number(level)!;
  const nChapter = Number(chapter)!;

  const isCrosswordSolved = solvedGrid!.every(row =>
    row.every(cell => cell !== '0'),
  );

  useEffect(() => {
    if (isCrosswordSolved) {
      if (nLevel === MAX_LEVEL) {
        setСhapter((nChapter + 1).toString());
        setLevel('1');
      } else {
        setLevel((nLevel + 1).toString());
      }

      setTimeout(() => {
        sound.play();
        showLabel(true);
      }, 1500);

      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCrosswordSolved]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={showGrid ? CustomImage.sky : CustomImage.milkPath}
        style={styles.backImage}>
        {label ? (
          <View style={styles.lentaContainer}>
            <Image source={CustomImage.lenta} style={styles.lentaImage} />
          </View>
        ) : (
          <LinewordGrid />
        )}

        <OpenTheWord />

        <CircleButtonsGesture />
        <View style={styles.google}>
          <Text>Здесь будет </Text>
          <TouchableOpacity
            onPress={() => {
              setLevel('1');
              setСhapter('2');
              navigation.goBack();
            }}>
            <Image
              source={CustomButton.reset}
              style={styles.sideButtons}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text> реклама от Google</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lentaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  lentaImage: {width: 300, height: 100, resizeMode: 'stretch'},
  backImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  google: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: 80,
    width: '100%',
  },
  sideButtons: {
    width: 50,
    height: 50,
  },
});
