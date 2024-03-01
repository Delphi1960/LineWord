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
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import CustomButton from '../../assets/load.button';
import Sound from 'react-native-sound';
import LineHeader from '../../navigation/LineHeader';
import {Level} from '../../utils/Level';

// sound------------------------------------
let sound = new Sound(require('../../assets/sound/melody.wav'));
sound.setVolume(1);
Sound.setCategory('Playback', true); //если false - остановит воспроизведение

export default function LineWordGesture({navigation}: any) {
  const [showGrid] = useMMKVBoolean('@showGrid');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');
  // const [chapter, setСhapter] = useMMKVString('@chapter');
  // const [level, setLevel] = useMMKVString('@level');
  // const [levelCount, setLevelCount] = useMMKVNumber('@levelCount');
  const [soundButton] = useMMKVBoolean('@sound');

  const [label, showLabel] = useState(false);

  // const nLevel = Number(level)!;
  // const nChapter = Number(chapter)!;

  const isCrosswordSolved = solvedGrid!.every(row =>
    row.every(cell => cell !== '0'),
  );
  const level = Level.getLevel();

  useEffect(() => {
    if (isCrosswordSolved) {
      // if (nLevel === MAX_LEVEL) {
      //   setСhapter((nChapter + 1).toString());
      //   setLevel('1');
      // } else {
      //   setLevel((nLevel + 1).toString());
      //   setLevelCount(levelCount! + 1);
      // }
      Level.setLevel();

      setTimeout(() => {
        soundButton ? sound.play() : null;
        showLabel(true);
      }, 1500);

      setTimeout(() => {
        showLabel(false);
        navigation.navigate('LevelPassed');
        // navigation.goBack();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCrosswordSolved]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={showGrid ? CustomImage.sky : CustomImage.mp500}
        resizeMode="cover"
        style={styles.backImage}>
        <LineHeader navigation={navigation} goTo={level.levelsСompleted} />
        {label ? (
          <View style={styles.lentaContainer}>
            <Image source={CustomImage.lenta} style={styles.lentaImage} />
          </View>
        ) : level.currentChapter === 0 && level.currentLevel === 0 ? (
          <>
            <Text style={styles.firstText}>
              Для выбора слова, соедините буквы движением пальца
            </Text>
            <LinewordGrid />
          </>
        ) : (
          <LinewordGrid />
        )}

        <OpenTheWord />

        <CircleButtonsGesture />
        <View style={styles.google}>
          <Text>Здесь будет </Text>
          <TouchableOpacity
            onPress={() => {
              Level.clearLevel();
              navigation.navigate('MainScreen');
              // navigation.goBack();
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
  firstText: {
    textAlign: 'center',
    fontSize: 24,
    position: 'absolute',
    marginTop: 40,
    color: 'yellow',
    fontWeight: '500',
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
