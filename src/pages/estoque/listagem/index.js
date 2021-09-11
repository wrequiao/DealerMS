import React, {Component, useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import { CheckBox } from 'react-native-elements'

import Touchable from 'react-native-platform-touchable';
import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import Loading from '~/componentes/loading';
import {getEstoqueVeiculos} from '~/servicos/auth';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {Modal} from 'react-native-paper';
import TextInput from '~/componentes/tela/TextInput';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import Button from '~/componentes/tela/Button';
import AsyncStorage from '@react-native-community/async-storage';

import stylesGeral from '~/styles';

const EstoqueListagem = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [Estoque, setEstoque] = useState([]);
  const [page, setPage] = useState(1);
  const [MostrarFiltro, setMostrarFiltro] = useState(false);

  const [checked, setChecked] = useState(true);

  const [TipoEstoqueSelecionado, setTipoEstoqueSelecionado] = useState({
    value: '',//alterado
    error: '',
  });
  const [BuscaDescricao, setBuscaDescricao] = useState({value: '', error: ''});

  useEffect(() => {
    carregarEstoque();
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
      marginLeft: -10,
      paddingBottom: 0,
    },
    descriçãoPequena: {
      fontSize: fonts.tipo0,
    },
    viewItemFlatListImage:{//novo
      width: 80,
      height: 80,
      marginRight: 5,
      marginTop: -10,
      //new
      resizeMode: 'contain',
      marginLeft: 10,
    },
    viewItemFlatListImageNull:{//novo
      width: 80,
      height: 80,
      marginRight: 5,
      marginTop: -10,
    },

  });

  async function carregarEstoque(Page = 1) {
    
    if (TipoEstoqueSelecionado.value == ''){//alterado
      setMostrarFiltro(true);
      return
    }//alterado

    if (loading) return;
    setLoading(true);

    
    let EstoqueAux = await getEstoqueVeiculos(
      TipoEstoqueSelecionado.value,
      BuscaDescricao.value,
      false,
      checked
    );
    console.log('\n', EstoqueAux.length);
    //console.log('\n\n\n', Estoque[0]);
    if (EstoqueAux.length == 0){//alterado
      setLoading(false);
      Alert.alert('Informação', 'Consulta não retornou dados.');
      return
    }

    setEstoque(EstoqueAux);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    await carregarEstoque();

    setRefreshing(false);
  }

  const filtrar = function() {
    
    if (TipoEstoqueSelecionado.value == '')
    {
      Alert.alert('Informação', 'Selecione ao menos um tipo de estoque.');
      return
    }

    setMostrarFiltro(false);
    carregarEstoque();
    return true;
  };

  const __onItemPress = async function(Veiculo_Codigo) {
    await AsyncStorage.setItem(
      '@Veiculo_Codigo_Estoque',
      Veiculo_Codigo.toString(),
    );
    props.navigation.navigate('EstoqueCadastro');
  };

  const __onCheckedPress = async function(checked) {  
   /* console.log('__onCheckedPress')
    console.log(checked)
    await AsyncStorage.setItem(
      'PesquisarImagemCheck',
      checked.toString(),
    );*/
    setChecked(checked);
  };

  const EstoqueView = ItemEstoque => {
    
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
              __onItemPress(ItemEstoque.Veiculo_Codigo);
            }}>
            <View style={styles.viewItemFlatList}>
              <View>


            {ItemEstoque.Veiculo_ImagemCapa['_55'] 
            ? //NOVO
                    <Image
                      style={styles.viewItemFlatListImage}
                      source={{uri: 'data:image/png;base64,' + ItemEstoque.Veiculo_ImagemCapa['_55']}}
                    />
                    :
                    <Image
                      style={styles.viewItemFlatListImageNull}
                      source={require('~/assets/carro_estoque.png')}
                    />
              } 

              </View>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: fonts.tipo2}}>
                  {ItemEstoque.Veiculo_Marca +
                    ' ' +
                   // ItemEstoque.Veiculo_Familia_Desc} //novo
                   ItemEstoque.Veiculo_Modelo_Desc} 
                </Text>
                <View style={{paddingVertical: 3}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          ...styles.descriçãoPequena,
                          color: 'grey',
                        }}>
                        {'Ano: ' +
                          ItemEstoque.Veiculo_Ano_Fabricacao +
                          '/' +
                          ItemEstoque.Veiculo_Ano_Modelo}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          ...styles.descriçãoPequena,
                          color: 'grey',
                          marginLeft: 10,
                        }}>
                        Placa: {ItemEstoque.Veiculo_Placa}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <Text
                      style={{
                        ...styles.descriçãoPequena,
                        color: 'grey',
                      }}>
                      Cor: {ItemEstoque.Veiculo_Cor}
                    </Text>
                    <Text
                      style={{
                        ...styles.descriçãoPequena,
                        color: 'grey',
                        marginLeft: 25,
                      }}>
                      Chassi: {ItemEstoque.Veiculo_Chassi}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: 'bold', color: theme.colors.primary}}>
                    Preço Tabela:
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: fonts.tipo3,
                      marginTop: -3,
                      marginLeft: 5,
                    }}>
                    {'R$ ' + ItemEstoque.Veiculo_Preco}
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

  //ItemEstoque.Veiculo_Marca + ItemEstoque.Veiculo_Familia_Desc
  //ItemEstoque.Veiculo_Ano_Modelo +'/' + ItemEstoque.Veiculo_Ano_Fabricacao
  //ItemEstoque.Veiculo_Preco

  //console.log('AtendimentosListagem');
  //console.log(props);
  return (
    <>
      <Container
        funcaoFiltro={() => {
          setMostrarFiltro(!MostrarFiltro);
        }}
        tela="Estoque de veículos"
        loading={loading || refreshing}
        functionFiltroHeader={() => {}}
        {...props}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Estoque}
          renderItem={({item, index}) => EstoqueView(item)}
          showsVerticalScrollIndicator={false}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          //onEndReached={() => loadPage()}
          ListFooterComponent={loading && <Loading tam="small" />}
          style={{bottom: 15}}

          //ListHeaderComponent={renderHeader}
          //keyboardShouldPersistTaps="always"
          //enableEmptySections={true}
        />
        <Modal
          visible={MostrarFiltro}
          contentContainerStyle={{
            ...stylesGeral.Modal,
            overflow: 'hidden',
            //top: 0,
            height: '110%',
          }}
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
              Pesquisar
            </Text>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                paddingVertical: 10,
              }}>
              <RNPickerSelect
                placeholder={{
                  label: 'Tipo de Estoque',
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
                value={TipoEstoqueSelecionado.value}
                onValueChange={item => {
                  setTipoEstoqueSelecionado({value: item, error: ''});
                }}
                items={[
                  {label: 'Veículo Novo', value: 'VN'},
                  {label: 'Veículo Usado', value: 'VU'},
                  {label: 'Venda Direta', value: 'VD'},
                  {label: 'Venda Internet', value: 'VI'},
                  {label: 'Veículo Imobilizado', value: 'VM'},
                ]}
              />
            </View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                paddingVertical: 5,
              }}>
              <TextInput
                label="Busca Descrição"
                styleContainer={{
                  ...stylesGeral.ContainerIpunts,
                }}
                styleInput={{height: 45}}
                returnKeyType="next"
                value={BuscaDescricao.value}
                onChangeText={text =>
                  setBuscaDescricao({value: text, error: ''})
                }
                error={!!BuscaDescricao.error}
                errorText={BuscaDescricao.error}
                //autoCapitalize="none"
                autoCompleteType="name"
                textContentType="name"
                //keyboardType="email-address"
              />
            </View>

            <View>
                    <TouchableOpacity >
                        <CheckBox  
                        fontStyle={styles.checkBoxText}                     
                        containerStyle ={{backgroundColor: 'transparent', borderWidth: 0,}}
                        title={<Text style={{fontWeight:"bold", color:"white"}}>Pesquisar com imagem</Text>}
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checked={checked}
                        uncheckedColor='white'
                        onPress={() => {__onCheckedPress(!checked)}}
                        />
                    </TouchableOpacity> 
            </View>

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
                <Button
                  mode="contained"
                  style={{borderWidth: 2, borderColor: 'white'}}
                  onPress={filtrar}>
                  Pesquisar
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    </>
  );
};

export default memo(EstoqueListagem);
