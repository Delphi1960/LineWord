import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

type Props = {};

export default function GoogleReklama({}: Props) {
  return (
    <View style={styles.google}>
      {/* <BannerAd
        size={BannerAdSize.BANNER}
        unitId="ca-app-pub-3940256099942544/6300978111"
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          console.error('Advert failed to load: ', error);
        }}
      /> */}
      <Text>Рекламный баннер</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  google: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: 50,
  },
});
