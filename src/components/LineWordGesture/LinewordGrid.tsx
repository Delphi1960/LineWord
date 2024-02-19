import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Text} from 'react-native';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import {LINEWORD_BUTTON_SIZE} from '../../types/constants';
import CustomButton from '../../assets/load.button';
import {LinewordTools} from '../../utils/LinewordTools';

export function LinewordGrid() {
  const [grid] = useMMKVObject<string[][]>('@lineword');

  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [showGrid] = useMMKVBoolean('@showGrid');

  // const [buttonSize, setButtonSize] = useState(LINEWORD_BUTTON_SIZE);

  function openLetter(rowIndex: number, colIndex: number) {
    // const timer = setInterval(() => {
    //   setButtonSize(LINEWORD_BUTTON_SIZE / 3);
    //   clearInterval(timer);
    //   setButtonSize(LINEWORD_BUTTON_SIZE);
    // }, 1000);
    LinewordTools.openLetter(rowIndex, colIndex, solvedGrid!);
  }

  const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: LINEWORD_BUTTON_SIZE,
      height: LINEWORD_BUTTON_SIZE,
      borderWidth: 1,
      // borderColor: 'grey',
      // borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filledCell: {
      backgroundColor: 'transparent', // Цвет заполненной ячейки
    },
    cellText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent', // Background color of your button
    },

    image: {
      width: LINEWORD_BUTTON_SIZE,
      height: LINEWORD_BUTTON_SIZE,
    },
    text: {
      position: 'absolute',
      // top: 10, // Adjust top position of text as needed
      color: 'black', // Text color
      fontSize: 22, // Text size
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.gridContainer}>
      {grid!.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.cell,
                cell !== '#' && styles.filledCell,
                // eslint-disable-next-line react-native/no-inline-styles
                {borderColor: showGrid ? '#b0b0b0' : 'transparent'},
              ]}>
              {showGrid ? (
                <Text
                  style={[
                    styles.cellText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {color: cell !== '#' ? 'black' : '#b0b0b0'},
                  ]}>
                  {cell}
                </Text>
              ) : cell !== '#' ? (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.button}
                  onPress={() => openLetter(rowIndex, colIndex)}
                  disabled={false}>
                  <Image
                    source={
                      solvedGrid![rowIndex][colIndex] === '1'
                        ? CustomButton.buttonYellow
                        : CustomButton.buttonGrey
                    }
                    style={styles.image}
                    resizeMode="stretch"
                  />
                  {solvedGrid![rowIndex][colIndex] === '1' ? (
                    <Text style={styles.text}>{cell}</Text>
                  ) : null}
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
