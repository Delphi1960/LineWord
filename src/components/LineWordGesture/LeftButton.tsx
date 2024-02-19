import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../assets/load.button';
import {storage} from '../../utils/storage';
import InfoModal from '../supporting/InfoModal';
import {useMMKVBoolean} from 'react-native-mmkv';
import {generateGrid} from '../../utils/generateGrid';

export default function LeftButton() {
  const [, setWord] = useState<string>('');
  const [showGrid, setShowGrid] = useMMKVBoolean('@showGrid');

  // Show Modal dialog
  const [show, setShow] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: '',
    text: '',
    pressOk: () => {},
    pressCancel: () => {},
  });
  // Modal show bonus
  const showBonus = () => {
    setShow(false);
  };

  const handleShowGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <View style={styles.sideButtonsContainer}>
      <TouchableOpacity
        onPress={() => {
          generateGrid();
          // generateLineWord();

          setWord('');
          storage.set('@lineButtonText', '');
          // setPressedColor(PRESSEDCOLOR_OFF);
        }}>
        <Image
          source={CustomButton.reset}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setModalProps({
            title: 'Ваши бонусы',
            text: 'Бонусами являются слова, которые можно составить из букв кнопок, но не предусмотренны в кроссворде',
            pressOk: showBonus, // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
          });
          setShow(true);
        }}>
        <Image
          source={CustomButton.bonus}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShowGrid}>
        <Image
          source={showGrid ? CustomButton.blueOn : CustomButton.blueOff}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Модальное окно */}
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
