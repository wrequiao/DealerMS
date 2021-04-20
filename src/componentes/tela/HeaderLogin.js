import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '~/core/theme';
import BackButton from '~/componentes/tela/BackButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const HeaderLogin = props => {
  //console.log('Header');
  //console.log(props);

  return (
    <View style={styles.containerHeader}>
      <Text style={styles.textoHeader}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textoHeader: {
    fontSize: 26,
    //color: 'white',
    fontWeight: 'bold',
    //paddingVertical: 15 + getStatusBarHeight(),
    textAlign: 'center',
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    justifyContent: 'center',
    //zIndex: 100000,
  },

  containerHeader: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden', // for hide the not important parts from circle
    minHeight: 100,
  },
});

export default memo(HeaderLogin);
