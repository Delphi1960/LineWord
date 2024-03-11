import {Dimensions, StyleSheet} from 'react-native';

const getLevelPassedStyles = () =>
  StyleSheet.create({
    mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},

    modal: {
      position: 'absolute',
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
    mainImage: {width: 400, height: 500, position: 'absolute'},
    chapterStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'blue',
      margin: 0,
      textAlign: 'center',
    },
    progress: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: -30,
    },

    backGif: {zIndex: 0},
    fastImage: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      alignSelf: 'center',
      zIndex: 0,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      // margin: 5,
      zIndex: 2,
    },

    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageButton: {
      justifyContent: 'flex-start',
      margin: 10,
      width: 200,
      height: 50,
    },
    textForButton: {
      // marginTop: -50,
      fontSize: 18,
      fontWeight: '500',
      color: 'yellow',
      textAlign: 'center',
    },

    butText: {fontSize: 16},
    butStyle: {width: 150},
    exitButton: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 50,
    },
    salut: {
      width: 500,
      height: 500,
      alignSelf: 'center',
      position: 'relative',
      zIndex: 10,
    },
    indent: {marginTop: 50},
    top: {
      position: 'absolute',
      top: 0,
    },
    bannerTop: {
      position: 'absolute',
      top: 0,
      marginTop: 30,
    },
    bannerBottom: {
      position: 'absolute',
      bottom: 0,
    },
  });

export {getLevelPassedStyles};
