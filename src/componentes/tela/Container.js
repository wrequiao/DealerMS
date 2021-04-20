import React, {memo} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  SafeAreaView
} from 'react-native';
import Header from './Header';
import Rodape from './Rodape';
import Loading from '~/componentes/loading';
import Touchable from 'react-native-platform-touchable';
import {wp, hp} from '~/core/utils';

const Container = props => {
  //console.log('Container');
  //console.log(props.children);
  //console.log(exibirHeader);
  const {
    scroll,
    children,
    tela,
    loading,
    exibirHeader,
    exibirBotaoAdd,
    functionBotaoAdd,
  } = props;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', width: '100%'}}>
      {loading && <Loading />}
      {exibirHeader !== false && <Header {...props}>{tela}</Header>}

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1, width: '100%', marginHorizontal: 0}}
        keyboardVerticalOffset={hp(10)}>
        <View style={{...styles.container, marginHorizontal: 0}}>
          {scroll ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingBottom: hp(3),
                  flex: 1,
                  width: '100%',
                  marginHorizontal: 0,
                }}>
                {children}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                paddingBottom: hp(3),
                flex: 1,
                width: '100%',
                marginHorizontal: 0,
              }}>
              {children}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      {exibirBotaoAdd === true ? (
        <View
          style={{
            position: 'absolute',
            bottom: 70,
            //right: 10,
            width: 100,
            zIndex: 88888,
            alignSelf: 'center',
          }}>
          <Touchable
            style={{
              flexDirection: 'row',
              paddingHorizontal: 5,
              paddingBottom: 5,
            }}
            hitSlop={{top: 2, bottom: 2, left: 2, right: 2}}
            activeOpacity={0.5}
            onPress={() => functionBotaoAdd()}>
            <Image
              style={{width: 80, height: 80, paddingTop: 5}}
              source={require('~/assets/add.png')}
            />
          </Touchable>
        </View>
      ) : (
        <></>
      )}
      <Rodape {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: '100%',
    minHeight: 400,
    backgroundColor: 'white',
    //justifyContent: 'center',
  },
});

export default memo(Container);
