import React, {useEffect} from 'react';
import {View} from 'react-native';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-3940256099942544/5354046379';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   keywords: ['fashion', 'clothing'],
// });

export default function GoogleInterstitial({navigation}: any) {
  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId);

  useEffect(() => {
    if (isLoaded) {
      show();
    }
    // } else {
    //   // No advert ready to show yet
    //   navigation.navigate('LevelPassed');
    // }
  }, [isLoaded, navigation, show]);

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      // navigation.navigate('LevelPassed');
      navigation.goBack();
    }
  }, [isClosed, navigation]);

  return <View />;
}
