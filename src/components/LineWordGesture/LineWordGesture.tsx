import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
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
import BonusModal from '../supporting/BonusModal';

// sound------------------------------------
let sound = new Sound(require('../../assets/sound/melody.wav'));
sound.setVolume(1);
Sound.setCategory('Playback', true); //если false - остановит воспроизведение

export default function LineWordGesture({navigation}: any) {
  const [showGrid] = useMMKVBoolean('@showGrid');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [soundButton] = useMMKVBoolean('@sound');

  const [label, showLabel] = useState(false);

  const [showBonus, setShowBonus] = useState(false);
  // const [getBonus, setGetBonus] = useState(true);

  const isCrosswordSolved = solvedGrid!.every(row =>
    row.every(cell => cell !== '0'),
  );
  const level = Level.getLevel();
  // let levelCount = level.levelsСompleted;

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

  // useEffect(() => {
  //   if (level.levelsСompleted === 3 && !isCrosswordSolved) {
  //     setShowBonus(true);
  //   }
  // }, [isCrosswordSolved, level]);

  let imageName = CustomImage.chapter0;
  switch (level.currentChapter) {
    case 0:
      imageName = CustomImage.chapter0;
      break;
    case 1:
      imageName = CustomImage.chapter1;
      break;
    case 2:
      imageName = CustomImage.chapter2;
      break;
    case 3:
      imageName = CustomImage.chapter3;
      break;
    case 4:
      imageName = CustomImage.chapter4;
      break;
    // case 5:
    //   imageName = CustomImage.chapter5;
    //   break;
    default:
      imageName = CustomImage.chapter0;
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={showGrid ? CustomImage.sky : imageName}
        resizeMode="cover"
        style={styles.backImage}>
        <LineHeader navigation={navigation} goTo={level.levelsСompleted} />

        <View style={styles.gridContainer}>
          {label ? (
            <View style={styles.lentaContainer}>
              <Image source={CustomImage.lenta} style={styles.lentaImage} />
            </View>
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

      <BonusModal
        visible={showBonus}
        press1={() => {
          setShowBonus(!showBonus);
        }}
        press2={() => {}}
      />
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
    alignItems: 'center',
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
    marginBottom: -10,
  },

  lentaContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  lentaImage: {width: Dimensions.get('screen').width, resizeMode: 'contain'},

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
