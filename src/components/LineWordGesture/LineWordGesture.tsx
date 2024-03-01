import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import OpenTheWord from './OpenTheWord';
import {LinewordGrid} from './LinewordGrid';
import CircleButtonsGesture from './CircleButtonsGesture';
import CustomImage from '../../assets/image';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import Sound from 'react-native-sound';
import LineHeader from '../../navigation/LineHeader';
import {Level} from '../../utils/Level';
import GoogleReklama from '../GoogleReklama';

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
    <View style={styles.mainContainer}>
      <ImageBackground
        source={showGrid ? CustomImage.sky : CustomImage.mp500}
        resizeMode="cover"
        style={styles.backImage}>
        <LineHeader navigation={navigation} goTo={level.levelsСompleted} />

        <View style={styles.gridContainer}>
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
        </View>

        <View style={styles.textContainer}>
          <OpenTheWord />
        </View>

        <View style={styles.buttonContainer}>
          <CircleButtonsGesture />
        </View>

        <View style={styles.banner}>
          <GoogleReklama />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridContainer: {
    flex: 0.5,
    // backgroundColor: 'grey',
  },
  textContainer: {
    flex: 0.07,
    // backgroundColor: 'yellow',
    width: Dimensions.get('screen').width,
  },
  buttonContainer: {
    flex: 0.4,
    // backgroundColor: 'green',
    width: Dimensions.get('screen').width,
  },
  banner: {
    flex: 0.1,
    width: Dimensions.get('screen').width,
  },

  lentaContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  lentaImage: {width: Dimensions.get('screen').width, resizeMode: 'contain'},

  firstText: {
    textAlign: 'center',
    fontSize: 24,
    position: 'absolute',
    marginTop: 40,
    color: 'yellow',
    fontWeight: '500',
  },
  backImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sideButtons: {
    width: 50,
    height: 50,
  },
});
