import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';



const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal!')}}>
      <View style={styles.loading}>
      <ActivityIndicator
        style={{padding: 10}}
        size={'large'}
      />
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    height: '100%',
    top: 0,
    //left: -25,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //backgroundColor: 'black',
  },
});

export default Loader;