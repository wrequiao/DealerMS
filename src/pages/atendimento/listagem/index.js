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
import {getAtendimentos} from '~/servicos/auth';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {Modal} from 'react-native-paper';
import TextInput from '~/componentes/tela/TextInput';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import Button from '~/componentes/tela/Button';

import stylesGeral from '~/styles';

const AtendimentosListagem = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [Atendimentos, setAtendimentos] = useState([]);
  const [page, setPage] = useState(1);
  const [MostrarFiltro, setMostrarFiltro] = useState(false);

  const [Nome, setNome] = useState({value: '', error: ''});
  const [CPF_CNPJ, setCPFCNPJ] = useState({value: '', error: ''});
  const [Status, setStatus] = useState({value: '', error: ''});
  const [HeightFlatList, setHeightFlatList] = useState(400);

  useEffect(() => {
    carregarAtendimentos();
  }, [inicioUseEffect]);

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

  async function carregarAtendimentos(Page) {
    if (loading) return;
    setLoading(true);

    //let PixelRatioAux = PixelRatio.get();
    //let AlturaTela = Dimensions.get('screen').height;
    //let HeightFlatListAux = AlturaTela - 280;
    //setHeightFlatList(parseInt(HeightFlatListAux));

    //console.log('PixelRatioAux : ' + PixelRatioAux);
    //console.log('AlturaTela : ' + AlturaTela);
    //console.log('HeightFlatList : ' + HeightFlatList);

    //console.log(Nome.value);
    let AtendimentosAux = await getAtendimentos(
      Nome.value,
      CPF_CNPJ.value,
      Status.value,
    );
    setAtendimentos(AtendimentosAux);

    //console.log(AtendimentosAux);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);
    //setTextSearch(TextSearchAux);

    await carregarAtendimentos(1);

    setRefreshing(false);
  }

  const filtrarAtendimentos = function() {
    setMostrarFiltro(false);
    carregarAtendimentos();
    return true;
  };

  const __onPressItemAtendimento = async function(Atendimento_Codigo) {
    await AsyncStorage.setItem(
      '@Atendimento_Codigo',
      Atendimento_Codigo.toString(),
    );
    props.navigation.navigate('AtendimentosCadastro');
  };

  const AtendimentoView = Atendimento => {
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
              __onPressItemAtendimento(Atendimento.Atendimento_Codigo);
            }}>
            <View style={styles.viewItemFlatList}>
              <View>
                {Atendimento.Atendimento_Via_APP == 1 ? (
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 5,
                      marginTop: -10,
                    }}
                    source={require('~/assets/cel_atendimento.png')}
                  />
                ) : (
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 5,
                      marginTop: -10,
                    }}
                    source={require('~/assets/pc_atendimento.png')}
                  />
                )}
              </View>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: fonts.tipo1}}>
                  {Atendimento.Atendimento_Nome}
                </Text>
                <Text style={{color: 'grey', fontSize: fonts.tipo1}}>
                  {Atendimento.Atendimento_Natu_Anted_Desc}
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: 'bold', color: theme.colors.primary}}>
                    Status:
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    {Atendimento.Atendimento_Status == 'CON'
                      ? ' Confirmado'
                      : ' Aberto'}
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
      tela="Atendimentos"
      loading={loading || refreshing}
      functionFiltroHeader={() => {}}
      exibirBotaoAdd={true}
      functionBotaoAdd={() => {
        props.navigation.navigate('AtendimentosCadastro');
      }}
      {...props}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Atendimentos}
        renderItem={({item, index}) => AtendimentoView(item)}
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
            Pesquisar Atendimento
          </Text>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 5,
            }}>
            <TextInput
              label="Nome"
              styleContainer={{
                ...stylesGeral.ContainerIpunts,
              }}
              styleInput={{height: 45}}
              returnKeyType="next"
              value={Nome.value}
              onChangeText={text => setNome({value: text, error: ''})}
              error={!!Nome.error}
              errorText={Nome.error}
              //autoCapitalize="none"
              autoCompleteType="name"
              textContentType="name"
              //keyboardType="email-address"
            />
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 5,
            }}>
            <TextInput
              label="CPF/CNPJ"
              styleContainer={stylesGeral.ContainerIpunts}
              styleInput={{height: 45}}
              returnKeyType="next"
              value={CPF_CNPJ.value}
              onChangeText={text => setCPFCNPJ({value: text, error: ''})}
              error={!!CPF_CNPJ.error}
              errorText={CPF_CNPJ.error}
              //autoCapitalize="none"
              autoCompleteType="name"
              textContentType="name"
              //keyboardType="email-address"
            />

            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingVertical: 15,
              }}>
              <RNPickerSelect
                placeholder={{
                  label: 'Status',
                  color: 'black',
                  fontSize: 18,
                }}
                style={{
                  inputIOS: {...pickerSelectStyles.inputIOS, color: 'grey'},
                  inputAndroid: {
                    ...pickerSelectStyles.inputAndroid,
                    color: 'grey',
                    backgroundColor: 'white',
                    borderColor: 'grey',
                    borderWidth: 1,
                  },
                  iconContainer: {...pickerSelectStyles.iconContainer},
                }}
                Icon={() => {
                  return <Chevron size={2} color="gray" />;
                }}
                useNativeAndroidPickerStyle={false}
                value={Status.value}
                onValueChange={item => {
                  setStatus({value: item});
                }}
                items={[
                  {label: 'Aberto', value: 'ABE'},
                  {label: 'Confirmado', value: 'CON'},
                ]}
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
                onPress={filtrarAtendimentos}>
                Pesquisar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default memo(AtendimentosListagem);
