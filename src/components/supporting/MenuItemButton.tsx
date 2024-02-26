import {Divider, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type MenuButtonProps = {
  title: string;
  onPress: () => void;
  value?: string;
  disabled?: boolean;
  divider?: boolean;
  textColor?: string;
};

export const MenuItemButton = ({
  title,
  onPress,
  value = '',
  disabled = false,
  divider = true,
  textColor = '',
}: MenuButtonProps) => {
  const {theme} = useTheme();
  if (textColor === '') {
    textColor = theme.colors.black;
  }
  let textFirst = '';
  let textSecond = '';
  let path = value.indexOf('/');

  if (title.indexOf('|') !== -1) {
    textFirst = title.slice(0, title.indexOf('|'));
    textSecond = title.slice(title.indexOf('|') + 1);
  } else {
    textFirst = title;
  }
  const styles = StyleSheet.create({
    container: {flexDirection: 'row'},
    itemFirst: {fontSize: 16, fontWeight: '900', color: textColor},
    itemValue: {fontSize: 16, fontWeight: '900', color: textColor},
    itemSecond: {fontSize: 14, fontWeight: '600', color: textColor},

    button: {
      justifyContent: 'center',
      height: 'auto',
      minHeight: 50,
      marginHorizontal: 15,
      marginVertical: 5,
    },
    divider: {width: '90%', marginHorizontal: 15, marginVertical: 2},
  });
  return (
    <View>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
            opacity: disabled ? 0.5 : 1,
          },
          styles.button,
        ]}>
        <View style={styles.container}>
          <Text style={styles.itemFirst}>{textFirst} </Text>
          <Text style={styles.itemValue}>{path === -1 ? value : ''}</Text>
        </View>
        {/* путь не умещается в одну строку с textFirst */}
        {path >= 0 ? <Text style={styles.itemValue}>{value}</Text> : ''}

        {textSecond !== '' ? (
          <Text style={styles.itemSecond}>{textSecond}</Text>
        ) : null}
      </Pressable>
      {divider ? (
        <Divider
          color="grey"
          insetType="middle"
          width={1}
          style={styles.divider}
        />
      ) : null}
    </View>
  );
};
