import {Button, CheckBox, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {Modal, View} from 'react-native';
import {getStyles} from '../../style/MyModalStyle';

type DlgProps = {
  visible: boolean;
  title?: string;
  text?: string;
  pressOk?: () => void;
  pressCancel?: () => void;
};

export default function Options({
  visible,
  title,
  text,
  pressOk,
  pressCancel,
}: DlgProps) {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>

          <View>
            <CheckBox checked disabled title="Звук кнопок" />
            <CheckBox checked disabled title="Мелодия слова" />
          </View>

          <View style={styles.buttonStyleArea}>
            {pressCancel !== undefined ? (
              <Button
                title="Нет"
                buttonStyle={styles.buttonStyle}
                onPress={pressCancel}
                type="solid"
                //   titleStyle={{color: theme.colors.black}}
              />
            ) : null}
            <Button
              title="Да"
              buttonStyle={styles.buttonStyle}
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
