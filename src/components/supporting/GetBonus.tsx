import React from 'react';
import {StyleSheet} from 'react-native';
import ImageButton from './ImageButton';
import CustomButton from '../../assets/load.button';
import {useMMKVNumber} from 'react-native-mmkv';

type Props = {navigation: any};

export default function GetBonus({navigation}: Props) {
  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');
  return (
    <ImageButton
      onPress={() => {
        setBonusCount(bonusCount! + 2);
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
    // backgroundColor: 'lightblue',
    // margin: 10,
    width: 50,
    height: 50,
  },
});
