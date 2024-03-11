import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../assets/load.button';
import {Badge} from '@rneui/base';
import {useMMKVNumber, useMMKVObject} from 'react-native-mmkv';
import FastImage from 'react-native-fast-image';
import CustomImage from '../../assets/image';
import {TextStroke} from '../../utils/TextStroke';
import {LetterPos} from '../../types/data.type';
import {LinewordTools} from '../../utils/LinewordTools';
import {storage} from '../../utils/storage';

type Props = {navigation: any};

export default function OpenLetterModal({navigation}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [grid] = useMMKVObject<string[][]>('@lineword');
  const [solvedGrid] = useMMKVObject<string[][]>('@solvedLineword');
  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');

  // Modal Open letter
  const showLetter = () => {
    setShowModal(false);
    let letterPos: LetterPos[] = LinewordTools.markSolvedLetter(
      grid!,
      solvedGrid!,
    )!;
    storage.set('@lastWordPos', JSON.stringify(letterPos));
    bonusCount! > 0 ? setBonusCount(bonusCount! - 1) : setBonusCount(0);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}>
        <Image
          source={CustomButton.bonus}
          style={styles.sideButtons}
          resizeMode="contain"
        />
        <Badge
          status="error"
          value={bonusCount}
          containerStyle={styles.badge}
        />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.mainImage}
              source={CustomImage.myBonus}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={styles.panelContainer}>
              <Text style={styles.textBonus}>{bonusCount}</Text>
              <View style={styles.indent} />
              <View style={styles.indent} />
              <View style={styles.indent} />

              <View style={styles.textWidth}>
                <Text
                  style={[
                    styles.textPanel,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {color: bonusCount! > 0 ? 'black' : 'grey'},
                  ]}>
                  1. Вы можете открыть случайную букву, использовав 1 бонус
                </Text>

                {/* <View style={styles.indent} /> */}

                <TouchableOpacity
                  disabled={bonusCount! > 0 ? false : true}
                  onPress={() => {
                    showLetter();
                  }}>
                  <View style={styles.buttonContainer}>
                    <Image
                      source={CustomButton.blueButton}
                      style={styles.imageButton}
                      resizeMode="stretch"
                    />
                    <TextStroke stroke={0.5} color={'black'}>
                      <Text style={styles.textForButton}>Случайная буква</Text>
                    </TextStroke>
                  </View>
                </TouchableOpacity>

                {/* <View style={styles.indent} /> */}

                <Text style={styles.textPanel}>
                  2. Вы можете открыть любую букву, использовав 2 бонуса
                </Text>
                <Text style={styles.textPanel}>
                  Чтобы открыть любую букву, нажмите на интересующую Вас клетку
                </Text>
                <Text style={styles.textPanel}>
                  3. Если бонусов недостаточно - получите бонусы за просмотр
                  рекламы.
                </Text>
              </View>

              <View style={styles.indent} />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GoogleInterstitial');
                }}>
                <View style={styles.buttonContainer}>
                  <Image
                    source={CustomButton.greenButton}
                    style={styles.imageButton}
                    resizeMode="stretch"
                  />
                  <TextStroke stroke={0.5} color={'black'}>
                    <Text style={styles.textForButton}>Получить бонусы</Text>
                  </TextStroke>
                </View>
              </TouchableOpacity>

              <View style={styles.indent} />

              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
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
    </>
  );
}
const styles = StyleSheet.create({
  badge: {position: 'absolute', top: 5, left: 50},

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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  imageContainer: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainImage: {width: 400, height: 510, position: 'absolute'},

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
  textPanel: {fontSize: 14, color: 'black'},

  indent: {margin: 5},
});
