import React, {Component} from 'react';
import {View, WebView, Alert, ActivityIndicator} from 'react-native';
import styles from './styles';

export default function Loading({tam}) {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        style={{padding: 10}}
        size={tam == null ? 'large' : tam}
      />
    </View>
  );
}
