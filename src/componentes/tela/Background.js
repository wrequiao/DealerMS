import React, {memo} from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Loading from '~/componentes/loading';

const Background = ({children, ...props}) => (
  <ImageBackground
    source={require('~/assets/tela/background_dot.png')}
    resizeMode="repeat"
    style={{...styles.background}}>
    {props.scroll ? (
      <ScrollView style={{marginTop: '10%'}}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
    ) : (
      <KeyboardAvoidingView
        style={{...styles.container, marginBottom: 70}}
        behavior="padding">
        {children}
      </KeyboardAvoidingView>
    )}
    {props.loading ? <Loading /> : <></>}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 25,
    width: '100%',
    //maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default memo(Background);
