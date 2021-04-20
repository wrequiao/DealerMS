import React, {memo} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const BackButton = ({goBack}) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image
      style={styles.image}
      source={require('~/assets/seta_esquerda.png')}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: '3%',
    zIndex: 10000,
    paddingBottom: 16,
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default memo(BackButton);
