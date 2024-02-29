import {Icon} from '@rneui/themed';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useMMKVNumber} from 'react-native-mmkv';

// type Props = {navigation: any; goTo: string};

export default function LineHeader({navigation, goTo}: any) {
  const [levelCount] = useMMKVNumber('@levelCount');

  return (
    <View style={styles.header}>
      {goTo !== '' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('MainScreen');
            //   navigation.goBack();
          }}>
          <Icon type="entypo" name="arrow-bold-left" color="yellow" size={30} />
        </TouchableOpacity>
      ) : null}

      {goTo !== '' ? (
        <Text style={styles.text}>Уровень {levelCount}</Text>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    // flex: 1,
    height: 30,
    width: Dimensions.get('screen').width,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {marginLeft: 20},
  text: {
    alignSelf: 'center',
    marginLeft: 50,
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
