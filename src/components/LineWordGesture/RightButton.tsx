import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomButton from '../../assets/load.button';
import Options from '../supporting/Options';
import GetBonus from '../supporting/GetBonus';
import ExplainTheMeaning from './ExplainTheMeaning';

type Props = {navigation: any};

export default function RightButton({navigation}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [optionsProps, setOptionsProps] = useState({
    title: '',
    // text: '',
    pressOk: () => {},
    // pressCancel: () => {},
  });

  return (
    <>
      <View style={styles.sideButtonsContainer}>
        {/* OPEN BOOK */}
        <ExplainTheMeaning navigation={navigation} />

        <TouchableOpacity
          onPress={() => {
            setOptionsProps({
              title: 'Настройки',
              // text: '',
              pressOk: () => setShowOptions(false), // Передаем функцию showLetter для кнопки "ОК"
            });
            setShowOptions(true);
          }}>
          <Image
            source={CustomButton.setBlue}
            style={styles.sideButtons}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <GetBonus navigation={navigation} />
        <Options
          visible={showOptions}
          title={optionsProps.title}
          // text={optionsProps.text}
          pressOk={optionsProps.pressOk}
          // pressCancel={optionsProps.pressCancel}
        />
        {/* <InfoModal
          visible={showInfo}
          title={infoProps.title}
          text={infoProps.text}
          pressOk={infoProps.pressOk}
          pressCancel={infoProps.pressCancel}
        /> */}
      </View>
      {/* <BonusModal
        visible={showBonus}
        press1={() => {
          setShowBonus(!showBonus);
        }}
        press2={() => {}}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  sideButtonsContainer: {
    justifyContent: 'space-between',
    // backgroundColor: 'lightblue',
    height: '100%',
    zIndex: 2,
  },

  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    margin: 10,
    width: 50,
    height: 50,
  },

  tempButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    // margin: 10,
    width: 80,
    height: 80,
  },

  badge: {position: 'absolute', top: 5, left: 0},
});
