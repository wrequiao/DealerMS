import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Data = props => (
  <>
    <TextInput
      textContentType="none"
      autoCompleteType="off"
      keyboardType="numbers-and-punctuation"
      {...props}
    />
  </>
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

export default memo(Data);
