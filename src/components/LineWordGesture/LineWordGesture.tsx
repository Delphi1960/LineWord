import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import OpenTheWord from './OpenTheWord';
import {LineWordGrid} from './LineWordGrid';
import CircleButtonsGesture from './CircleButtonsGesture';
import CustomImage from '../../assets/image';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import Sound from 'react-native-sound';
import LineHeader from '../../navigation/LineHeader';
import {Level} from '../../utils/Level';
import GoogleBanner from '../reklama/GoogleBanner';
import NotEnoughBonusModal from '../supporting/NotEnoughBonusModal';

// sound------------------------------------
let sound = new Sound(require('../../assets/sound/melody.wav'));
sound.setVolume(1);
Sound.setCategory('Playback', true); //если false - остановит воспроизведение

export default function LineWordGesture({navigation}: any) {
  const [showGrid] = useMMKVBoolean('@showGrid');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [showBonus, setShowBonus] = useMMKVBoolean('@showBonus');

  const [soundButton] = useMMKVBoolean('@sound');

  const [label, showLabel] = useState(false);

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
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCrosswordSolved]);

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
    case 5:
      imageName = CustomImage.chapter3;
      break;
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
            <LineWordGrid />
          )}
        </View>
        <View style={styles.textContainer}>
          <OpenTheWord />
        </View>
        <View style={styles.buttonContainer}>
          <CircleButtonsGesture navigation={navigation} />
        </View>

        <View style={styles.banner}>
          <GoogleBanner />
        </View>
      </ImageBackground>

      <NotEnoughBonusModal
        visible={showBonus!}
        press1={() => {
          navigation.navigate('GoogleInterstitial');
          setShowBonus(!showBonus);
        }}
        press2={() => {
          setShowBonus(!showBonus);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gridContainer: {
    position: 'relative',
    // flex: 0.5,
    alignItems: 'center',
    // backgroundColor: 'grey',
  },
  textContainer: {
    position: 'absolute',
    top: 40,
    // flex: 0.07,
    // backgroundColor: 'yellow',
    borderRadius: 10,
    // width: Dimensions.get('screen').width,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    // flex: 0.45,
    // backgroundColor: 'green',
    width: Dimensions.get('screen').width,
  },
  banner: {
    height: 50,
    // flex: 0.1,
    // marginTop: 5,
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
