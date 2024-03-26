import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import {useMMKVNumber, useMMKVObject, useMMKVString} from 'react-native-mmkv';
import CustomButton from '../../assets/load.button';
import {LINEWORD_BUTTON_SIZE} from '../../types/constants';
import {TextStroke} from '../../utils/TextStroke';
import {Level} from '../../utils/Level';

export default function OpenTheWord() {
  const [selLetter] = useMMKVObject<string[]>('@arrayLetter');

  const [unusedWords] = useMMKVObject<string[]>('@wordUnused');

  const [wordBonus, setWordBonus] = useMMKVObject<string[]>('@wordBonus');

  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');

  const [currentWord, setCurrentWord] = useMMKVString('@currentWord');

  const [showHint, setShowHint] = useState(false);

  const level = Level.getLevel();

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
        // console.log(currentWord);
        setShowHint(true);
        fadeIn();
        setCurrentWord('');
      }
    } else {
      setShowHint(false);
    }
  }, [
    bonusCount,
    currentWord,
    fadeAnim,
    selLetter?.length,
    setBonusCount,
    setCurrentWord,
    setWordBonus,
    unusedWords,
    wordBonus,
  ]);

  return (
    <View style={styles.textContainer}>
      {showHint ? (
        <Animated.View style={[styles.hintView, {opacity: fadeAnim}]}>
          {/* <TextStroke stroke={0.7} color={'black'}> */}
          <Text style={styles.hintText}>Слово уже добавлено!</Text>
          {/* </TextStroke> */}
        </Animated.View>
      ) : (
        selLetter!.map((item, ind) => (
          <TouchableOpacity key={ind} style={styles.button} disabled={true}>
            <Image
              source={CustomButton.buttonBlue}
              style={styles.image}
              resizeMode="stretch"
            />
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))
      )}
      {selLetter?.length === 0 &&
      level.currentChapter === 0 &&
      level.currentLevel === 0 ? (
        <TextStroke stroke={0.7} color={'black'}>
          <Text style={styles.firstText}>
            {'Для выбора слова, соедините \n буквы движением пальца'}
          </Text>
        </TextStroke>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    // width: 200,
  },
  hintView: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  hintText: {fontSize: 18, fontWeight: '700', color: 'yellow'},
  image: {
    width: LINEWORD_BUTTON_SIZE, // Set the width of your image
    height: LINEWORD_BUTTON_SIZE, // Set the height of your image
    margin: 1,
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
  firstText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'lightyellow',
    fontWeight: '500',
  },
});
