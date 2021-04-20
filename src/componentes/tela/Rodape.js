import React, {memo} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {theme} from '~/core/theme';
import BackButton from '~/componentes/tela/BackButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {DrawerActions} from '@react-navigation/native';
import {hp, wp} from '~/core/utils';

const Rodape = props => {
  function _onPerfilPress() {
    props.navigation.navigate('DadosUsuario');
  }
  function _onFluxoPress() {
    return true;
  }
  function _onHomePress() {
    props.navigation.navigate('Home');
  }
  function _onEstoquePress() {
    props.navigation.navigate('EstoqueListagem');
  }
  function _onAlterarEmpresaPress() {
    props.navigation.openDrawer();
  }

  return (
    <View style={styles.containerRodape}>
      <Touchable
        style={{...styles.ItemRodape}}
        hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
        activeOpacity={0.5}
        onPress={_onPerfilPress}>
        <Image
          style={{...styles.ImageItem}}
          source={require('~/assets/menu_perfil.jpeg')}
        />
      </Touchable>
      {false ? (
        <Touchable
          style={{...styles.ItemRodape}}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={_onFluxoPress}>
          <Image
            style={{...styles.ImageItem}}
            source={require('~/assets/menu_fluxos.jpeg')}
          />
        </Touchable>
      ) : (
        <></>
      )}

      <Touchable
        style={{...styles.ItemRodape}}
        hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
        activeOpacity={0.5}
        onPress={_onHomePress}>
        <Image
          style={{...styles.ImageItem}}
          source={require('~/assets/menu_home.jpeg')}
        />
      </Touchable>
      {false ? (
        <Touchable
          style={{...styles.ItemRodape}}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={_onEstoquePress}>
          <Image
            style={{...styles.ImageItem}}
            source={require('~/assets/menu_estoque.jpeg')}
          />
        </Touchable>
      ) : (
        <></>
      )}

      <Touchable
        style={{...styles.ItemRodape}}
        hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
        activeOpacity={0.5}
        onPress={_onAlterarEmpresaPress}>
        <Image
          style={{...styles.ImageItem}}
          source={require('~/assets/menu_alterar_empresa.jpeg')}
        />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRodape: {
    position: 'absolute',
    flex: 0.1,
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopWidth: 2,
    borderColor: '#f0f0f0',
  },
  ItemRodape: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: wp(10),
  },
  ImageItem: {
    width: wp(10),
    height: hp(5),
    padding: 5,
  },
});

export default memo(Rodape);
