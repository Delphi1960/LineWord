import {StyleSheet} from 'react-native';

const getNotEnoughBonusStyles = () =>
  StyleSheet.create({
    mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},

    modal: {
      // position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    imageContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainImage: {width: 300, height: 400, position: 'absolute'},

    button: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      margin: 5,
      zIndex: 2,
    },

    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageButton: {
      justifyContent: 'flex-start',
      width: 200,
      height: 50,
    },
    textForButton: {
      // marginTop: -40,
      fontSize: 18,
      fontWeight: '500',
      color: 'yellow',
      textAlign: 'center',
    },

    text: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },

    indent: {marginTop: 80},
    indent1: {marginTop: 20},
  });
export {getNotEnoughBonusStyles};
