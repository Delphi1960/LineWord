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
import {useMMKVObject, useMMKVString} from 'react-native-mmkv';
import CustomButton from '../../assets/load.button';
import {LINEWORD_BUTTON_SIZE} from '../../types/constants';
import {TextStroke} from '../../utils/TextStroke';

export default function OpenTheWord() {
  const [selLetter] = useMMKVObject<string[]>('@arrayLetter');
  const [wordBonus] = useMMKVObject<string[]>('@wordBonus');
  const [wordUsed] = useMMKVObject<string[]>('@wordUsed');
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
        wordBonus?.includes(currentWord!) ||
        wordUsed?.includes(currentWord!)
      ) {
        setShowHint(true);
        fadeIn();
      }
    }
  }, [currentWord, fadeAnim, selLetter?.length, wordBonus, wordUsed]);

  return (
    <View style={styles.textContainer}>
      {showHint ? (
        <Animated.View style={[{alignItems: 'center'}, {opacity: fadeAnim}]}>
          <TextStroke stroke={0.7} color={'black'}>
            <Text style={{fontSize: 16, fontWeight: '700', color: 'yellow'}}>
              Это слово уже есть!
            </Text>
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
