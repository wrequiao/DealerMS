import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const FiltroButton = ({funcaoFiltro}) => (
  <Touchable
    style={styles.container}
    hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
    activeOpacity={0.5}
    onPress={funcaoFiltro}>
    <Image style={styles.image} source={require('~/assets/fltro.jpg')} />
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: '3%',
    zIndex: 10000,
    paddingBottom: 13,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default memo(FiltroButton);
