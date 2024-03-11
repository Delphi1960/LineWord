import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
// import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

type Props = {};

export default function GoogleReklama({}: Props) {
  return (
    <View style={styles.google}>
      <BannerAd
        size={BannerAdSize.BANNER}
        // unitId="ca-app-pub-5224710872008842/7230499971"
        // unitId="ca-app-pub-3940256099942544/6300978111"

        unitId="ca-app-pub-3940256099942544/9214589741"
        onAdLoaded={() => {
          //  console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          // console.error('Advert failed to load: ', error);
          console.log('Advert failed to load: ', error);
        }}
      />
      {/* <Text>Рекламный баннер</Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  google: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
});
