import React, {useState, useEffect, memo} from 'react';
import {Modal, View, Text, StyleSheet, Image, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
//import {} from '~/core/utils';

import stylesGeral from '~/styles';
//import styles from './styles';
import { getPropostaVeiculosDetalhes} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';
import Button from '~/componentes/tela/Button';

import Carousel from '~/componentes/carousel/Carousel'
import Slider from '~/componentes/carousel/Slider'
import ImageElement from '~/componentes/carousel/ImageElement'
import { TouchableHighlight } from 'react-native';
import TextInput from '~/componentes/tela/TextInput';
import PropostaCustos from '~/componentes/propostacomponentes/PropostaCustos'
import PropostaGeral from '~/componentes/propostacomponentes/PropostaGeral'
import PropostaParcelas from '~/componentes/propostacomponentes/PropostaParcelas'
import PropostaServicosAdicionais from '~/componentes/propostacomponentes/PropostaServicosAdicionais'
import PropostaValorAgregado from '~/componentes/propostacomponentes/PropostaValorAgregado'
import PropostaOS from '~/componentes/propostacomponentes/PropostaOS'
import {Chevron} from 'react-native-shapes';
//import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';

//var ScrollableTabView = require('react-native-scrollable-tab-view');
//import  { ScrollableTabBar } from 'react-native-scrollable-tab-view';
//import Icon from 'react-native-vector-icons/Ionicons';
//var ScrollableTabView = require('react-native-scrollable-tab-view');

const PropostaDetalhes = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [PropostaD, setPropostaD] = useState({});
  const [Parcelas, setParcelas] = useState([]);
  const [ServicosAdicionais, setServicosAdicionais] = useState([]);
  const [Custos, setCustos] = useState([]);
  const [ValoresAgregados, setValoresAgregados] = useState([]);
  const [OSs, setOSs] = useState([]);
  const [TotalAgregado, setTotalAgregado] = useState([]);
  const [HabilitarCampos, setHabilitarCampos] = useState(true);
  const [Telas, setTelas] = useState([]);
  const [TelaSelecionada, setTelaSelecionada] = useState( {value: '', error: ''});
  //const [Atendimentos, setAtendimentos] = useState([{id: 1, descricao: 'Geral'}, {id: 2, descricao: 'Parcelas'}]);
  const [GE, setGE] = useState(true);
  const [PA, setPA] = useState(false);
  const [SA, setSA] = useState(false);
  const [CU, setCU] = useState(false);
  const [AG, setAG] = useState(false);
  const [OSS, setOSS] = useState(false);
  /*
   {label: 'Geral', value: 'GE'},
            {label: 'Parcelas', value: 'PA'},
            {label: 'Serviços adicionais', value: 'SA'},
            {label: 'Custos', value: 'CU'},
            {label: 'Agregado', value: 'AG'},
            {label: 'O.S.', value: 'OS'},
          ]}
  */
  moment.locale('pt-br');

  useEffect(() =>  {
    getPropostaCodigo();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const formatarTotalAgregado = function(valor) 
  {
    if (parseFloat(valor, 10) > 0)
      return '(+) ' + valor
    if (parseFloat(valor, 10) < 0)
      return '(-) ' + valor.replace('-', '')

    return ''+valor    
  }
  const getPropostaCodigo = async function() 
  {
    setLoading(true);
    let Proposta_CodigoAux = await AsyncStorage.getItem('@Proposta_Codigo');

    let data = await getPropostaVeiculosDetalhes(
      '',
      '',
      '',
      '',
      '',
      Proposta_CodigoAux,
      '',
      'D',//TipoConsulta, 
      ''
      );
  
      let PropostasAux = []

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
      if (PropostasAux.Parcelas)
        setParcelas(PropostasAux.Parcelas.Parcela)
      if (PropostasAux.ServicosAdicionais)
        setServicosAdicionais(PropostasAux.ServicosAdicionais.ServicosAdicional)
      if (PropostasAux.Custos)
      {
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
      if (PropostasAux.OSs)
        setOSs(PropostasAux.OSs.OS)
      
      setLoading(false)
     
      return PropostasAux
  }
   
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
  
    });

return (  
  <Container
    scroll={true}
    tela="Proposta Detalhes."
    loading={loading || refreshing}
    {...props}
    // data={""}
    exibirHeader={true}
    exibirFiltro={false}>



<RNPickerSelect
          placeholder={{
            label: 'Telas...',
            color: 'black',
            fontSize: 18,
          }}
          style={{
            inputIOS: {
              ...pickerSelectStyles.inputIOS,
              color: 'grey',
              borderColor: 'grey',
              borderWidth: 1,
              backgroundColor: HabilitarCampos
                ? 'white'
                : theme.colors.terceary,
            },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
              color: 'grey',
              borderColor: 'grey',
              borderWidth: 1,
              backgroundColor: HabilitarCampos
                ? 'white'
                : theme.colors.terceary,
            },
            iconContainer: {...pickerSelectStyles.iconContainer},
          }}
          Icon={() => {
            return <Chevron size={2} color="gray" />;
          }}
          useNativeAndroidPickerStyle={false}
          value={TelaSelecionada.value}
          onValueChange={item => {
            setTelaSelecionada({value: item, error: ''});
            console.log('item selecionado: ', JSON.stringify(item))
            if (item == 'GE' || item == "undefined"){
              item = 'GE'
              setGE(true)
              setPA(false)
              setSA(false)
              setCU(false)
              setAG(false)
              setOSS(false)

            }

            if (item == 'PA')
            {
              setGE(false)
              setPA(true)
              setSA(false)
              setCU(false)
              setAG(false)
              setOSS(false)
            }

            if (item == 'SA')
            {
              setGE(false)
              setPA(false)
              setSA(true)
              setCU(false)
              setAG(false)
              setOSS(false)
            }

            if (item == 'CU')
            {
              setGE(false)
              setPA(false)
              setSA(false)
              setCU(true)
              setAG(false)
              setOSS(false)
            }

            if (item == 'AG')
            {
              setGE(false)
              setPA(false)
              setSA(false)
              setCU(false)
              setAG(true)
              setOSS(false)
            }
            
            if (item == 'OSS')
            {
              setGE(false)
              setPA(false)
              setSA(false)
              setCU(false)
              setAG(false)
              setOSS(true)
            }
            
          }}


          items={[
            {label: 'Geral', value: 'GE'},
            {label: 'Parcelas', value: 'PA'},
            {label: 'Serviços adicionais', value: 'SA'},
            {label: 'Custos', value: 'CU'},
            {label: 'Agregado', value: 'AG'},
            {label: 'O.S.', value: 'OSS'},
          ]}
          //items={Telas}
         // disabled={!HabilitarCampos}
        />


        {GE ?  ( 
          <PropostaGeral tabLabel='Geral' PropostaD={PropostaD}/>   
        ) : 
        (<></>)}
        {PA ?  ( 
        <PropostaParcelas tabLabel='Parcelas' Parcelas={Parcelas}/>
        ) : 
        (<></>)}
        {SA ?  ( 
        <PropostaServicosAdicionais tabLabel='Serviços adicionais' ServicosAdicionais={ServicosAdicionais}/>
        ) : 
        (<></>)}
        {CU ?  ( 
        <PropostaCustos tabLabel='Custos' Custos={Custos} PropostaD={PropostaD}/>
        ) : 
        (<></>)}
        {AG ?  ( 
        <PropostaValorAgregado tabLabel='Agregado' ValoresAgregados={ValoresAgregados} TotalAgregado={TotalAgregado}/>
        ) : 
        (<></>)}
        {OSS ?  ( 
        <PropostaOS tabLabel='O.S.' OSs={OSs}/>
        ) : 
        (<></>)}
  </Container>
  )


  return (
    <>
    <Modal
          visible={true}
          contentContainerStyle={{
            ...stylesGeral.Modal,
            overflow: 'hidden',
            //top: 0,
            height: '110%',
          }}>

        <View>
        <Text style={{...styles.textoDados, textAlign: 'auto', width: '30%'}}>
                                {'R$ ' }
                            </Text>  
        </View>
    </Modal>
    </>
  )
  }
  
  export default memo(PropostaDetalhes);
  
