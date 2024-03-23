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
import {WordListType} from '../types/data.type';
import {WordsList} from '../assets/data/combinedArray';
import ExplainTheMeaning from '../components/LineWordGesture/ExplainTheMeaning';

// type Props = {navigation: any; goTo: string};

export default function LineHeader({navigation, goTo = ''}: any) {
  const [levelCount] = useMMKVNumber('@levelCount');
  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [wordBonus] = useMMKVObject<string[]>('@wordBonus');

  const [bookButton, setBookButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [solvedWords, setSolvedWords] = useState<WordListType[]>([]);
  const [unUsedWords, setUnUsedWords] = useState<WordListType[]>([]);

  useEffect(() => {
    setSolvedWords(LinewordTools.getSolvedWord(grid!, solvedGrid!));
    solvedWords.length > 0 ? setBookButton(true) : setBookButton(false);
    if (wordBonus!.length > 0) {
      setUnUsedWords(WordsList.filter(item => wordBonus!.includes(item.word)));
    }
    // console.log(unUsedWords);
  }, [grid, solvedGrid, solvedWords.length, wordBonus]);

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
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowModal(true);
              // console.log(showModal);
              // navigation.navigate('MainScreen');
              //   navigation.goBack();
            }}>
            <Image
              source={CustomButton.openBook}
              style={styles.sideButtons}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <ExplainTheMeaning
            visible={showModal}
            text={solvedWords}
            wordBonus={unUsedWords}
            pressOk={() => {
              setShowModal(false);
            }}
          />
        </View>
      ) : null}
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
