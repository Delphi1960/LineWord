import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomImage from '../../assets/image';
import CustomButton from '../../assets/load.button';
import {useMMKVBoolean, useMMKVString} from 'react-native-mmkv';
import {generateGrid} from '../../utils/generateGrid';
import {storage} from '../../utils/storage';
import {MAX_CHAPTER, MAX_LEVEL} from '../../types/constants';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';

import ProgressBar from '../supporting/ProgressBar';
import {Button} from 'react-native-paper';

type Props = {
  navigation: any;
};

// const maxLevel = 3;
//  const LEVEL = [
//   {chapter: '0', level: '3},

// ];

export default function StartGame({navigation}: Props) {
  const [showGrid] = useMMKVBoolean('@showGrid');

  storage.contains('@chapter') ? null : storage.set('@chapter', '0');
  storage.contains('@level') ? null : storage.set('@level', '1');
  storage.contains('@bonusCount') ? null : storage.set('@bonusCount', 0);
  storage.contains('@freeHintCount') ? null : storage.set('@freeHintCount', 0);

  storage.contains('@mainWords')
    ? null
    : storage.set('@mainWords', JSON.stringify([]));

  const [chapter, setСhapter] = useMMKVString('@chapter');
  const [level, setLevel] = useMMKVString('@level');

  const nLevel = Number(level)!;
  const nChapter = Number(chapter)!;

  const handlePress = () => {
    generateGrid();
    navigation.navigate('LineWordGesture');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={showGrid ? CustomImage.milkyway : CustomImage.sky}
        style={styles.backImage}>
        {Number(chapter) > MAX_CHAPTER ? (
          <View>
            <FastImage
              style={styles.fastImage}
              source={GifImage.salut}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={styles.exitButton}>
              <Button
                icon="exit-run"
                mode="outlined"
                // uppercase={true}
                labelStyle={styles.butText}
                style={styles.butStyle}
                // buttonColor="blue"
                textColor="darkblue"
                onPress={() => {
                  setLevel('1');
                  setСhapter('0');
                  navigation.goBack();
                }}>
                Назад
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.startContainer}>
            <ProgressBar
              height={30}
              width={250}
              nLevel={nChapter}
              maxLevel={MAX_CHAPTER}
              text={`Глава ${Number(chapter)} из  ${MAX_CHAPTER}`}
            />
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => handlePress()}>
              <View style={styles.buttonTextCont}>
                <Image
                  source={
                    level === '1' && chapter === '0'
                      ? CustomButton.label
                      : CustomButton.labelNext
                  }
                  style={styles.image}
                  resizeMode="stretch"
                />

                {/* <Text style={styles.text}>Глава {chapter}</Text> */}
              </View>
            </TouchableOpacity>
            <ProgressBar
              height={30}
              width={250}
              nLevel={nLevel - 1}
              maxLevel={MAX_LEVEL}
              text={`Уровень ${nLevel - 1} из  ${MAX_LEVEL}`}
            />

            <View style={styles.exitButton}>
              <Button
                icon="exit-run"
                mode="outlined"
                // uppercase={true}
                labelStyle={styles.butText}
                style={styles.butStyle}
                // buttonColor="blue"
                textColor="darkblue"
                onPress={() => {
                  navigation.goBack();
                }}>
                Выход
              </Button>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: 50,
  },
  backImage: {
    width: '100%',
    height: '100%',
  },
  buttonTextCont: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    // flex: 1,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 28,
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    // marginTop: -80,
  },
  text1: {fontSize: 20, color: 'blue', textAlign: 'center', fontWeight: 'bold'},
  image: {
    width: 300, // Set the width of your image
    height: 110, // Set the height of your image
  },
  fastImage: {width: 500, height: 500, alignSelf: 'center'},
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  finalGame: {flexDirection: 'row', justifyContent: 'center'},
  butText: {fontSize: 18},
  butStyle: {width: 250},
});
