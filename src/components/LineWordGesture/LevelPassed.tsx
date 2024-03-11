import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';
import CustomImage from '../../assets/image';
import {Button} from 'react-native-paper';
import ProgressBar from '../supporting/ProgressBar';
import {generateGrid} from '../../utils/generateGrid';
import {Level} from '../../utils/Level';
import {LevelsType} from '../../types/data.type';
import CustomButton from '../../assets/load.button';
import {getLevelPassedStyles} from '../../style/LevelPassedStyles';
import {TextStroke} from '../../utils/TextStroke';
import {useMMKVNumber} from 'react-native-mmkv';
import {FREE_BONUS} from '../../types/constants';
import GoogleBanner from '../reklama/GoogleBanner';
import LineHeader from '../../navigation/LineHeader';

//

export default function LevelPassed({navigation}: any) {
  const styles = getLevelPassedStyles();

  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');
  const [levelCount] = useMMKVNumber('@levelCount');

  const levels: LevelsType = Level.getLevel();
  const handlePress = () => {
    generateGrid(levels.currentChapter + 3);
    navigation.navigate('LineWordGesture');
  };

  const handlePressBonus = () => {
    setBonusCount(bonusCount! + 2);
    navigation.navigate('GoogleInterstitial');
  };

  // Каждые FREE_BONUS уровней показываем кино
  useEffect(() => {
    // console.log(levelCount);
    if (levelCount! % FREE_BONUS === 0) {
      handlePressBonus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.backGif}>
          <FastImage
            style={styles.fastImage}
            source={GifImage.stars}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        {/*  */}
        {levels.currentChapter > 5 ? (
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
          // <Modal animationType="slide" transparent={true} visible={showModal}>
          <View style={styles.modal}>
            {/* // Прошли уровень. Продолжение игры. */}
            <View style={styles.imageContainer}>
              <FastImage
                style={styles.mainImage}
                source={CustomImage.levelPassed}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.indent}>
                <Text style={styles.chapterStyle}>
                  ГЛАВА {levels.currentChapter}
                </Text>
                <View style={styles.progress}>
                  <ProgressBar
                    height={30}
                    width={200}
                    nLevel={levels.currentLevel}
                    maxLevel={levels.maxLevels}
                    text={`Уровень ${levels.currentLevel} из  ${levels.maxLevels}`}
                  />
                </View>

                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePressBonus()}>
                    <View style={styles.buttonContainer}>
                      <Image
                        source={CustomButton.greenButton}
                        style={styles.imageButton}
                        resizeMode="stretch"
                      />
                      <TextStroke stroke={0.5} color={'black'}>
                        <Text style={styles.textForButton}>
                          Получить бонусы
                        </Text>
                      </TextStroke>
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
                      <TextStroke stroke={0.5} color={'black'}>
                        <Text style={styles.textForButton}>Продолжить</Text>
                      </TextStroke>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*  */}
          </View>
          // </Modal>
        )}
        <View style={styles.top}>
          <LineHeader navigation={navigation} goTo={levels.levelsСompleted} />
        </View>

        <View style={styles.bottom}>
          <GoogleBanner />
        </View>
      </View>
    </>
  );
}
