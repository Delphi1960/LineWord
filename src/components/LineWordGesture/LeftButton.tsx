import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../../assets/load.button';
import InfoModal from '../supporting/InfoModal';
import {useMMKVBoolean, useMMKVNumber, useMMKVObject} from 'react-native-mmkv';
import {Level} from '../../utils/Level';
import ImageButton from '../supporting/ImageButton';

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
      <ImageButton
        onPress={() => {
          setModalProps({
            title: 'Ваши бонусы',
            text: wordBonus!.join(', '),
            pressOk: showBonus, // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
          });
          setShow(true);
        }}
        image={CustomButton.bonus}
        imageStyle={styles.sideButtons}
        badge={true}
        badgeValue={bonusCount}
        badgeStyle={styles.badge}
      />

      <ImageButton
        onPress={handleShowGrid}
        image={CustomButton.grid}
        imageStyle={styles.sideButtons}
      />

      <ImageButton
        onPress={() => {
          Level.clearLevel();
          // navigation.navigate('MainScreen');
          // navigation.goBack();
        }}
        image={CustomButton.reset}
        imageStyle={styles.sideButtons}
      />

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
