import React, {Component, useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  Button,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Container from '~/componentes/tela/Container';
import RNPickerSelect from 'react-native-picker-select';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import {Chevron} from 'react-native-shapes';
import styles from './styles';
import Global from '~/config/Global';
import {
  getEmpresasUsuario,
  getEmpresasUsuarioSelecionada,
  setEmpresasUsuarioSelecionada,
} from '~/servicos/auth';
import {ajustarFormatoDadosComboEmpresas} from '~/servicos/auxiliar';
import {wp, hp} from '~/core/utils';

//Retorna a página inicial

const Home = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);

  const [comboEmpresas, setComboEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(0);

  useEffect(() => {
    setLoading(true);
    carregarComboEmpresas();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const carregarComboEmpresas = async () => {
    let EmpresasUsuario = await getEmpresasUsuario();
    let EmpresaSelecionadaAux = await getEmpresasUsuarioSelecionada();

    let comboFormatado = ajustarFormatoDadosComboEmpresas(EmpresasUsuario);
    setComboEmpresas(comboFormatado);
    setEmpresaSelecionada(EmpresaSelecionadaAux);
    //console.log('comboFormatado : ' + comboFormatado[0]);

    setLoading(false);
  };

  const __onEmpresasChange = async itemValue => {
    setRefreshing(true);

    setEmpresaSelecionada(itemValue);
    await setEmpresasUsuarioSelecionada(itemValue);
  };

  function _onFluxosPress() {
    return true;
  }
  function _onEstoquePress() {
    props.navigation.navigate('EstoqueListagem');
  }
  function _onReservasPress() {
    props.navigation.navigate('ReservaVeiculos');
  }
  function _onAtendimentoPress() {
    //console.log('_onAtendimentoPress');
    props.navigation.navigate('AtendimentosListagem');
  }
  function _onChatPress() {
    return true;
  }
  function _onSuportePress() {
    return true;
  }

  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
    },
  });

  return (
    <Container loading={loading || refreshing} {...props} exibirHeader={false}>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
      <StatusBar backgroundColor="#0098ED"/>
      <View
        style={{
          marginBottom: 20,
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
        }}>
        <RNPickerSelect
          placeholder={{
            label: 'All...',
            color: 'black',
            fontSize: 18,
          }}
          style={pickerSelectStyles}
          Icon={() => {
            return <Chevron size={2} color="gray" />;
          }}
          useNativeAndroidPickerStyle={false}
          value={empresaSelecionada}
          onValueChange={itemValue => {
            __onEmpresasChange(itemValue);
          }}
          items={comboEmpresas}
        />
      </View>

      <View
        style={{
          ...styles.view,
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Touchable
          style={{flexDirection: 'row', padding: 10}}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={_onFluxosPress}>
          <Image
            style={{width: wp(40), height: wp(40), paddingTop: 5}}
            source={require('~/assets/fluxos.jpeg')}
          />
        </Touchable>

        <Touchable
          style={{flexDirection: 'row', padding: 10}}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={_onEstoquePress}>
          <Image
            style={{width: wp(40), height: wp(40), paddingTop: 5}}
            source={require('~/assets/estoque.jpeg')}
          />
        </Touchable>
      </View>

      <View
        style={{
          ...styles.view,
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Touchable
          style={{flexDirection: 'row', padding: 10}}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={_onReservasPress}>
          <Image
            style={{width: wp(40), height: wp(40), paddingTop: 5}}
            source={require('~/assets/reservas.jpeg')}
          />
        </Touchable>

        <Touchable
          style={{flexDirection: 'row', padding: 10}}
          hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
          activeOpacity={0.5}
          onPress={_onAtendimentoPress}>
          <Image
            style={{width: wp(40), height: wp(40), paddingTop: 5}}
            source={require('~/assets/atendimento.jpeg')}
          />
        </Touchable>
      </View>
      {false && (
        <View style={styles.view}>
          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={_onFluxosPress}>
            <Image
              style={{width: wp(40), height: wp(40), paddingTop: 5}}
              source={require('~/assets/chat.jpeg')}
            />
          </Touchable>

          <Touchable
            style={{flexDirection: 'row', padding: 10}}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={_onEstoquePress}>
            <Image
              style={{width: wp(40), height: wp(40), paddingTop: 5}}
              source={require('~/assets/suporte.jpeg')}
            />
          </Touchable>
        </View>
      )}
    </Container>
  );
};

export default memo(Home);
