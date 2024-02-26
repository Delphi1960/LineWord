import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {Text} from 'react-native';
import {useMMKVBoolean, useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {LINEWORD_BUTTON_SIZE} from '../../types/constants';
import CustomButton from '../../assets/load.button';
import {LinewordTools} from '../../utils/LinewordTools';
import {LetterPos} from '../../types/data.type';

export function LinewordGrid() {
  const [grid] = useMMKVObject<string[][]>('@lineword');

  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [showGrid] = useMMKVBoolean('@showGrid');

  const [buttonAnimation] = useState(
    grid!.map(row => row.map(() => new Animated.Value(1))),
  );
  const [lastWord] = useMMKVString('@lastWord');
  const [coordWord, setCoordWord] = useMMKVObject<LetterPos[]>('@lastWordPos');

  function openLetter(rowIndex: number, colIndex: number) {
    LinewordTools.openLetter(rowIndex, colIndex, solvedGrid!);
  }

  const pulseButton = (rowIndex: number, colIndex: number) => {
    Animated.sequence([
      Animated.timing(buttonAnimation[rowIndex][colIndex], {
        // используем анимацию для конкретной кнопки в гриде
        toValue: 0.8,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonAnimation[rowIndex][colIndex], {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonAnimation[rowIndex][colIndex], {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (coordWord !== undefined) {
      if (coordWord !== null) {
        coordWord!.forEach((coord, index) => {
          setTimeout(() => {
            pulseButton(coord.y, coord.x);
          }, 200 * index);
        });
        setCoordWord([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordWord, lastWord, solvedGrid]);

  const styles = StyleSheet.create({
    gridContainer: {
      // flex: 1,
      // flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: LINEWORD_BUTTON_SIZE,
      height: LINEWORD_BUTTON_SIZE,
      borderWidth: 1,
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
      top: 4, // Adjust top position of text as needed
      marginLeft: 10,
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
                  onPress={() => {
                    pulseButton(rowIndex, colIndex);
                    openLetter(rowIndex, colIndex);
                  }}
                  disabled={false}>
                  <Animated.View
                    style={[
                      {
                        transform: [
                          {scale: buttonAnimation[rowIndex][colIndex]},
                        ],
                      },
                    ]}>
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
                  </Animated.View>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
