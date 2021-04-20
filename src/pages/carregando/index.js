import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
//import styles from './styles';

export default class Carregando extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingBottom: 40,
        }}>
        <Image
          style={{width: 280, height: 280}}
          source={require('~/assets/carregamento_app.png')}
        />
      </View>
    );
  }
}
