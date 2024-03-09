import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';
import CustomButton from '../../assets/load.button';
import {TextStroke} from '../../utils/TextStroke';
import {useMMKVNumber} from 'react-native-mmkv';

type Props = {press1: () => void};

export default function RollTheDice({press1}: Props) {
  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');
  const [number, setNumber] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const generateRandomNumber = () => {
      const newNumber = Math.floor(Math.random() * 11) + 2; // Генерация числа от 2 до 12
      setNumber(newNumber);
    };

    if (running) {
      intervalId = setInterval(generateRandomNumber, 50); // Запуск генерации числа каждые 50 мс
    }

    const stopGenerating = () => {
      setRunning(false); // Остановка генерации чисел
    };

    const timeoutId = setTimeout(stopGenerating, 5000); // Вызов функции stopGenerating через 5 секунд

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      } // Очистка интервала при размонтировании компонента

      clearTimeout(timeoutId); // Очистка таймера при размонтировании компонента
    };
  }, [running]);

  return (
    <View style={styles.containerFastImage}>
      <View style={styles.container}>
        {!running && number === null ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRunning(true);
            }}>
            <View style={[styles.buttonContainer, styles.buttonContainer1]}>
              <Image
                source={CustomButton.blueButtonSmall}
                style={styles.imageButton}
                resizeMode="stretch"
              />

              <TextStroke stroke={0.5} color={'black'}>
                <Text style={styles.textForButton}>Start</Text>
              </TextStroke>
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={[styles.buttonContainer, styles.buttonContainer2]}>
          {running ? (
            <FastImage
              style={styles.fastImage}
              source={GifImage.RollTheDice}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : number !== null ? (
            <View>
              <Text style={styles.text}>{number}</Text>
              <View style={styles.space} />
              <Text
                style={[
                  styles.text,
                  styles.fontSize,
                ]}>{`Вы заработали ${number} бонусов`}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.space} />
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setBonusCount(bonusCount! + number!);
            press1();
          }}>
          <View style={styles.buttonContainer}>
            <Image
              source={CustomButton.blueButtonSmall}
              style={styles.imageButton}
              resizeMode="stretch"
            />
            <TextStroke stroke={0.5} color={'black'}>
              <Text style={styles.textForButton}>В игру</Text>
            </TextStroke>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerFastImage: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
    height: 280,
    width: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 100,
  },
  fastImage: {
    width: 100,
    height: 100,
    marginTop: -45,
    marginLeft: -10,
  },
  text: {
    textAlign: 'center',
    fontSize: 60,
    color: 'red',
    fontWeight: 'bold',
    marginLeft: -13,
  },
  fontSize: {fontSize: 16},
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer1: {marginLeft: -13, marginTop: 40},
  buttonContainer2: {marginTop: 60},
  imageButton: {
    justifyContent: 'center',
    margin: 10,
    width: 80,
    height: 35,
  },
  textForButton: {
    fontSize: 16,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },
  space: {height: 100},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
