import {StyleSheet} from 'react-native';

const getStyles = (theme: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modal: {
      margin: 30,
      backgroundColor: 'white',
      // backgroundColor:
      //   theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.white,
      borderRadius: 20,
      padding: 20,
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
    buttonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 50,
      minWidth: 50,
      marginHorizontal: 20,
      marginVertical: 10,
      borderColor: 'black',
      borderRadius: 15,
      // borderColor: theme.colors.black,
    },
    buttonStyleArea: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    title: {
      // color: theme.colors.black,
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    text: {
      // color: theme.colors.black,
      color: 'black',
      fontSize: 16,
    },
    radioGroupe: {
      justifyContent: 'flex-start',
      marginLeft: 0,
    },
    radio: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    containerCheck: {
      backgroundColor: 'transparent',
      minHeight: 50,
      minWidth: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -2,
    },
    // txtLabel: {color: theme.colors.black, marginLeft: 10},
    txtLabel: {color: 'black', marginLeft: 10},
    iconStyle: {marginRight: 10},
    btnStyle: {
      height: 50,
      width: 100,
    },
    checkBoxStyle: {alignSelf: 'flex-start'},
  });

export {getStyles};
