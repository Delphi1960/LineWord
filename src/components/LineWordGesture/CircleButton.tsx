import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import CustomButton from '../../assets/load.button';
import {LINEWORD_CIRCLE_BUTTON_SIZE, RADIUS} from '../../types/constants';
import {useMMKVObject} from 'react-native-mmkv';
import {storage} from '../../utils/storage';

import type {CircleButtonType} from '../../types/data.type';
import CenterButton from './CenterButton';

type Props = {buttons: CircleButtonType[]};

const getButtonPosition = (
  index: number,
  radius: number,
  numberOfButtons: number,
) => {
  const angle = (index * 360) / numberOfButtons + 180; // Добавляем смещение на 180 градусов
  const radians = (angle * Math.PI) / 180;

  const x = Math.sin(radians) * radius; // радиус окружности - в данном случае, radius
  const y = Math.cos(radians) * radius;

  return {transform: [{translateX: x}, {translateY: y}]};
};

export default function CircleButton({buttons}: Props) {
  const [circleRadius] = useState<number>(RADIUS);

  const [selLetterOrder] = useMMKVObject<number[]>('@arrayOrder');

  // ОБНОВИТЬ КООРДИНАТЫ КНОПОК
  const handleLayout = (index: number, pageX: number, pageY: number) => {
    const newButtonState: CircleButtonType[] = JSON.parse(
      storage.getString('@buttonsState')!,
    );
    newButtonState[index] = {
      button: buttons[index].button,
      index: index,
      position: {
        x: Math.round(pageX),
        y: Math.round(pageY),
      },
    };
    storage.set('@buttonsState', JSON.stringify(newButtonState));
  };

  return (
    <View style={styles.circle}>
      {buttons.map((char, index) => (
        <TouchableOpacity
          key={index}
          disabled={true}
          onLayout={event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              handleLayout(index, pageX, pageY);
            });
          }}
          //
          style={[
            styles.button,
            getButtonPosition(index, circleRadius, buttons.length),
          ]}>
          <Image
            source={
              selLetterOrder?.includes(index)
                ? CustomButton.blueOn
                : CustomButton.buttonOff
            }
            style={[styles.imageBt, styles.image]}
            resizeMode="contain"
          />

          <Text style={[styles.buttonText]}>{char.button}</Text>
        </TouchableOpacity>
      ))}
      {/* ЦЕНТРАЛЬНАЯ КНОПКА */}
      <CenterButton buttons={buttons} />
    </View>
  );
}
const styles = StyleSheet.create({
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    zIndex: 0,
  },

  button: {
    width: LINEWORD_CIRCLE_BUTTON_SIZE,
    height: LINEWORD_CIRCLE_BUTTON_SIZE,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'yellow',
  },
  image: {
    width: LINEWORD_CIRCLE_BUTTON_SIZE, // Set the width of your image
    height: LINEWORD_CIRCLE_BUTTON_SIZE, // Set the height of your image
  },
  imageBt: {
    position: 'absolute',
    // backgroundColor: 'red',
  },
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red', // Цвет центральной кнопки
    justifyContent: 'center',
    alignItems: 'center',
  },
});
