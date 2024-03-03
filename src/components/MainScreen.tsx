import React from 'react';
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
import LineHeader from '../navigation/LineHeader';
import {generateGrid} from '../utils/generateGrid';
import {Level} from '../utils/Level';
import CustomButton from '../assets/load.button';
import {TextStroke} from '../utils/TextStroke';

// type Props = {
//   navigation: any;
// };

export default function MainScreen({navigation}: any) {
  storage.contains('@bonusCount') ? null : storage.set('@bonusCount', 0);
  storage.contains('@freeHintCount') ? null : storage.set('@freeHintCount', 0);
  storage.contains('@mainWords')
    ? null
    : storage.set('@mainWords', JSON.stringify([]));

  storage.contains('@lineword') ? null : generateGrid();

  const handlePress = () => {
    const level = Level.getLevel();
    console.log(level);
    level.currentChapter === 0 ? generateGrid() : null;
    navigation.navigate('LineWordGesture');
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={CustomImage.sky} style={styles.backImage}>
        <LineHeader navigation={navigation} goTo={''} />
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

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('LevelPassed');
            }}>
            <View style={styles.buttonContainer}>
              <Image
                source={CustomButton.blueButton}
                style={styles.imageButton}
                resizeMode="stretch"
              />
              <TextStroke stroke={0.5} color={'black'}>
                <Text style={styles.textForButton}>Игра на время</Text>
              </TextStroke>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
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
        </View>

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
    marginTop: -50,
    fontSize: 22,
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
  butText: {fontSize: 18},
  butStyle: {width: 180},
});
