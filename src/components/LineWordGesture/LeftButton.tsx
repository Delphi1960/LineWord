import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../assets/load.button';
import {storage} from '../../utils/storage';
import InfoModal from '../supporting/InfoModal';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import {generateGrid} from '../../utils/generateGrid';
import {Badge} from '@rneui/themed';

export default function LeftButton() {
  const [, setWord] = useState<string>('');
  const [showGrid, setShowGrid] = useMMKVBoolean('@showGrid');
  const [wordBonus] = useMMKVObject<string[]>('@wordBonus');

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
      {/* <TouchableOpacity
        onPress={() => {
          generateGrid();
          setWord('');
          storage.set('@lineButtonText', '');
        }}>
        <Image
          source={CustomButton.reset}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          setModalProps({
            title: 'Ваши бонусы',
            text: wordBonus!.join(', '),
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
        <Badge
          status="error"
          value={wordBonus?.length}
          containerStyle={{position: 'absolute', top: 5, left: 50}}
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
