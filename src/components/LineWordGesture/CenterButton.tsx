import React, {useState} from 'react';
import {TouchableOpacity, Image, StyleSheet, Animated} from 'react-native';
import CustomButton from '../../assets/load.button';
import {CIRCLE_BUTTON_SIZE} from '../../types/constants';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import {storage} from '../../utils/storage';
import {CircleButtonType} from '../../types/data.type';
import {shuffleLetters} from '../../utils/shuffleLetters';
import Sound from 'react-native-sound';

const soundList = new Sound(require('../../assets/sound/centerButton.mp3'));
Sound.setCategory('Playback', true);

type Props = {
  buttons: CircleButtonType[];
};

export default function CenterButton({buttons}: Props) {
  const [soundButton] = useMMKVBoolean('@sound');
  const [, setLettersButtons] = useMMKVObject<string[]>('@circleButton');
  const [animation] = useState(new Animated.Value(1));

  const pulseButton = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  //onPress на центральную кнопку для перемешивания букв
  const handleCenterButton = () => {
    soundButton ? soundList.play() : null;
    pulseButton();
    const timer = setInterval(() => {
      const shuffledButtons = shuffleLetters(buttons);
      storage.set('@buttonsState', JSON.stringify(shuffledButtons));

      const letters = shuffledButtons.map(item => item.button);
      setLettersButtons(letters);

      clearInterval(timer);
    }, 250);
  };

  const styles = StyleSheet.create({
    image: {
      width: CIRCLE_BUTTON_SIZE, // Set the width of your image
      height: CIRCLE_BUTTON_SIZE, // Set the height of your image
    },

    centerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'red', // Цвет центральной кнопки
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Animated.View style={{transform: [{scale: animation}]}}>
      <TouchableOpacity
        style={styles.centerButton}
        onPress={handleCenterButton}>
        <Image
          source={CustomButton.shuffle}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
