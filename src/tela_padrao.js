import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import Button from '~/../componentes/tela/Button';
import TextInput from '~/componentes/tela/TextInput';

import {
  dataValidator,
  nameValidator,
  ajustarFormatoDadosCombo,
} from '~/core/utils';

import stylesGeral from '~/../styles';
//import styles from './styles';
//import {} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';

const TelaPadrao = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);

  useEffect(() => {
    //
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const __onChange = async valor => {
    return true;
  };

  return (
    <Container
      tela="Minha tela padrão"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={true}>
      <View style={{}}>
        <Text>Minha tela pdrão</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  Padrao: {
    flex: 1,
  },
});

export default memo(TelaPadrao);
