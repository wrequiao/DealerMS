import React, {useState, useEffect, memo} from 'react';
import {Modal, View, Text, StyleSheet, Image, Keyboard, TouchableOpacity} from 'react-native';
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
import { TouchableHighlight } from 'react-native';

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
const [modalVisible, setModalVisible] = useState(false);
const [modalImage, setModalImage] = useState(null);
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
        padding: 5,
    },
    cardPreco: {
      flex: 1, 
      //backgroundColor: '#ccc',
      //borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    viewTextoModelo: {
      //paddingHorizontal: 10,
      borderColor: 'grey',
      position: 'relative',
      marginBottom: 15,
    },

    ModalView: {
      //backgroundColor: '#000',
      //paddingTop: 30,
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
    },
    ModalImage: {
      width: '100%',
      height: '100%',
    },
    BtnSecondary: {
      width: '100%',
      height: '100%',
    },

  });

function toggle(){
  console.log('toggle')
  setModalVisible(!modalVisible);
};

function ImagePress(val){
  console.log('imagepress')
  setModalImage(val);
  toggle();
}

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
        setVeiculo_Imagens(Retorno.Veiculo_Imagens);
      } else {
        EstoqueAux = Retorno;
      }

      if (EstoqueAux) setVeiculo(EstoqueAux[0]);
    }

    setLoading(false);
  }

  async function _onReservarPressed() {
    Keyboard.dismiss();

    await AsyncStorage.setItem(
      '@Veiculo_Codigo_Reserva',
      Veiculo.Veiculo_Codigo.toString(),
    );
    props.navigation.navigate('ReservaVeiculos');
  }

  async function _ontenhoInteressePressed() {
    Keyboard.dismiss();

    await AsyncStorage.setItem(
      '@Veiculo_Codigo_Proposta',
      Veiculo.Veiculo_Codigo.toString(),
    );
    
    props.navigation.navigate('PropostaVeiculos');
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
      
      {Veiculo_Imagens.length > 0 ?  (   
          <View >
            <Slider images={Veiculo_Imagens} onImagePress={ImagePress}/>
          </View>
          ) : 
          (<></>)
      }

     <Modal animationType="slide" transparent={false} visible={modalVisible}>
       <View style={styles.ModalView}> 
        <TouchableHighlight onPress={ toggle } style={styles.ModalView}  underlayColor={'none'}>       
          <Image resizeMode='contain' source={{uri: 'data:image/png;base64,' + modalImage}} style={styles.ModalImage}/> 
        </TouchableHighlight>
       </View>
     </Modal>

      <View style={styles.viewBase}>
        <View style={{...styles.viewTextoModelo}}>
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

      <View style={{...stylesGeral.ViewCamposCadastro, marginTop: 15, flex: 1}}>    
        <Button mode="contained" onPress={_ontenhoInteressePressed} style={{height: 70, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize:20, width: '100%', height: '100%'}}>Tenho Interesse</Text>
        </Button>
      </View>

      <View style={{ marginTop: 15, marginRight: 30, marginLeft: 30}}>
        <Button mode="contained" onPress={_onReservarPressed} >
          Reservar
        </Button>
      </View>
    </Container>
  );
};

export default memo(EstoqueCadastro);
