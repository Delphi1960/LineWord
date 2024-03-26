import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import CustomButton from '../../assets/load.button';
import {TextStroke} from '../../utils/TextStroke';

export default function RandomNumberGenerator() {
  const [number, setNumber] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const generateRandomNumber = () => {
      const newNumber = Math.floor(Math.random() * 11) + 2; // Генерация числа от 2 до 12
      setNumber(newNumber);
    };

    if (running) {
      intervalId = setInterval(generateRandomNumber, 50); // Запуск генерации числа каждые 50 мс
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      } // Очистка интервала при размонтировании компонента
    };
  }, [running]);

  const stopGenerating = () => {
    setRunning(false); // Остановка генерации чисел
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {number !== null ? `${number}` : 'Генерация чисел...'}
      </Text>
      {/* <Button
        onPress={stopGenerating}
        icon="exit-run"
        mode="outlined"
        // uppercase={true}
        labelStyle={styles.butText}
        style={styles.butStyle}
        // buttonColor="blue"
        textColor="darkblue">
        Stop
      </Button> */}
      <View style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={stopGenerating}>
          <View style={styles.buttonContainer}>
            <Image
              source={CustomButton.blueButton}
              style={styles.imageButton}
              resizeMode="stretch"
            />
            <TextStroke stroke={0.5} color={'black'}>
              <Text style={styles.textForButton}>Stop</Text>
            </TextStroke>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'yellow',
  },
  text: {fontSize: 34, color: 'red', fontWeight: 'bold'},
  //   butText: {fontSize: 18},
  //   butStyle: {width: 180},
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    justifyContent: 'flex-start',
    margin: 10,
    width: 150,
    height: 50,
  },
  textForButton: {
    // marginTop: 0,
    fontSize: 22,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 5,
  },
});
