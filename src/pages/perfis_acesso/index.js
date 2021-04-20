import React, {useState, useEffect, memo} from 'react';
import {View, Button, StyleSheet, Image} from 'react-native';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';

//import styles from './styles';
import {getPerfisUsuario} from '~/servicos/auth';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {List, ListItem, Text} from 'native-base';
//import Touchable from 'react-native-platform-touchable';
import {wp, hp} from '~/core/utils';

const PerfisAcesso = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [perfis, setPerfis] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPerfis();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  async function getPerfis() {
    let PerfisAux = await getPerfisUsuario();
    setPerfis(PerfisAux);
    //console.log(PerfisAux);

    setLoading(false);
  }

  return (
    <Container
      scroll={true}
      tela="Perfis de Acesso"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          width: wp(100),

          paddingBottom: 50,
        }}>
        <Text style={styles.TituloText}>Perfis Vinculados</Text>
        {perfis.map(element => {
          return (
            <View style={styles.Item}>
              <Text style={styles.ItemText}>
                {element.PerfilAcesso_Descricao}
              </Text>
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

export default memo(PerfisAcesso);
