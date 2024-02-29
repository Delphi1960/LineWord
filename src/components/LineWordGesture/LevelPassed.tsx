import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';
import CustomImage from '../../assets/image';
import {Button} from 'react-native-paper';
import {useMMKVBoolean, useMMKVString} from 'react-native-mmkv';
import {MAX_LEVEL} from '../../types/constants';
import ProgressBar from '../supporting/ProgressBar';
import {generateGrid} from '../../utils/generateGrid';
import {storage} from '../../utils/storage';

type Props = {
  navigation: any;
};

export default function LevelPassed({navigation}: Props) {
  const [chapter, setChapter] = useMMKVString('@chapter');
  const [level, setLevel] = useMMKVString('@level');

  const nLevel = Number(level)!;
  const nChapter = Number(chapter)!;

  useEffect(() => {
    if (nChapter === 0 && nLevel === 3) {
      setLevel('0');
      setChapter('1');
    }
    if (nChapter === 1 && nLevel === 4) {
      setLevel('0');
      setChapter('2');
    }
    if (nChapter === 2 && nLevel === 10) {
      setLevel('0');
      setChapter('3');
    }
  }, []);

  const handlePress = () => {
    generateGrid();
    navigation.navigate('LineWordGesture');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backGif}>
        <FastImage
          style={styles.fastImage}
          source={GifImage.stars}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View style={styles.imageContainer}>
        <FastImage
          style={styles.mainImage}
          source={CustomImage.levelPassed}
          resizeMode={FastImage.resizeMode.contain}
        />
        {/* <View style={{alignItems: 'center', margin: 50}}> */}
        <Text style={styles.chapterStyle}>ГЛАВА {nChapter}</Text>
        <View style={styles.progress}>
          <ProgressBar
            height={30}
            width={250}
            nLevel={nLevel}
            maxLevel={MAX_LEVEL}
            text={`Уровень ${nLevel} из  ${MAX_LEVEL}`}
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => handlePress()}
            // icon="exit-run"
            mode="elevated"
            //   uppercase={true}
            labelStyle={styles.butText}
            style={styles.butStyle}
            buttonColor="blue"
            textColor="yellow">
            Продолжить
          </Button>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {width: 400, height: 500, position: 'absolute'},
  chapterStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue',
    margin: 10,
  },
  progress: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: 50,
  },

  backGif: {zIndex: 0},
  fastImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignSelf: 'center',
    zIndex: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 20,
    zIndex: 2,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // bottom: 0,
  },

  butText: {fontSize: 16},
  butStyle: {width: 150},
});
