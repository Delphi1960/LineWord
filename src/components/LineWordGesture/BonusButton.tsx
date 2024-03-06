import React, {useState} from 'react';
import ImageButton from '../supporting/ImageButton';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextStroke} from '../../utils/TextStroke';
import CustomButton from '../../assets/load.button';
import {useMMKVNumber} from 'react-native-mmkv';
import FastImage from 'react-native-fast-image';
import CustomImage from '../../assets/image';

type Props = {navigation: any};

export default function BonusButton({navigation}: Props) {
  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ImageButton
        onPress={() => {
          setShowModal(true);
        }}
        image={CustomButton.bonus}
        imageStyle={styles.sideButtons}
        badge={true}
        badgeValue={bonusCount}
        badgeStyle={styles.badge}
      />

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.mainContainer}>
          <View style={styles.modal}>
            <View style={styles.imageContainer}>
              <FastImage
                style={styles.mainImage}
                source={CustomImage.bonusPanel}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.indent}>
                <View style={{marginTop: -50, alignItems: 'center'}}>
                  <TextStroke stroke={0.7} color={'black'}>
                    <Text style={styles.text}>{bonusCount}</Text>
                  </TextStroke>
                  <View style={styles.indent1} />
                </View>

                <View style={styles.indent} />
                <Text>1 бонус - открыть случайную букву</Text>
                <Text>2 бонуса - открыть любую букву</Text>

                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setBonusCount(bonusCount! + 2);
                      navigation.navigate('GoogleInterstitial');
                    }}>
                    <View style={styles.buttonContainer}>
                      <Image
                        source={CustomButton.greenButton}
                        style={styles.imageButton}
                        resizeMode="stretch"
                      />
                      <TextStroke stroke={0.5} color={'black'}>
                        <Text style={styles.textForButton}>
                          Получить бонусы
                        </Text>
                      </TextStroke>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.button}
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
                        <Text style={styles.textForButton}>
                          Продолжить игру
                        </Text>
                      </TextStroke>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  badge: {position: 'absolute', top: 5, left: 50},
  sideButtons: {
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue',
    margin: 10,
    width: 50,
    height: 50,
  },
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {width: 400, height: 500, position: 'absolute'},

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
    zIndex: 2,
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    justifyContent: 'flex-start',
    width: 200,
    height: 50,
  },
  textForButton: {
    // marginTop: -10,
    fontSize: 20,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },

  text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  indent: {marginTop: 80},
  indent1: {marginTop: 20},
});
