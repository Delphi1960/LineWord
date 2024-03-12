/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';
import {useMMKVBoolean, useMMKVNumber} from 'react-native-mmkv';
import Sound from 'react-native-sound';

const soundList = new Sound(require('../../assets/sound/addBonus.mp3'));
Sound.setCategory('Playback', true);

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-3940256099942544/5354046379';

export default function GoogleInterstitial({navigation}: any) {
  const [bonusCount, setBonusCount] = useMMKVNumber('@bonusCount');
  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId);
  const [soundButton] = useMMKVBoolean('@sound');

  useEffect(() => {
    if (isLoaded) {
      show();
    }
  }, [isLoaded, navigation, show]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      setBonusCount(bonusCount! + 2);
      navigation.goBack();
      soundButton ? soundList.play() : null;
    }
  }, [isClosed]);

  return <View />;
}
