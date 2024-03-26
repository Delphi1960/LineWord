import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomImage from '../assets/image';
import {Button} from 'react-native-paper';
import {storage} from '../utils/storage';
import {generateGrid} from '../utils/generateGrid';
import {Level} from '../utils/Level';
import CustomButton from '../assets/load.button';
import {TextStroke} from '../utils/TextStroke';
import GoogleBanner from './reklama/GoogleBanner';
import RollTheDiceModal from './LineWordGesture/RollTheDiceModal';

// type Props = {
//   navigation: any;
// };

export default function MainScreen({navigation}: any) {
  storage.contains('@wordCount') ? null : storage.set('@wordCount', 0);
  storage.contains('@showBonus') ? null : storage.set('@showBonus', false);
  storage.contains('@bonusCount') ? null : storage.set('@bonusCount', 0);

  storage.contains('@mainWords')
    ? null
    : storage.set('@mainWords', JSON.stringify([]));

  storage.contains('@lineword') ? null : generateGrid(3);
  storage.contains('@lastTime')
    ? null
    : storage.set('@lastTime', new Date().toISOString());

  const [show, setshow] = useState(false);

  const millisecondsInDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в сутках

  useEffect(() => {
    // При монтировании компонента загружаем последнее сохраненное время из MMKV
    let lastTime = storage.getString('@lastTime');
    if (Date.now() - new Date(lastTime!).getTime() >= millisecondsInDay) {
      // Если прошли сутки или это первое открытие, сохраняем текущее время в MMKV и открываем модальное окно
      storage.set('@lastTime', new Date().toISOString());
      // Здесь можете открыть модальное окно
      setshow(true);
    } else {
      // Если сутки еще не прошли, модальное окно не открываем
      // console.log(
      //   `Осталось ${
      //     millisecondsInDay - (Date.now() - new Date(lastTime!).getTime())
      //   } секунд до розыграша бонусов`,
      // );
    }
  }, [millisecondsInDay]);

  const handlePress = () => {
    const level = Level.getLevel();
    // console.log(level);
    level.currentChapter === 0 ? generateGrid(level.currentChapter + 3) : null;
    navigation.navigate('LineWordGesture');
    setshow(false);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={CustomImage.chapter3} style={styles.backImage}>
        {/* <LineHeader navigation={navigation} goTo={''} /> */}
        <View>
          <Image
            source={CustomImage.LineWord}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <View style={styles.buttonContainer}>
              <Image
                source={CustomButton.blueButton}
                style={styles.imageButton}
                resizeMode="stretch"
              />
              <TextStroke stroke={0.5} color={'black'}>
                <Text style={styles.textForButton}>Основная игра</Text>
              </TextStroke>
            </View>
          </TouchableOpacity>
        </View>

        {/*        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={pazlePress}>
            <View style={styles.buttonContainer}>
              <Image
                source={CustomButton.blueButton}
                style={styles.imageButton}
                resizeMode="stretch"
              />
              <TextStroke stroke={0.5} color={'black'}>
                <Text style={styles.textForButton}>Головоломка дня</Text>
              </TextStroke>
            </View>
          </TouchableOpacity>
        </View> */}

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
              BackHandler.exitApp();
            }}>
            Покинуть игру
          </Button>
        </View>

        <RollTheDiceModal visible={show} press1={handlePress} />

        {/*  */}
        <View style={styles.banner}>
          <GoogleBanner />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {width: Dimensions.get('screen').width, height: 250},
  backImage: {
    width: '100%',
    height: '100%',
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
    // marginTop: 0,
    fontSize: 18,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 5,
  },
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  butText: {fontSize: 18, color: 'yellow', textAlign: 'center'},
  butStyle: {width: 180, borderColor: 'white'},
});
