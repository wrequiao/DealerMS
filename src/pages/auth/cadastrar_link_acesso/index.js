import React, {memo, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import Background from '~/componentes/tela/Background';
import Logo from '~/componentes/tela/Logo';
import HeaderLogin from '~/componentes/tela/HeaderLogin';
import Button from '~/componentes/tela/Button';
import TextInput from '~/componentes/tela/TextInput';
import BackButton from '~/componentes/tela/BackButton';
import Global from '~/config/Global';
import Loading from '~/componentes/loading';
import Touchable from 'react-native-platform-touchable';

import {openURL} from '~/core/utils';

import {
  validarDominioAcesso,
  cadastrarDominioAcesso,
  getDominioAcessoOriginal,
} from '~/servicos/auth';

import styles from './styles';
import {fonts} from '~/core/fonts';

const CadLinkAcesso = ({navigation}) => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [linkAcesso, setDominioAcesso] = useState({value: '', error: ''});
  const [inicio, setInicio] = useState(true);

  const abrirLinkSuporte = function() {
    let URL = 'https://dealerms.com.br/suporte';

    openURL(URL, 'Nenhuma opção de navegador instalada');
  };

  const abrirLinkContratarServicos = function() {
    let URL = 'https://dealerms.com.br/comercial';

    openURL(URL, 'Nenhuma opção de navegador instalada');
  };

  const _onCadastrarPressed = async () => {
    Keyboard.dismiss();
    setRefreshing(true);
    setLoading(true);

    const dominioValido = await validarDominioAcesso(linkAcesso.value);

    if (!dominioValido) {
      setDominioAcesso({
        ...linkAcesso,
        error:
          'O endereço informado não pertence a uma empresa ativa. Clique abaixo para entrar em contato com o suporte.',
      });

      setLoading(false);
      return false;
    }

    //console.log('linkAcesso.value : ' + linkAcesso.value);
    await cadastrarDominioAcesso(linkAcesso.value);

    setLoading(false);
    navigation.goBack();
  };

  useEffect(() => {
    setRefreshing(true);
    getDominioAcessoAux();
  }, [inicio]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  async function getDominioAcessoAux() {
    let dominioAcessoAux = await getDominioAcessoOriginal();
    setDominioAcesso({value: dominioAcessoAux, error: ''});
  }

  return (
    <Background scroll={true} loading={loading || refreshing}>
      <Logo />

      <HeaderLogin style={{textAlign: 'justify'}}>
        Link Site Dealernet Workflow
      </HeaderLogin>

      <TextInput
        label="Domínio"
        returnKeyType="done"
        value={linkAcesso.value}
        onChangeText={text => setDominioAcesso({value: text, error: ''})}
        error={!!linkAcesso.error}
        errorText={linkAcesso.error}
        autoCapitalize="none"
      />

      <Touchable
        style={{
          flexDirection: 'row',
          padding: 10,
          paddingBottom: 0,
          alignSelf: 'flex-end',
        }}
        hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
        activeOpacity={0.5}
        onPress={() => abrirLinkSuporte()}>
        <Text
          style={{
            fontSize: fonts.tipo1,
            padding: 5,
          }}>
          Preciso de ajuda
        </Text>
      </Touchable>

      <Button
        mode="contained"
        onPress={_onCadastrarPressed}
        style={styles.button}>
        Cadastrar
      </Button>

      <Touchable
        style={{flexDirection: 'row', padding: 10}}
        hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
        activeOpacity={0.5}
        onPress={() => abrirLinkContratarServicos()}>
        <Text
          style={{
            fontSize: fonts.tipo1,
            textDecorationLine: 'underline',
            padding: 5,
          }}>
          Quero contratar o DealerMS para minha empresa
        </Text>
      </Touchable>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(CadLinkAcesso);
