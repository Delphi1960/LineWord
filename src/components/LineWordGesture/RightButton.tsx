import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomButton from '../../assets/load.button';
import InfoModal from '../supporting/InfoModal';
import {LinewordTools} from '../../utils/LinewordTools';
import {useMMKVObject} from 'react-native-mmkv';

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
    LinewordTools.markSolvedLetter(grid!, solvedGrid!);
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
            title: 'Открыть слово?',
            text: 'Тут одним баллом не обойдешься!',
            pressOk: showLetter, // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
          });
          setShow(true);
        }}>
        <Image
          source={CustomButton.openWord}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setModalProps({
            title: 'HELP!',
            text: 'Не знаю пока, нужно или нет!',
            pressOk: showLetter, // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
          });
          setShow(true);
        }}>
        <Image
          source={CustomButton.help}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <InfoModal
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
    justifyContent: 'space-evenly',
    // backgroundColor: 'lightblue',
    zIndex: 2,
  },

  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    margin: 10,
    width: 50,
    height: 50,
  },
});
