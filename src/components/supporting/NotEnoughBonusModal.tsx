import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomImage from '../../assets/image';
import CustomButton from '../../assets/load.button';
import {TextStroke} from '../../utils/TextStroke';
import {getNotEnoughBonusStyles} from '../../style/NotEnoughBonusStyles';

type DlgProps = {
  visible: boolean;
  press1?: () => void;
  press2?: () => void;
};

export default function NotEnoughBonusModal({
  visible,
  press1,
  press2,
}: DlgProps) {
  const styles = getNotEnoughBonusStyles();

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.mainContainer}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.mainImage}
              source={CustomImage.notEnoughBonus}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.indent}>
              <Text style={[styles.text, {color: 'red'}]}>
                {'Недостаточно бонусов \n для выполнения операции'}
              </Text>
              <View style={styles.indent1} />
              <Text style={[styles.text, {color: 'black'}]}>
                {
                  'Вы можете получить бонусы \n пройдя уровни.\n Или просмотрев рекламу'
                }
              </Text>
              <View style={styles.indent1} />
              <View style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={press1}>
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
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={press2}>
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
        </View>
      </View>
    </Modal>
  );
}
