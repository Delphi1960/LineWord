import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {useMMKVNumber, useMMKVObject, useMMKVString} from 'react-native-mmkv';
import CustomButton from '../../assets/load.button';
import {LINEWORD_BUTTON_SIZE} from '../../types/constants';
import {TextStroke} from '../../utils/TextStroke';
import InfoModal from '../supporting/InfoModal';

export default function OpenTheWord() {
  const [selLetter] = useMMKVObject<string[]>('@arrayLetter');

  const [unusedWords] = useMMKVObject<string[]>('@wordUnused');

  const [wordBonus, setWordBonus] = useMMKVObject<string[]>('@wordBonus');

  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');
  const [freeHintCount, setFreeHintCount] = useMMKVNumber('@freeHintCount');

  const [currentWord] = useMMKVString('@currentWord');

  const [showHint, setShowHint] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    };

    if (selLetter?.length === 0) {
      if (
        unusedWords!.includes(currentWord!) &&
        !wordBonus!.includes(currentWord!)
      ) {
        setShowHint(false);
        let bonus: string[] = wordBonus!;
        bonus.push(currentWord!);
        setWordBonus(bonus);
        let numberBonusCount = bonusCount! + 1;
        setBonusCount(numberBonusCount);
      } else if (wordBonus!.includes(currentWord!)) {
        setShowHint(true);
        fadeIn();
      }
    }
  }, [currentWord, selLetter?.length]);

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

  useEffect(() => {
    if (Number(bonusCount) === 10) {
      setModalProps({
        title: 'Поздравляем!',
        text: 'Вы получили бесплатную подсказку.',
        pressOk: showBonus, // Передаем функцию showLetter для кнопки "ОК"
        pressCancel: () => setShow(false), // Передаем функцию для кнопки "Отмена"
      });
      setShow(true);
      setFreeHintCount(freeHintCount! + 1);
      setBonusCount(0);
      setWordBonus([]);
    }
  }, [
    bonusCount,
    freeHintCount,
    setBonusCount,
    setFreeHintCount,
    setWordBonus,
    wordBonus,
  ]);

  return (
    <View style={styles.textContainer}>
      {showHint ? (
        <Animated.View style={[styles.hintView, {opacity: fadeAnim}]}>
          <TextStroke stroke={0.7} color={'black'}>
            <Text style={styles.hintText}>Это слово уже есть!</Text>
          </TextStroke>
        </Animated.View>
      ) : (
        selLetter!.map((item, ind) => (
          <TouchableOpacity key={ind} style={styles.button} disabled={true}>
            <Image
              source={CustomButton.buttonGrey}
              style={styles.image}
              resizeMode="stretch"
            />
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))
      )}

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
  textContainer: {
    // flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: Dimensions.get('screen').width,
    // borderWidth: 1,
  },
  hintView: {alignItems: 'center'},
  hintText: {fontSize: 16, fontWeight: '700', color: 'yellow'},
  image: {
    width: LINEWORD_BUTTON_SIZE, // Set the width of your image
    height: LINEWORD_BUTTON_SIZE, // Set the height of your image
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Background color of your button
  },
  text: {
    position: 'absolute',
    top: 8, // Adjust top position of text as needed
    color: 'black', // Text color
    fontSize: 22, // Text size
    fontWeight: '700',
  },
});
