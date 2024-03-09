import React, {useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useMMKVObject} from 'react-native-mmkv';
import CustomButton from '../../assets/load.button';
import CustomImage from '../../assets/image';
import {TextStroke} from '../../utils/TextStroke';
import {WordListType} from '../../types/data.type';
import {LinewordTools} from '../../utils/LinewordTools';

type Props = {showModal: boolean};

export default function ExplainTheMeaning({showModal}: Props) {
  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');

  const [solvedWords, setSolvedWords] = useState<WordListType[]>([]);

  // const pressBookButton = () => {
  //   setShowModal(true);

  //   setSolvedWords(LinewordTools.getSolvedWord(grid!, solvedGrid!));
  // };

  console.log({showModal});

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modal}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.mainImage}
            source={CustomImage.panel}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.panelContainer}>
            <ScrollView style={styles.scrollView}>
              {solvedWords.map((item, index) => (
                <View key={index}>
                  <Text style={styles.wordStyle}>{item.word} -</Text>
                  <Text style={styles.hintStyle}>{item.hint}</Text>
                  <View style={styles.indent} />
                </View>
              ))}
            </ScrollView>

            <View style={styles.indent} />

            <TouchableOpacity
              onPress={() => {
                // setShowModal(false);
              }}>
              <View style={styles.buttonContainer}>
                <Image
                  source={CustomButton.blueButton}
                  style={styles.imageButton}
                  resizeMode="stretch"
                />
                <TextStroke stroke={0.5} color={'black'}>
                  <Text style={styles.textForButton}>Продолжить игру</Text>
                </TextStroke>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    margin: 10,
    width: 50,
    height: 50,
  },

  modal: {
    // position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {width: 280, height: 280},
  mainImage: {width: 400, height: 500, position: 'absolute'},

  panelContainer: {alignItems: 'center', marginTop: 95, marginLeft: -15},

  textBonus: {fontSize: 34, color: 'red', fontWeight: 'bold'},
  textWidth: {width: 280},

  textForButton: {
    fontSize: 18,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    justifyContent: 'flex-start',
    width: 200,
    height: 40,
  },

  wordStyle: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  hintStyle: {
    marginTop: -5,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },

  textPanel: {fontSize: 14, color: 'black'},

  indent: {margin: 5},
});
