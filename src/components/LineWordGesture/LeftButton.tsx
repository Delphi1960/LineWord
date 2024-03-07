import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../../assets/load.button';
import {useMMKVBoolean} from 'react-native-mmkv';
import {Level} from '../../utils/Level';
import ImageButton from '../supporting/ImageButton';
import OpenLetterModal from '../supporting/OpenLetterModal';

type Props = {navigation: any};
export default function LeftButton({navigation}: Props) {
  const [] = useState<string>('');
  const [showGrid, setShowGrid] = useMMKVBoolean('@showGrid');

  const handleShowGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <View style={styles.sideButtonsContainer}>
      <OpenLetterModal navigation={navigation} />

      <ImageButton
        onPress={handleShowGrid}
        image={CustomButton.grid}
        imageStyle={styles.sideButtons}
      />

      <ImageButton
        onPress={() => {
          Level.clearLevel();
          // navigation.navigate('MainScreen');
          // navigation.goBack();
        }}
        image={CustomButton.reset}
        imageStyle={styles.sideButtons}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sideButtonsContainer: {
    justifyContent: 'space-between',
    height: '100%',
    zIndex: 2,
  },
  badge: {position: 'absolute', top: 5, left: 50},
  sideButtons: {
    justifyContent: 'flex-start',
    margin: 10,
    width: 50,
    height: 50,
  },
});
