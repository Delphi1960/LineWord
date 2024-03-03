import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomImage from '../../assets/image';
import CustomButton from '../../assets/load.button';

type DlgProps = {
  visible: boolean;
  press1?: () => void;
  press2?: () => void;
};

export default function BonusModal({visible, press1, press2}: DlgProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.mainContainer}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.mainImage}
              source={CustomImage.bonusPanel}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{marginTop: 150}}>
              <View style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={press1}>
                  <View style={styles.buttonContainer}>
                    <Image
                      source={CustomButton.greenButton}
                      style={styles.imageButton}
                      resizeMode="stretch"
                    />
                    <Text style={styles.textForButton}>Забрать бонусы</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={press2}>
                  <View style={styles.buttonContainer}>
                    <Image
                      source={CustomButton.blueButton}
                      style={styles.imageButton}
                      resizeMode="stretch"
                    />
                    <Text style={styles.textForButton}>Удвоить бонусы</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
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
  chapterStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue',
    margin: 0,
    textAlign: 'center',
  },
  progress: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  backGif: {zIndex: 0},
  fastImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignSelf: 'center',
    zIndex: 0,
  },
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
    margin: 10,
    width: 200,
    height: 50,
  },
  textForButton: {
    marginTop: -50,
    fontSize: 22,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },

  butText: {fontSize: 16},
  butStyle: {width: 150},
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  salut: {
    width: 500,
    height: 500,
    alignSelf: 'center',
    position: 'relative',
    zIndex: 10,
  },
});
