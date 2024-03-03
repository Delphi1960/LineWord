import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';
import GifImage from '../assets/gif.image';

export default function GoogleInterstitial({navigation}: any) {
  const [seconds, setSeconds] = useState(10); // Инициализация состояния для отслеживания оставшихся секунд

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(timer);
          // navigation.navigate('LevelPassed');
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000); // Обновление каждую секунду

    return () => clearInterval(timer); // Очистка таймера при размонтировании компонента
  }, [navigation]);

  return (
    <View style={styles.imageContainer}>
      <FastImage
        style={[styles.salut]}
        source={GifImage.pig1}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.txt}>
        {`За бонусы нужно платить!\nОсталось ${seconds} секунд`}
      </Text>
      <View style={styles.exitButton}>
        <Button
          disabled={!(seconds === 0)}
          icon="exit-run"
          mode="outlined"
          // uppercase={true}
          labelStyle={styles.butText}
          style={styles.butStyle}
          buttonColor="yellow"
          textColor="darkblue"
          onPress={() => {
            navigation.navigate('LevelPassed');
          }}>
          Назад
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  butText: {fontSize: 16},
  butStyle: {width: 150},
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  salut: {
    width: 300,
    height: 500,
    alignSelf: 'center',
    position: 'relative',
    zIndex: 10,
  },
  txt: {fontSize: 22, color: 'red', fontWeight: 'bold', textAlign: 'center'},
});
