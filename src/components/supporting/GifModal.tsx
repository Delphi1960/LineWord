import {Button, useTheme} from '@rneui/themed';
import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {getStyles} from '../../style/MyModalStyle';
import FastImage from 'react-native-fast-image';
import GifImage from '../../assets/gif.image';

type DlgProps = {
  visible: boolean;
  title?: string;
  text?: string;
  pressOk?: () => void;
  pressCancel?: () => void;
};

export default function GifModal({visible, title, text, pressOk}: DlgProps) {
  const {theme} = useTheme();

  const styles = getStyles(theme);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={style.containerFastImage}>
            <FastImage
              style={style.fastImage}
              source={GifImage.lastScreen}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={styles.buttonStyleArea}>
            {/* <Button
              title={t('settings.no')}
              buttonStyle={styles.buttonStyle}
              onPress={pressCancel}
              type="clear"
              titleStyle={{color: theme.colors.black}}
            /> */}
            <Button
              title="Ура, ПОБЕДА!"
              buttonStyle={styles.buttonStyle}
              titleStyle={style.titleStyle}
              onPress={pressOk}
              type="solid"
              //   titleStyle={{color: theme.colors.black}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
const style = StyleSheet.create({
  containerFastImage: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  titleStyle: {color: 'yellow'},
  fastImage: {width: 200, height: 200},
});
