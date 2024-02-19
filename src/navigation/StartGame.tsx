import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomImage from '../assets/image';
import CustomButton from '../assets/load.button';
import {useMMKVBoolean, useMMKVString} from 'react-native-mmkv';
import * as Progress from 'react-native-progress';
import {generateGrid} from '../utils/generateGrid';

type Props = {
  navigation: any;
};

export default function StartGame({navigation}: Props) {
  const [showGrid] = useMMKVBoolean('@showGrid');

  const [chapter, setСhapter] = useMMKVString('@chapter');
  chapter === undefined ? setСhapter('0') : null;

  const [level, setLevel] = useMMKVString('@level');
  level === undefined ? setLevel('0') : null;

  const handlePtress = () => {
    generateGrid();
    navigation.navigate('LineWordGesture', {itemId: 1});
  };

  return (
    <View style={styles.buttonContainer}>
      <ImageBackground
        source={showGrid ? CustomImage.milkPath : CustomImage.sky}
        style={styles.backImage}>
        <View>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => handlePtress()}>
            <View style={styles.buttonTextCont}>
              <Image
                source={CustomButton.label}
                style={styles.image}
                resizeMode="stretch"
              />

              <Text style={styles.text}>Глава {chapter}</Text>
              <Text style={styles.text1}>Уровень {level}/10</Text>
              <Progress.Bar
                style={{marginTop: 5}}
                progress={0}
                width={150}
                height={10}
                color={'blue'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextCont: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    // justifyContent: 'center',
    // width: 200,
    // height: 50,
    // backgroundColor: 'yellow',
    // borderRadius: 30,
  },
  text: {
    fontSize: 28,
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -100,
  },
  text1: {fontSize: 20, color: 'blue', textAlign: 'center', fontWeight: 'bold'},
  image: {
    width: 300, // Set the width of your image
    height: 110, // Set the height of your image
  },
});
