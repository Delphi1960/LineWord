import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import {useMMKVNumber, useMMKVObject} from 'react-native-mmkv';
import CustomButton from '../assets/load.button';
import {LinewordTools} from '../utils/LinewordTools';
import ExplainTheMeaning from '../components/LineWordGesture/ExplainTheMeaning';

// type Props = {navigation: any; goTo: string};

export default function LineHeader({navigation, goTo = ''}: any) {
  const [levelCount] = useMMKVNumber('@levelCount');
  const [bookButton, setBookButton] = useState(false);
  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (LinewordTools.getSolvedWord(grid!, solvedGrid!).length > 0) {
      setBookButton(true);
    }
  }, [grid, solvedGrid]);

  return (
    <View style={styles.header}>
      {goTo !== '' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('MainScreen');
            //   navigation.goBack();
          }}>
          <Icon type="entypo" name="arrow-bold-left" color="yellow" size={30} />
        </TouchableOpacity>
      ) : null}

      {goTo !== '' ? (
        <Text style={styles.text}>Уровень {levelCount}</Text>
      ) : null}

      {bookButton ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowModal(true);
            console.log(showModal);
            // navigation.navigate('MainScreen');
            //   navigation.goBack();
          }}>
          <Image
            source={CustomButton.openBook}
            style={styles.sideButtons}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}

      <ExplainTheMeaning showModal={false} />
    </View>
  );
}
const styles = StyleSheet.create({
  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    width: 40,
    height: 40,
    marginTop: -5,
  },

  header: {
    // flex: 1,
    height: 30,
    width: Dimensions.get('screen').width,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {marginLeft: 20},
  text: {
    alignSelf: 'center',
    marginLeft: 50,
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
