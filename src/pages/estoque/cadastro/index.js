import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, Image, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
//import {} from '~/core/utils';

import stylesGeral from '~/styles';
//import styles from './styles';
import {getEstoqueVeiculos} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';
import Button from '~/componentes/tela/Button';

import Carousel from '~/componentes/carousel/Carousel'
import Slider from '~/componentes/carousel/Slider'
import ImageElement from '~/componentes/carousel/ImageElement'

const EstoqueCadastro = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [Veiculo, setVeiculo] = useState({});
  const [Veiculo_Opcionais, setVeiculo_Opcionais] = useState([]);
  const [Veiculo_Imagens, setVeiculo_Imagens] = useState([]);

  useEffect(() => {
    carregarEstoque();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);
/////////
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  state = { 
    modalVisible: false,
    //modalImage: Veiculo_Imagens[0].Imagem,
    images: [
      Veiculo_Imagens
    ]
  }
///////////

  const styles = StyleSheet.create({
    viewBase: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      alignSelf: 'flex-start',
      width: '100%',
    },
    viewTexto: {
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'grey',
      position: 'relative',
      marginBottom: 15,
    },

    label: {fontSize: fonts.tipo3, color: 'grey', marginRight: 5},
    textoDados: {
      fontSize: fonts.tipo2,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    viewBaseTexto: {
      //flex: 1, 
     // flexDirection: 'row',
      borderWidth: 1,
      //position: 'relative',
      //flexDirection: 'row',
      //alignItems: 'flex-start',
      //alignContent: 'flex-start',
      alignSelf: 'flex-start',
      //alignItems: 'center',
      //justifyContent: 'center'
     // width: '100%',
      textAlign: 'center',
      //borderColor: '#FF5722',
    },
    cardPrecoItem: {
        borderWidth: 1,
    },
    cardPreco: {
      flex: 1, 
      //backgroundColor: '#ccc',
      //borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

  async function carregarEstoque() {
    if (loading) return;
    setLoading(true);

    let VeiculoCodigoAux = await AsyncStorage.getItem(
      '@Veiculo_Codigo_Estoque',
    );

    let PesquisarImagemCheck = await AsyncStorage.getItem(
      '@PesquisarImagemCheck',
    );

    console.log('PesquisarImagemCheck')
    console.log(PesquisarImagemCheck)

    let Retorno = await getEstoqueVeiculos(null, VeiculoCodigoAux, true, true);

    //console.log('\n', Retorno);
    let EstoqueAux;

    if (Retorno) {
      if (Retorno.Veiculo_Opcionais) {
        EstoqueAux = Retorno.DadosGerais;
        setVeiculo_Opcionais(Retorno.Veiculo_Opcionais);
      } else {
        EstoqueAux = Retorno;
      }

      if (Retorno.Veiculo_Imagens){
        console.log('contador imagens detalhes')
        console.log(Retorno.Veiculo_Imagens.length)
        setVeiculo_Imagens(Retorno.Veiculo_Imagens);
      } else {
        EstoqueAux = Retorno;
      }

      if (EstoqueAux) setVeiculo(EstoqueAux[0]);
    }


    setLoading(false);
  }

  async function _onImagePressed(){
    console.log('clicou...')
  }

  async function _onReservarPressed() {
    Keyboard.dismiss();

    await AsyncStorage.setItem(
      '@Veiculo_Codigo_Reserva',
      Veiculo.Veiculo_Codigo.toString(),
    );
    props.navigation.navigate('ReservaVeiculos');
  }

  return (
    <Container
      scroll={true}
      tela="Consulta Veículo"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
     
     
      <View style={{...styles.cardPreco}}>
        <Text style={{...styles.cardPrecoItem, fontSize: fonts.tipo5, fontWeight: 'bold'}}>
          {Veiculo.Veiculo_Preco ? 'R$ ' + Veiculo.Veiculo_Preco : <></>}
        </Text>
      </View>
      
 {/*
      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Preco:</Text>
        </View>
        <View style={{...styles.viewTexto}}>
          <Text style={{...styles.textoDados, fontSize: fonts.tipo4}}>
          {Veiculo.Veiculo_Preco ? 'R$ ' + Veiculo.Veiculo_Preco : <></>}
          </Text>
        </View>
      </View>
*/
}
      {Veiculo_Imagens.length > 0 ?  (   
          <View >
            <Slider images={Veiculo_Imagens}/>
          </View>
          ) : 
          (<></>)
      }
     

      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Modelo:</Text>
        </View>
        <View style={{...styles.viewTexto}}>
          <Text style={{...styles.textoDados, fontSize: fonts.tipo4}}>
            {Veiculo.Veiculo_Modelo_Desc}
          </Text>
        </View>
      </View>

      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Chassi:</Text>
        </View>
        <View style={{...styles.viewTexto}}>
          <Text style={styles.textoDados}>{Veiculo.Veiculo_Chassi}</Text>
        </View>
      </View>
      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Placa:</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>{Veiculo.Veiculo_Placa}</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>{Veiculo.Veiculo_Marca}</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewBase}>
        <View style={stylesGeral.ViewPadrao}>
          <View>
            <Text style={{...styles.label, textAlign: 'center'}}>Comb.</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>{Veiculo.Veiculo_Combustivel}</Text>
          </View>
        </View>
        <View style={stylesGeral.ViewPadrao}>
          <View>
            <Text style={{...styles.label, textAlign: 'center'}}>KM</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>{Veiculo.Veiculo_KM}</Text>
          </View>
        </View>
        <View style={stylesGeral.ViewPadrao}>
          <View>
            <Text style={{...styles.label, textAlign: 'center'}}>Ano</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>{Veiculo.Veiculo_Ano_Modelo}</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewBase}>
        <View style={stylesGeral.ViewPadrao}>
          <View>
            <Text style={{...styles.label, textAlign: 'center'}}>Cor</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>{Veiculo.Veiculo_Cor}</Text>
          </View>
        </View>
        <View style={stylesGeral.ViewPadrao}>
          <View>
            <Text style={{...styles.label, textAlign: 'center'}}>Dias</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>
              {Veiculo.Veiculo_Dias_Estoque}
            </Text>
          </View>
        </View>
        <View style={stylesGeral.ViewPadrao}>
          <View>
            <Text style={{...styles.label, textAlign: 'center'}}>Tipo</Text>
          </View>
          <View style={{...styles.viewTexto}}>
            <Text style={styles.textoDados}>
              {Veiculo.Veiculo_Estoque_Tipo}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Empresa:</Text>
        </View>
        <View style={{...styles.viewTexto}}>
          <Text style={styles.textoDados}>{Veiculo.Veiculo_Empresa_Nome}</Text>
        </View>
      </View>
      <View style={{...styles.viewBase, flexDirection: 'column'}}>
        <View>
          <Text style={styles.label}>Descrição do veículo:</Text>
        </View>
        <View
          style={{
            width: '100%',
            padding: 15,
            backgroundColor: theme.colors.terceary,
            minHeight: 150,
          }}>
          <Text style={{...styles.textoDados, textAlign: 'auto'}}>
            {Veiculo.Veiculo_Descricao}
          </Text>
        </View>
      </View>
      {Veiculo_Opcionais ? (
        <View
          style={{
            ...styles.viewBase,
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <View>
            <Text style={styles.label}>Opcionais:</Text>
          </View>

          {Veiculo_Opcionais.map(element => {
            return (
              <View
                style={{
                  width: '100%',
                  marginTop: 15,
                }}>
                <Text style={{...styles.textoDados, textAlign: 'auto'}}>
                  {element.Opcional_Codigo}
                </Text>
                <Text style={{...styles.textoDados, textAlign: 'auto'}}>
                  {element.Opcional_Descricao}
                </Text>
                <Text style={{...styles.textoDados, textAlign: 'auto'}}>
                  {element.Opcional_Valor}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <></>
      )}
      <View style={{...stylesGeral.ViewCamposCadastro, marginTop: 15}}>
        <Button mode="contained" onPress={_onReservarPressed}>
          Reservar
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  Padrao: {
    flex: 1,
  },
});

export default memo(EstoqueCadastro);
