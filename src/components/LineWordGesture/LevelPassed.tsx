import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';
import CustomImage from '../../assets/image';
import {Button} from 'react-native-paper';
import ProgressBar from '../supporting/ProgressBar';
import {generateGrid} from '../../utils/generateGrid';
import {Level} from '../../utils/Level';
import {LevelsType} from '../../types/data.type';
import CustomButton from '../../assets/load.button';

type Props = {
  navigation: any;
};

export default function LevelPassed({navigation}: Props) {
  // const [chapter, setChapter] = useMMKVString('@chapter');
  // const [level, setLevel] = useMMKVString('@level');

  // const nLevel = Number(level)!;
  // const nChapter = Number(chapter)!;
  const levels: LevelsType = Level.getLevel();
  console.log('1==', levels);
  // Level.setLevel();
  // useEffect(() => {
  //   levels = ;
  // }, []);

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

      {/*  */}
      {levels.currentChapter > 2 ? (
        // КОНЕЦ ИГРЫ Запускаю салют
        <View style={styles.imageContainer}>
          <FastImage
            style={[styles.salut]}
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
              buttonColor="yellow"
              textColor="darkblue"
              onPress={() => {
                Level.clearLevel();
                navigation.navigate('MainScreen');
              }}>
              Назад
            </Button>
          </View>
        </View>
      ) : (
        // Прошли уровень. Продолжение игры.
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.mainImage}
            source={CustomImage.levelPassed}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{justifyContent: 'flex-start', marginTop: 40}}>
            <Text style={styles.chapterStyle}>
              ГЛАВА {levels.currentChapter}
            </Text>
            <View style={styles.progress}>
              <ProgressBar
                height={30}
                width={250}
                nLevel={levels.currentLevel}
                maxLevel={levels.maxLevels}
                text={`Уровень ${levels.currentLevel} из  ${levels.maxLevels}`}
              />
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress()}>
                <View style={styles.buttonContainer}>
                  <Image
                    source={CustomButton.greenButton}
                    style={styles.imageButton}
                    resizeMode="stretch"
                  />
                  <Text style={styles.textForButton}>Получить бонус</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress()}>
                <View style={styles.buttonContainer}>
                  <Image
                    source={CustomButton.blueButton}
                    style={styles.imageButton}
                    resizeMode="stretch"
                  />
                  <Text style={styles.textForButton}>Продолжить</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    textAlign: 'center',
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
    margin: 5,
    zIndex: 2,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // bottom: 0,
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    justifyContent: 'flex-start',
    margin: 10,
    width: 250,
    height: 50,
  },
  textForButton: {
    marginTop: -50,
    fontSize: 22,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },

  butText: {fontSize: 16},
  butStyle: {width: 150},
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  salut: {
    width: 500,
    height: 500,
    alignSelf: 'center',
    position: 'relative',
    zIndex: 10,
  },
  space: {marginBottom: 0},
});
