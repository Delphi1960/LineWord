import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomButton from '../../assets/load.button';
import {LinewordTools} from '../../utils/LinewordTools';
import {useMMKVNumber, useMMKVObject} from 'react-native-mmkv';
import {storage} from '../../utils/storage';
import {LetterPos} from '../../types/data.type';
import Options from '../supporting/Options';
import {Badge} from '@rneui/themed';
import InfoModal from '../supporting/InfoModal';

export default function RightButton() {
  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');
  const [freeHintCount, setFreeHintCount] = useMMKVNumber('@freeHintCount');

  // Show Modal dialog
  const [showInfo, setShowInfo] = useState(false);
  const [infoProps, setInfoProps] = useState({
    title: '',
    text: '',
    pressOk: () => {},
    pressCancel: () => {},
  });
  // Modal Open letter
  const showLetter = () => {
    setShowInfo(false);
    let letterPos: LetterPos[] = LinewordTools.markSolvedLetter(
      grid!,
      solvedGrid!,
    )!;
    storage.set('@lastWordPos', JSON.stringify(letterPos));
    freeHintCount! > 0
      ? setFreeHintCount(freeHintCount! - 1)
      : setFreeHintCount(0);
  };

  const [showOptions, setShowOptions] = useState(false);
  const [optionsProps, setOptionsProps] = useState({
    title: '',
    // text: '',
    pressOk: () => {},
    // pressCancel: () => {},
  });

  return (
    <View style={styles.sideButtonsContainer}>
      <TouchableOpacity
        onPress={() => {
          setInfoProps({
            title: 'Открыть одну букву?',
            text:
              freeHintCount! > 0
                ? `У вас есть ${freeHintCount} бесплатных подсказок`
                : 'У вас нет бесплатных подсказок.\nПридется посмотреть рекламу.',
            pressOk: showLetter, // Передаем функцию showLetter для кнопки "ОК"
            pressCancel: () => setShowInfo(false), // Передаем функцию для кнопки "Отмена"
          });
          setShowInfo(true);
        }}>
        <Image
          source={CustomButton.openWord}
          style={styles.sideButtons}
          resizeMode="contain"
        />
        <Badge
          status="error"
          value={freeHintCount}
          containerStyle={styles.badge}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setOptionsProps({
            title: 'Настройки',
            // text: '',
            pressOk: () => setShowOptions(false), // Передаем функцию showLetter для кнопки "ОК"
            // pressCancel: () => setShowOptions(false), // Передаем функцию для кнопки "Отмена"
          });
          setShowOptions(true);
        }}>
        <Image
          source={CustomButton.setBlue}
          style={styles.sideButtons}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Options
        visible={showOptions}
        title={optionsProps.title}
        // text={optionsProps.text}
        pressOk={optionsProps.pressOk}
        // pressCancel={optionsProps.pressCancel}
      />

      <InfoModal
        visible={showInfo}
        title={infoProps.title}
        text={infoProps.text}
        pressOk={infoProps.pressOk}
        pressCancel={infoProps.pressCancel}
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
    margin: 10,
    width: 50,
    height: 50,
  },
  badge: {position: 'absolute', top: 5, left: -10},
});
