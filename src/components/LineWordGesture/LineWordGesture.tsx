import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import OpenTheWord from './OpenTheWord';
import {LinewordGrid} from './LinewordGrid';
import CircleButtonsGesture from './CircleButtonsGesture';
import CustomImage from '../../assets/image';
import {useMMKVBoolean, useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {Button} from 'react-native';
import {MAX_LEVEL} from '../../types/constants';

export default function LineWordGesture({navigation}: any) {
  const [showGrid] = useMMKVBoolean('@showGrid');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');
  const [chapter, setСhapter] = useMMKVString('@chapter');
  const [level, setLevel] = useMMKVString('@level');

  const [label, showLabel] = useState(false);

  const nLevel = Number(level)!;
  const nChapter = Number(chapter)!;

  const isCrosswordSolved = solvedGrid!.every(row =>
    row.every(cell => cell !== '0'),
  );

  useEffect(() => {
    if (isCrosswordSolved) {
      if (nLevel === MAX_LEVEL) {
        setСhapter((nChapter + 1).toString());
        setLevel('1');
      } else {
        setLevel((nLevel + 1).toString());
      }
      showLabel(true);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCrosswordSolved]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={showGrid ? CustomImage.sky : CustomImage.milkPath}
        style={styles.backImage}>
        {label ? (
          <View style={styles.lentaContainer}>
            <Image source={CustomImage.lenta} style={styles.lentaImage} />
          </View>
        ) : (
          <LinewordGrid />
        )}

        {/* <LinewordGrid /> */}

        <OpenTheWord />

        <CircleButtonsGesture />
        <Button
          onPress={() => {
            setLevel('1');
            setСhapter('0');
            navigation.goBack();
          }}
          title="Clear"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  lentaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  lentaImage: {width: 300, height: 100, resizeMode: 'stretch'},
  backImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
