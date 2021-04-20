import React, {useState, useEffect, memo} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import Touchable from 'react-native-platform-touchable';

//import styles from './styles';
import {getUsuario} from '~/servicos/auth';
import {fonts} from '~/core/fonts';
//import Touchable from 'react-native-platform-touchable';
import {wp, hp} from '~/core/utils';

const DadosUsuario = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [UsuarioDesc, setUsuarioDesc] = useState('');

  useEffect(() => {
    setRefreshing(true);
    getUsuarioDesc();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  async function getUsuarioDesc() {
    let Usuario = await getUsuario();
    setUsuarioDesc(Usuario.Login);
  }

  return (
    <Container
      scroll={true}
      tela="Dados de Usuário"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
      <View
        style={{
          marginTop: -10,
          width: wp(100),
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          padding: 40,
          backgroundColor: theme.colors.primary,
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
        <Text
          style={{
            ...styles.textItemMenu,
            color: 'white',
            textAlign: 'center',
          }}>
          {UsuarioDesc}
        </Text>
      </View>
      <View style={styles.itemMenu}>
        <Touchable
          style={styles.TouchableStyle}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Empresas')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}>
            <Text style={{...styles.textItemMenu, flex: 4}}>Empresas</Text>
            <Image
              source={require('~/assets/seta_direita.jpg')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                flex: 1,
                marginTop: 3,
                marginRight: 25,
              }}
            />
          </View>
        </Touchable>
      </View>
      <View style={styles.itemMenu}>
        <Touchable
          style={styles.TouchableStyle}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('PerfilAcesso')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}>
            <Text style={{...styles.textItemMenu, flex: 4}}>
              Perfil de Acesso
            </Text>
            <Image
              source={require('~/assets/seta_direita.jpg')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                flex: 1,
                marginTop: 3,
                marginRight: 25,
              }}
            />
          </View>
        </Touchable>
      </View>
      <View style={styles.itemMenu}>
        <Touchable
          style={styles.TouchableStyle}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('CadLinkAcesso')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}>
            <Text style={{...styles.textItemMenu, flex: 4}}>
              Configuração de Link
            </Text>
            <Image
              source={require('~/assets/seta_direita.jpg')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                flex: 1,
                marginTop: 3,
                marginRight: 25,
              }}
            />
          </View>
        </Touchable>
      </View>
    </Container>
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
    paddingBottom: 20,
    //backgroundColor: 'black',
  },
  itemMenu: {
    flex: 1,
    padding: 15,

    borderColor: theme.colors.terceary,
    borderBottomWidth: 1,
    fontSize: 22,
    width: '115%',
  },
  textItemMenu: {
    color: 'grey',
    fontSize: fonts.tipo4,
    fontWeight: 'bold',
    //textAlign: 'center',
  },
  TouchableStyle: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
});

export default memo(DadosUsuario);
