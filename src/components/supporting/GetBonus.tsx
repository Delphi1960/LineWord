import React from 'react';
import {StyleSheet} from 'react-native';
import ImageButton from './ImageButton';
import CustomButton from '../../assets/load.button';

type Props = {navigation: any};

export default function GetBonus({navigation}: Props) {
  return (
    <ImageButton
      onPress={() => {
        navigation.navigate('GoogleInterstitial');
      }}
      image={CustomButton.moneyButton}
      imageStyle={styles.tempButtons}
    />
  );
}
const styles = StyleSheet.create({
  tempButtons: {
    justifyContent: 'flex-start',
    width: 50,
    height: 50,
  },
});
