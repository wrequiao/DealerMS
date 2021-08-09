import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {signOut} from '~/servicos/auth';
import {wp, hp} from '~/core/utils';

export const CustomMenu = (props, UsuarioDesc) => {
  const {navigation} = props;

  async function __onPressSair() {
    await signOut();
    navigation.navigate('Auth');
  }

  return (
    <SafeAreaView {...props} style={styles.containerMenu}>
      <ScrollView>
        <View style={styles.itemMenu}>
          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => props.navigation.closeDrawer()}>
            <Image
              source={require('~/assets/x_fechar.png')}
              style={{width: wp(5), height: wp(5)}}
            />
          </Touchable>
          <View
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
              marginBottom: hp(3),
            }}>
            <Image
              source={require('~/assets/avatar.png')}
              style={{
                width: 50,
                height: 50,
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            />
            <Text style={{...styles.textItemMenu, fontSize: fonts.tipo2}}>
              {UsuarioDesc}
            </Text>
          </View>
        </View>
        <View style={styles.itemMenu}>
          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('Home')}>
            <Text style={styles.textItemMenu}>Home</Text>
          </Touchable>
        </View>
        <View style={styles.itemMenu}>
          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('DadosUsuario')}>
            <Text style={styles.textItemMenu}>Dados do Usuário</Text>
          </Touchable>
        </View>
        <View style={styles.itemMenu}>
          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('Dashboard')}>
            <Text style={styles.textItemMenu}>Dashboard</Text>
          </Touchable>
        </View>
        <View style={styles.itemMenu}>
          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => __onPressSair()}>
            <Text style={styles.textItemMenu}>Sair</Text>
          </Touchable>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', right: 0, bottom: 0, padding: 20}}>
        <Text style={{...styles.textItemMenu, fontSize: fonts.tipo1}}>
          Versão 1.0.15
        </Text>
      </View>
    </SafeAreaView>
  );
};
//<DrawerNavigatorItems {...props} />

const styles = StyleSheet.create({
  containerMenu: {
    //width: '100%',
    //height: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    //backgroundColor: 'black',
  },
  itemMenu: {
    flex: 1,
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3.5),
    color: 'white',
    borderColor: 'white',
    borderBottomWidth: 1,
    fontSize: 22,
  },
  textItemMenu: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
