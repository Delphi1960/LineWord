import React from 'react';
import {
  BackHandler,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import CustomImage from '../assets/image';
import {Button} from 'react-native-paper';
import {storage} from '../utils/storage';
import LineHeader from '../navigation/LineHeader';
import {generateGrid} from '../utils/generateGrid';

type Props = {
  navigation: any;
};

export default function MainScreen({navigation}: Props) {
  storage.contains('@chapter') ? null : storage.set('@chapter', '0');
  storage.contains('@level') ? null : storage.set('@level', '1');
  storage.contains('@levelCount') ? null : storage.set('@levelCount', 0);
  storage.contains('@bonusCount') ? null : storage.set('@bonusCount', 0);
  storage.contains('@freeHintCount') ? null : storage.set('@freeHintCount', 0);
  storage.contains('@mainWords')
    ? null
    : storage.set('@mainWords', JSON.stringify([]));

  storage.contains('@lineword') ? null : generateGrid();

  const handlePress = () => {
    // generateGrid();
    navigation.navigate('LineWordGesture');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={CustomImage.sky} style={styles.backImage}>
        <LineHeader navigation={navigation} goTo={''} />
        <View style={styles.button}>
          <Image
            source={CustomImage.LineWord2}
            style={styles.imageStyle}
            resizeMode="center"
          />
        </View>

        <View style={styles.button}>
          <Button
            // icon="exit-run"
            mode="elevated"
            uppercase={true}
            labelStyle={styles.butText}
            style={styles.butStyle}
            buttonColor="blue"
            textColor="yellow"
            onPress={handlePress}>
            Основная игра
          </Button>
        </View>

        <View style={styles.button}>
          <Button
            // icon="exit-run"
            mode="elevated"
            uppercase={true}
            labelStyle={styles.butText}
            onPress={() => {}}
            style={styles.butStyle}
            buttonColor="blue"
            textColor="yellow">
            Игра на время
          </Button>
        </View>

        <View style={styles.button}>
          <Button
            // icon="exit-run"
            mode="elevated"
            uppercase={true}
            labelStyle={styles.butText}
            onPress={() => {}}
            style={styles.butStyle}
            buttonColor="blue"
            textColor="yellow">
            Головоломка дня
          </Button>
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
  startContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {width: 300, height: 200},
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
  image: {
    width: 300, // Set the width of your image
    height: 110, // Set the height of your image
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  butText: {fontSize: 18},
  butStyle: {width: 250},
});
