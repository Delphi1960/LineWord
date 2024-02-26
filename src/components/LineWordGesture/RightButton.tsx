import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomButton from '../../assets/load.button';
import {LinewordTools} from '../../utils/LinewordTools';
import {useMMKVObject} from 'react-native-mmkv';
import {storage} from '../../utils/storage';
import {LetterPos} from '../../types/data.type';
import Options from '../supporting/Options';

export default function RightButton() {
  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  // Show Modal dialog
  const [show, setShow] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: '',
    text: '',
    pressOk: () => {},
    pressCancel: () => {},
  });
  // Modal Open letter
  const showLetter = () => {
    setShow(false);
    let letterPos: LetterPos[] = LinewordTools.markSolvedLetter(
      grid!,
      solvedGrid!,
    )!;
    storage.set('@lastWordPos', JSON.stringify(letterPos));
  };

  return (
    <View style={styles.sideButtonsContainer}>
      <TouchableOpacity
        onPress={() => {
          setModalProps({
            title: 'Открыть одну букву?',
            text: 'С Вас снимут 1 бал или покажут рекламу!',
            pressOk: showLetter, // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
          });
          setShow(true);
        }}>
        <Image
          source={CustomButton.openLetter}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalProps({
            title: 'Настройки',
            text: 'Комфорт без насилия!',
            pressOk: () => setShow(false), // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
          });
          setShow(true);
        }}>
        <Image
          source={CustomButton.reset}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Options
        visible={show}
        title={modalProps.title}
        text={modalProps.text}
        pressOk={modalProps.pressOk}
        pressCancel={modalProps.pressCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sideButtonsContainer: {
    justifyContent: 'space-between',
    // backgroundColor: 'lightblue',
    height: '100%',
    zIndex: 2,
  },

  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    margin: 5,
    width: 50,
    height: 50,
  },
});
