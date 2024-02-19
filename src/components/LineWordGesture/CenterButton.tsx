import React, {useState} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomButton from '../../assets/load.button';
import {LINEWORD_CIRCLE_BUTTON_SIZE} from '../../types/constants';
import {useMMKVObject} from 'react-native-mmkv';
import {storage} from '../../utils/storage';
import {CircleButtonType} from '../../types/data.type';

type Props = {
  buttons: CircleButtonType[];
};

export default function CenterButton({buttons}: Props) {
  const [buttonSize, setButtonSize] = useState<number>(
    LINEWORD_CIRCLE_BUTTON_SIZE,
  );

  const [, setLettersButtons] = useMMKVObject<string[]>('@circleButton');

  // Перемешать буквы на кнопках
  function shuffleLetters(arr: CircleButtonType[]): CircleButtonType[] {
    // Извлекаем буквы из объектов в массив
    const letters = arr.map(obj => obj.button);
    // Перемешиваем буквы
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    // Заменяем буквы в исходном массиве на перетасованные
    return arr.map((obj, index) => ({...obj, button: letters[index]}));
  }

  //onPress на центральную кнопку для перемешивания букв
  const handleCenterButton = () => {
    setButtonSize(LINEWORD_CIRCLE_BUTTON_SIZE * 2);
    const timer = setInterval(() => {
      const shuffledButtons = shuffleLetters(buttons);
      storage.set('@buttonsState', JSON.stringify(shuffledButtons));

      const letters = shuffledButtons.map(item => item.button);
      setLettersButtons(letters);

      clearInterval(timer);
      setButtonSize(LINEWORD_CIRCLE_BUTTON_SIZE);
    }, 250);
  };

  const styles = StyleSheet.create({
    image: {
      width: buttonSize, // Set the width of your image
      height: buttonSize, // Set the height of your image
    },
    // image: {
    //   width: LINEWORD_CIRCLE_BUTTON_SIZE, // Set the width of your image
    //   height: LINEWORD_CIRCLE_BUTTON_SIZE, // Set the height of your image
    // },

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
    <TouchableOpacity style={styles.centerButton} onPress={handleCenterButton}>
      <Image
        source={CustomButton.shuffle}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
