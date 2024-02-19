import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';
import CustomButton from '../../assets/load.button';
import {LINEWORD_BUTTON_SIZE} from '../../types/constants';

export default function OpenTheWord() {
  const [selLetter] = useMMKVObject<string[]>('@arrayLetter');
  return (
    <View style={styles.textContainer}>
      {selLetter!.map((item, ind) => (
        <TouchableOpacity key={ind} style={styles.button} disabled={true}>
          <Image
            source={CustomButton.buttonGrey}
            style={styles.image}
            resizeMode="stretch"
          />
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  textContainer: {
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
