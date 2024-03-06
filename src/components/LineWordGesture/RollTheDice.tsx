import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';
import CustomButton from '../../assets/load.button';
import {TextStroke} from '../../utils/TextStroke';
import {Level} from '../../utils/Level';
import {generateGrid} from '../../utils/generateGrid';
import RandomNumberGenerator from '../supporting/RandomNumberGenerator';

type Props = {navigation: any};

export default function RollTheDice({navigation}: Props) {
  const handlePress = () => {
    const level = Level.getLevel();
    // console.log(level);
    level.currentChapter === 0 ? generateGrid() : null;
    navigation.navigate('LineWordGesture');
  };

  return (
    <View style={styles.containerFastImage}>
      <FastImage
        style={styles.fastImage}
        source={GifImage.RollTheDice}
        resizeMode={FastImage.resizeMode.contain}
      />
      <RandomNumberGenerator />
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
    </View>
  );
}
const styles = StyleSheet.create({
  containerFastImage: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'yellow',
  },

  fastImage: {width: 150, height: 200},
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
});
