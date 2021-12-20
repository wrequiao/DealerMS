import React, {Component, useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  PixelRatio,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Dimensions} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import Loading from '~/componentes/loading';
import {getPropostaFluxos} from '~/servicos/auth';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {Modal} from 'react-native-paper';
import TextInput from '~/componentes/tela/TextInput';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import Button from '~/componentes/tela/Button';

import stylesGeral from '~/styles';


import {
    getEmpresasUsuario,
    getEmpresasUsuarioSelecionada,
    setEmpresasUsuarioSelecionada,
  } from '~/servicos/auth';
  import {ajustarFormatoDadosComboEmpresas} from '~/servicos/auxiliar';
  import moment from 'moment';

const FluxoListagem = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [Atendimentos, setAtendimentos] = useState([]);
  const [Fluxos, setFluxos] = useState([]);
  const [page, setPage] = useState(1);
  const [MostrarFiltro, setMostrarFiltro] = useState(false);

  const [Nome, setNome] = useState({value: '', error: ''});
  const [CPF_CNPJ, setCPFCNPJ] = useState({value: '', error: ''});
  const [Status, setStatus] = useState({value: '', error: ''});
  const [HeightFlatList, setHeightFlatList] = useState(400);


  const [comboEmpresas, setComboEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(0);

  useEffect(() => {
    //setLoading(true);
    carregarComboEmpresas();
    carregarFluxos();
  }, [inicioUseEffect]);

  const carregarComboEmpresas = async () => {
    setLoading(true);
    let EmpresasUsuario = await getEmpresasUsuario();
    let EmpresaSelecionadaAux = await getEmpresasUsuarioSelecionada();

    let comboFormatado = ajustarFormatoDadosComboEmpresas(EmpresasUsuario);
    setComboEmpresas(comboFormatado);
    setEmpresaSelecionada(EmpresaSelecionadaAux);

    setLoading(false);

  };

  const __onEmpresasChange = async itemValue => {
    //setRefreshing(true);

    setEmpresaSelecionada(itemValue);
    await setEmpresasUsuarioSelecionada(itemValue);
    //setLoading(false);
  };

  const styles = StyleSheet.create({
    viewItemFlatList: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
    },
    viewContainerItemFlatList: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: 'grey',
      paddingVertical: 7,
      paddingBottom: 0,
    },
  });

  async function carregarFluxos(Page) {
    if (loading) return;
    setLoading(true);

    let data = await getPropostaFluxos('C','','','','','','','F','');

    data.forEach(function(fluxos) {
        FluxosAux = fluxos
    });

    //console.log('FluxosAuxFluxosAux')
    //console.log(JSON.stringify(FluxosAux));
      
    if (!FluxosAux){
        setLoading(false);
        Alert.alert('Informação', 'Consulta não retornou dados.');
        return
    }

    setFluxos(FluxosAux.Fluxo_Proposta);
    setLoading(false);
  }

  async function refreshList() {
   // setRefreshing(true);
    //setTextSearch(TextSearchAux);

    await carregarFluxos(1);

    //setRefreshing(false);
  }

  const filtrarFluxos = function() {
    setMostrarFiltro(false);
    carregarFluxos();
    return true;
  };

  const __onPressItemFluxo = async function(Proposta_Codigo) {
    await AsyncStorage.setItem(
      '@Proposta_Codigo',
      Proposta_Codigo.toString(),
    );
    props.navigation.navigate('PropostaDetalhes');
  };


  const FluxoView = Fluxo => {
    //console.log('\n', Atendimento);
    return (
      <View style={styles.viewContainerItemFlatList}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            width: '100%',
          }}>
          <Touchable
            style={{
              flexDirection: 'row',
              width: '100%',
            }}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => {
              __onPressItemFluxo(Fluxo.Proposta_Codigo);
            }}>
            <View style={styles.viewItemFlatList}>
              <View>
                  <Image
                    style={{
                      width: 80,
                      height: 70,
                      marginRight: 5,
                      marginTop: 0,
                    }}
                    source={require('~/assets/fluxos.jpeg')}
                  />
                <Text >
                  {moment(Fluxo.Fluxo_DataCriacao).format('DD-MM-YYYY')}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: fonts.tipo1}}>
                  {Fluxo.Fluxo_ClienteNome}
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{color: theme.colors.primary}}>
                    Proposta:
                  </Text>
                  <Text>
                    {Fluxo.Proposta_Codigo}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{color: theme.colors.primary}}>
                    Veículo:
                  </Text>
                  <Text>
                    {Fluxo.Fluxo_ModeloDescricao}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{color: theme.colors.primary}}>
                    TP:
                  </Text>
                  <Text>
                    {Fluxo.Fluxo_EstoqueTipo}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{color: theme.colors.primary}}>
                    Placa:
                  </Text>
                  <Text>
                    {Fluxo.Fluxo_VeiculoPlaca}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{color: theme.colors.primary}}>
                    Chassi:
                  </Text>
                  <Text>
                    {Fluxo.Fluxo_VeiculoChassi}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{color: theme.colors.primary}}>
                    Vendedor:
                  </Text>
                  <Text>
                    {Fluxo.Fluxo_VendedorNome}
                  </Text>
                </View>
              </View>
            </View>
          </Touchable>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '0%',
          }}>
          <Touchable
            style={{
              flexDirection: 'row',
              padding: 10,
              width: '100%',
            }}
            hitSlop={{top: 3, bottom: 3, left: 3, right: 3}}
            activeOpacity={0.5}
            onPress={() => {}}>
            <Image
              style={{width: 20, height: 20, paddingTop: 5}}
              source={require('~/assets/estrela_atendimento.png')}
            />
          </Touchable>
        </View>
      </View>
    );
  };

  //console.log('AtendimentosListagem');
  //console.log(props);
  return (
    <Container
      funcaoFiltro={() => {
        setMostrarFiltro(!MostrarFiltro);
      }}
      tela="Fluxos"
      loading={loading || refreshing}
      functionFiltroHeader={() => {}}
      exibirBotaoAdd={false}
      functionBotaoAdd={() => {
        props.navigation.navigate('AtendimentosCadastro');
      }}
      {...props}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Fluxos}
        renderItem={({item, index}) => FluxoView(item)}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        //onEndReached={() => loadPage()}
        ListFooterComponent={loading && <Loading tam="small" />}
        style={{
          bottom: 15,
          marginTop: -15,
        }}

        //ListHeaderComponent={renderHeader}
        //keyboardShouldPersistTaps="always"
        //enableEmptySections={true}
      />

      <Modal
        visible={MostrarFiltro}
        contentContainerStyle={stylesGeral.Modal}
        loading={loading || refreshing}
        //onRequestClose={() => {}}
      >
        <View
          style={{
            width: '100%',
            flex: 1,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              ...stylesGeral.TextLabelsCadastro,
              color: 'white',
              fontSize: fonts.TextoTituloFiltro,
              textAlign: 'center',
            }}>
            Pesquisar Fluxo
          </Text>
         
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 5,
            }}>
            
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingVertical: 15,
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
                width: '100%',
                alignSelf: 'center',
                paddingVertical: 15,
              }}>
              <Button
                mode="contained"
                style={{borderWidth: 2, borderColor: 'white'}}
                onPress={filtrarFluxos}>
                Pesquisar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default memo(FluxoListagem);
