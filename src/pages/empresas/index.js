import React, {useState, useEffect, memo} from 'react';
import {View, Button, StyleSheet, Image} from 'react-native';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';

//import styles from './styles';
import {getEmpresasUsuario} from '~/servicos/auth';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {List, ListItem, Text} from 'native-base';
//import Touchable from 'react-native-platform-touchable';

const Empresas = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    setLoading(true);
    getEmpresas();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  async function getEmpresas() {
    let EmpresasAux = await getEmpresasUsuario();
    setEmpresas(EmpresasAux);
    //console.log(EmpresasAux);

    setLoading(false);
  }

  return (
    <Container
      scroll={true}
      tela="Empresas"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          width: '115%',

          padding: 10,
          paddingBottom: 50,
        }}>
        <Text style={styles.TituloText}>Empresas Vinculadas</Text>
        {empresas.map(element => {
          return (
            <View style={styles.Item}>
              <Text style={styles.ItemText}>{element.Empresa_Nome}</Text>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  TituloText: {
    flex: 1,
    color: 'white',
    fontSize: fonts.tipo3,
    textAlign: 'center',
    marginBottom: 15,
    paddingTop: 15,
  },
  Item: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.terceary,
  },
  ItemText: {
    flex: 1,
    color: 'white',
    fontSize: fonts.tipo2,
  },
});

export default memo(Empresas);
