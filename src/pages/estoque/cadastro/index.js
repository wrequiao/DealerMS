import React, {useState, useEffect, memo, useRef} from 'react';

import {Modal, View, Text, StyleSheet, Image, Keyboard, TouchableOpacity, Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
//import {} from '~/core/utils';

import stylesGeral from '~/styles';
//import styles from './styles';
import {getEstoqueVeiculos, getCustosVeiculoSimulacao} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';
import Button from '~/componentes/tela/Button';

import Carousel from '~/componentes/carousel/Carousel'
import Slider from '~/componentes/carousel/Slider'
import ImageElement from '~/componentes/carousel/ImageElement'
import { TouchableHighlight } from 'react-native';
import TextInput from '~/componentes/tela/TextInput';
import PropostaCustosEstoque from '../../../componentes/propostacomponentes/PropostaCustosEstoque';


const ModalPoup = ({osParam, visible, children}) => {

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16, 
      paddingTop: 30, 
      backgroundColor: '#ffffff' 
    },
    head: { 
      height: 50, 
      backgroundColor: '#fff' 
    },
    text: { 
      textAlign: 'center', 
      fontWeight: '200' 
    },
    dataWrapper: { 
      marginTop: -1 
    },
    row: { 
      height: 40, 
      backgroundColor: '#F7F8FA' 
    },
    ico: { 
     justifyContent: "center",
     alignItems: "center",
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      height: '90%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });
    const [os, setOs] = useState(osParam);
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}> 
        <View style={styles.modalBackGround}>
        <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  
const EstoqueCadastro = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [Veiculo, setVeiculo] = useState({});
  const [Veiculo_Opcionais, setVeiculo_Opcionais] = useState([]);
  const [Veiculo_Imagens, setVeiculo_Imagens] = useState([]);

  const [visible, setVisible] = useState(false);

  const [viewModal, setviewModal] = useState(false);
  
  const [osData, setOsData] = useState({});
  
  const [PropostaD, setPropostaD] = useState({});
  const [Parcelas, setParcelas] = useState([]);
  const [ServicosAdicionais, setServicosAdicionais] = useState([]);
  const [Custos, setCustos] = useState([]);
  const [ValoresAgregados, setValoresAgregados] = useState([]);
  const [OSs, setOSs] = useState([]);
  const [TotalAgregado, setTotalAgregado] = useState([]);


  toggleModal = () => {
    setVisible(!visible)
  };


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
      borderRadius: 5,
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
        borderRadius: 5,
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
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
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

  async function _onSimulacaoPressed() {
    setLoading(true);
    Keyboard.dismiss();
    console.log('valor veiculo')
    console.log(Veiculo.Veiculo_Preco)

    console.log('codigo veiculo')
    console.log(Veiculo.Veiculo_Codigo)

    await AsyncStorage.setItem(
      '@Veiculo_Codigo_Reserva',
      Veiculo.Veiculo_Codigo.toString(),
    );

    getCustosVeiculoSimulacaoGet();
    setLoading(false);
    

    toggleModal();


   // props.navigation.navigate('ReservaVeiculos');
  }

  async function _ontenhoInteressePressed() {
    Keyboard.dismiss();

    await AsyncStorage.setItem(
      '@Veiculo_Codigo_Proposta',
      Veiculo.Veiculo_Codigo.toString(),
    );
    
    props.navigation.navigate('PropostaVeiculos');
  }

  const formatarTotalAgregado = function(valor) 
  {
    if (parseFloat(valor, 10) > 0)
      return '(+) ' + valor
    if (parseFloat(valor, 10) < 0)
      return '(-) ' + valor.replace('-', '')

    return ''+valor    
  }

  const getCustosVeiculoSimulacaoGet = async function() 
  {
    setLoading(true);
    let preco = parseFloat(Veiculo.Veiculo_Preco.replace('.','').replace(',', '.')) 
    let data = await getCustosVeiculoSimulacao(
      'C',
      '',
      '',
      '',
      '',
      '',
      '',
      'D',//TipoConsulta, 
      '',
      preco,
      Veiculo.Veiculo_Codigo 
      );
     
      //setLoading(false);

      data.forEach(function(propostas) {
        propostas.Proposta.forEach(function(proposta) {
          PropostasAux = proposta
        })
      });

      if (!PropostasAux){
        setLoading(false);
        Alert.alert('Informação', 'Consulta não retornou dados.');
        return
      }

      if (PropostasAux)
        setPropostaD(PropostasAux)

      if (PropostasAux.Custos)
      {

       
        PropostasAux.Custos.Custo.unshift({
          "Custo_Descricao":"Valor Presente",
          "Custo_Valor": PropostasAux.Proposta_ValorPresente
       })
        setCustos(PropostasAux.Custos.Custo)
    
        PropostasAux.Custos.Custo.forEach(function(item) 
        {
          if (item.Custo_Descricao == "Valor Agregado")
          {
            setTotalAgregado(formatarTotalAgregado(item.Custo_Valor))
          }
        })
      }
      if (PropostasAux.ValoresAgregados)
        setValoresAgregados(PropostasAux.ValoresAgregados.ValorAgregado)
     
      setLoading(false)
     
      //return PropostasAux


      console.log('valores retornados')
      console.log(JSON.stringify(PropostaD))
      console.log('valores retornados2')
      console.log(JSON.stringify(Custos))
      console.log('valores retornados3')
      console.log(JSON.stringify(ValoresAgregados))
      console.log('valores retornados4')
      console.log(JSON.stringify(TotalAgregado))
     
      return PropostasAux
  }

  return (
    <Container
      scroll={true}
      tela="Consulta Veículo"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
       
       <ModalPoup  visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
            <Text >[X]</Text>
            </TouchableOpacity>
          </View>
          <PropostaCustosEstoque Custos={Custos} PropostaD={PropostaD} Veiculo_Codigo={Veiculo.Veiculo_Codigo}/>
        </View>
      
      </ModalPoup>


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

      <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="Chassi"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '100%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Chassi}
            editable={!false}
          />
      </View>

      <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="Placa"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '100%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Placa + ' - ' +Veiculo.Veiculo_Marca}
            editable={!false}
          />
      </View>

      <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="Comb."
            styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Combustivel}
            editable={!false}
          />
          <TextInput
            label="KM"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_KM}
            editable={!false}
          />   
      </View>

      <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
           <TextInput
            label="Ano"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Ano_Modelo}
            editable={!false}
          />

          <TextInput
            label="Dias"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Dias_Estoque}
            editable={!false}
          />

          <TextInput
            label="Tipo"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '34%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Estoque_Tipo}
            editable={!false}
          />
      </View>

      <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="Cor"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '100%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Cor}
            editable={!false}
          />
      </View>

      <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="Empresa"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '100%'}}
            styleInput={{height: 45}}
            value={Veiculo.Veiculo_Empresa_Nome}
            editable={!false}
          />
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
            borderRadius: 5,
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
      <View style={{ marginTop: 15, marginRight: 30, marginLeft: 30}}>
        <Button mode="contained" onPress={_onSimulacaoPressed} >
          Custo
        </Button>
      </View>
    </Container>
  );
};

export default memo(EstoqueCadastro);
