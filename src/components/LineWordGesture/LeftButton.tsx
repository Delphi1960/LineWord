import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../assets/load.button';
import InfoModal from '../supporting/InfoModal';
import {useMMKVBoolean, useMMKVNumber, useMMKVObject} from 'react-native-mmkv';
import {Badge} from '@rneui/themed';
import {Level} from '../../utils/Level';

export default function LeftButton() {
  const [] = useState<string>('');
  const [showGrid, setShowGrid] = useMMKVBoolean('@showGrid');
  const [wordBonus] = useMMKVObject<string[]>('@wordBonus');
  const [bonusCount] = useMMKVNumber('@bonusCount');

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
          value={bonusCount}
          containerStyle={styles.badge}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShowGrid}>
        <Image
          source={CustomButton.grid}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Level.clearLevel();
          // navigation.navigate('MainScreen');
          // navigation.goBack();
        }}>
        <Image
          source={CustomButton.reset}
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
        // pressCancel={modalProps.pressCancel}
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
  badge: {position: 'absolute', top: 5, left: 50},
  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    margin: 10,
    width: 50,
    height: 50,
  },
});
