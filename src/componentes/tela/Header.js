import React, {memo} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import BackButton from '~/componentes/tela/BackButton';
import FiltroButton from '~/componentes/tela/FiltroButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
//import { SafeAreaView } from 'react-native-safe-area-context';

const Header = props => {
  //console.log('Header');
  //console.log(props);

  return (
    <SafeAreaView style={styles.containerHeader}>
      {props.exibirBotaoVoltar === false ? (
        <></>
      ) : (
        <BackButton
          goBack={() =>
            props.telaBotaoVoltar
              ? props.navigation.navigate(telaBotaoVoltar)
              : props.navigation.goBack()
          }
        />
      )}
      <Text style={styles.textoHeader}>{props.children}</Text>
      {props.exibirFiltro === false ? <></> : <FiltroButton {...props} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textoHeader: {
    fontSize: fonts.TextoHeader,
    //color: 'white',
    fontWeight: 'bold',
    //paddingVertical: 15 + getStatusBarHeight(),
    textAlign: 'center',
    color: theme.colors.primary,
    paddingBottom: 15,

    //alignSelf: 'center',
    //justifyContent: 'center',
    //zIndex: 100000,
  },

  containerHeader: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    //overflow: 'hidden', // for hide the not important parts from circle
    //height: 100,
    backgroundColor: 'white',
    //marginVertical:15,
    borderBottomWidth: 1,
    borderColor: theme.colors.terceary,
    marginTop: 10,
  },
});

export default memo(Header);
