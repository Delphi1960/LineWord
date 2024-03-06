import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../assets/load.button';
import {TextStroke} from '../../utils/TextStroke';

type Props = {
  width: number;
  height: number;
  nLevel: number;
  maxLevel: number;
  text: string;
};

export default function ProgressBar({
  width,
  height,
  nLevel,
  maxLevel,
  text,
}: Props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 30,
    },
    image: {
      width: width + 10,
      height: height,
      resizeMode: 'stretch',
      margin: 5,
    },
    progress: {
      width: (width / maxLevel) * nLevel,
      height: height / 2 + 5,
      resizeMode: 'stretch',
      marginTop: -height,
      marginLeft: 10,
    },
    text: {alignItems: 'center', margin: 20},
    textStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      color: 'yellow',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <TextStroke stroke={0.7} color={'black'}>
          <Text style={styles.textStyle}>{text}</Text>
        </TextStroke>
      </View>
      <View>
        <Image source={CustomButton.progress1} style={styles.image} />
        <Image source={CustomButton.progress2} style={styles.progress} />
      </View>
    </View>
  );
}
