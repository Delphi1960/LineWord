import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomImage from '../../assets/image';
import RollTheDice from './RollTheDice';

type DlgProps = {
  visible: boolean;
  press1: () => void;
};

export default function RollTheDiceModal({visible, press1}: DlgProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.mainContainer}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.mainImage}
              source={CustomImage.panelGetBonus}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.modalContainer}>
              <RollTheDice press1={press1} />
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

  modalContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
