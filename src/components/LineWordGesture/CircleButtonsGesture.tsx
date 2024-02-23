import React, {useEffect, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';
import Svg, {Circle, Polyline} from 'react-native-svg';
import {
  BUTTON_SIZE,
  LINEWORD_CIRCLE_BUTTON_SIZE,
  RADIUS,
} from '../../types/constants';
import {LinewordTools} from '../../utils/LinewordTools';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

import type {CircleButtonType} from '../../types/data.type';
import CircleButton from './CircleButton';
import {storage} from '../../utils/storage';

interface LinePath {
  x: number;
  y: number;
}

// Инициализация кнопок
const setPosButtons = (arrayButtons: string[]): CircleButtonType[] => {
  let circleButtons: CircleButtonType[] = [];

  for (let i = 0; i < arrayButtons.length; i++) {
    const buttonAngle = (i * 360) / arrayButtons.length + 180; // Добавляем смещение на 180 градусов
    const radians = (buttonAngle * Math.PI) / 180;

    const buttonX = Math.sin(radians) * RADIUS;
    const buttonY = Math.cos(radians) * RADIUS;

    const circleButton: CircleButtonType = {
      button: arrayButtons[i],
      position: {
        x: Math.round(buttonX),
        y: Math.round(buttonY),
      },
      index: i,
    };

    circleButtons.push(circleButton);
  }
  return circleButtons;
};

interface CircleButtonRegion {
  pageX: number; //начало холста по Х
  pageY: number; //начало холста по Y
  width: number; //ширина холста
  height: number; //высота холста
}

type LineProps = {
  region: CircleButtonRegion;
  path: LinePath[];
};

const GesturePath = ({region, path}: LineProps) => {
  const points = path
    .map(p => `${p.x + BUTTON_SIZE / 2},${p.y + BUTTON_SIZE / 2}`)
    .join(' ');
  let cX = region.width / 2;
  let cY = region.height / 2 + region.pageY;

  return (
    <Svg
      height={region.height}
      width={region.width}
      viewBox={`${region.pageX} ${region.pageY} ${region.width} ${region.height}`}>
      {/*  */}
      <Circle
        cx={cX}
        cy={cY}
        r={RADIUS}
        fill={'lightblue'}
        fillOpacity={0.3}
        stroke={'yellow'}
        strokeWidth={1}
      />
      {/* <Circle cx={cX} cy={cY} r={5} fill="white" stroke={'blue'} /> */}
      {/*  */}
      <Polyline points={points} fill="none" stroke={'blue'} strokeWidth="5" />
    </Svg>
  );
};

let polyLine: LinePath[] = [];
//

// ===================================================================================
// type Props = {
//   navigation: any;
// };

export default function CircleButtonsGesture() {
  const [lettersButtons] = useMMKVObject<string[]>('@circleButton');

  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [buttonsState] = useMMKVObject<CircleButtonType[]>('@buttonsState');

  const [buttonRegion, setButtonRegion] = useState<CircleButtonRegion>({
    pageX: 0,
    pageY: 0,
    width: 0,
    height: 0,
  });

  const [selLetter, setSelLetter] = useMMKVObject<string[]>('@arrayLetter');
  const [selLetterOrder, setSelLetterOrder] =
    useMMKVObject<number[]>('@arrayOrder');

  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulseButton = () => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    };
    if (buttonsState!.length === 0) {
      storage.set(
        '@buttonsState',
        JSON.stringify(setPosButtons(lettersButtons!)),
      );
    }
    pulseButton();
  }, [animation, buttonsState, lettersButtons]);

  function setPolyLine(arrayInd: number[]): LinePath[] {
    return arrayInd.map(index => ({
      x: buttonsState![index].position.x,
      y: buttonsState![index].position.y,
    }));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addToSequence = (but: CircleButtonType) => {
    addIndexAndLetter(but.index, but.button);
    delIndexAndLetter(but.index /*, but.button*/);
  };

  function addIndexAndLetter(index: number, letter: string) {
    let newIndex: number[] = selLetterOrder!;
    if (!newIndex.includes(index)) {
      newIndex.push(index);
      setSelLetterOrder(newIndex);
      polyLine = setPolyLine(newIndex);

      let newWord: string[] = selLetter!;
      newWord.push(letter);
      setSelLetter(newWord);
    }
  }

  function delIndexAndLetter(index: number /*, letter: string*/) {
    let newIndex: number[] = selLetterOrder!;
    if (newIndex.includes(index)) {
      // Если индекс является предпоследним, удаляем последний элемент из массива индексов
      if (newIndex.indexOf(index) === newIndex.length - 2) {
        newIndex.pop();
        setSelLetterOrder(newIndex);
        polyLine = setPolyLine(newIndex);
      }

      let newWord: string[] = [];
      for (let i = 0; i < newIndex.length; i++) {
        let character = lettersButtons![newIndex[i]];
        newWord.push(character);
      }
      setSelLetter(newWord);
    }
  }

  const searchButton = (
    touchX: number,
    touchY: number,
    butState: CircleButtonType[],
  ) => {
    for (const button of butState) {
      const {x, y} = button.position;

      if (
        touchX >= x &&
        touchX <= x + LINEWORD_CIRCLE_BUTTON_SIZE &&
        touchY >= y &&
        touchY <= y + LINEWORD_CIRCLE_BUTTON_SIZE
      ) {
        return button;
      }
    }
    return null;
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: event => {
          const touchX = Math.round(event.nativeEvent.locationX);
          const touchY = Math.round(event.nativeEvent.locationY);

          let result = searchButton(touchX, touchY, buttonsState!);
          if (result !== null) {
            addToSequence(result);
          }
        },
        onPanResponderMove: event => {
          const touchX = Math.round(event.nativeEvent.pageX);
          const touchY = Math.round(event.nativeEvent.pageY);
          let result = searchButton(touchX, touchY, buttonsState!);
          if (result !== null) {
            addToSequence(result);
          }
        },
        // Сбрасываем последовательность
        onPanResponderRelease: () => {
          // отпустили кнопку - сохраняем, если отгадали  слово
          if (selLetter!.length > 1) {
            const result = LinewordTools.markSolvedWord(
              grid!,
              solvedGrid!,
              selLetter!.join(''),
            );

            result.solved
              ? (storage.set(
                  '@solvedLineword',
                  JSON.stringify(result.solvedGrid),
                ),
                storage.set('@lastWordPos', JSON.stringify(result.wordCoord)))
              : null;
          } else {
            // проверим есть ли такое слово в словаре. Если есть - бонус+
          }
          setSelLetter([]);
          setSelLetterOrder([]);
          polyLine = [];
        },
      }),
    [
      addToSequence,
      buttonsState,
      grid,
      selLetter,
      setSelLetter,
      setSelLetterOrder,
      solvedGrid,
    ],
  );

  return (
    <View
      onLayout={event => {
        event.target.measure((x, y, width, height, pageX, pageY) => {
          // размеры контейнера для холста. Рисовать круг и линии;
          setButtonRegion({
            pageX: pageX,
            pageY: pageY,
            width: width,
            height: height,
          });
        });
      }}
      style={[styles.circleContainer]}
      {...panResponder.panHandlers}>
      {/* кнопки слева */}
      <LeftButton />

      <View style={styles.svg}>
        <GesturePath region={buttonRegion} path={polyLine} />
      </View>

      {/* // КРУГОВЫЕ КНОПКИ ================================================*/}
      <Animated.View style={{transform: [{scale: animation}]}}>
        <CircleButton buttons={buttonsState!} />
      </Animated.View>

      {/* кнопки справа */}
      <RightButton />
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: RADIUS * 2 + LINEWORD_CIRCLE_BUTTON_SIZE + 20,
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  image: {
    width: LINEWORD_CIRCLE_BUTTON_SIZE, // Set the width of your image
    height: LINEWORD_CIRCLE_BUTTON_SIZE, // Set the height of your image
  },
  svg: {position: 'absolute', zIndex: 0},
});
