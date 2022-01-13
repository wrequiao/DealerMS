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

import Touchable from 'react-native-platform-touchable';
import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import Loading from '~/componentes/loading';
import {getAtendimentos, getPropostaVeiculos} from '~/servicos/auth';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {Modal} from 'react-native-paper';
import TextInput from '~/componentes/tela/TextInput';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import Button from '~/componentes/tela/Button';
import AsyncStorage from '@react-native-community/async-storage';
import RadioGroup from 'react-native-radio-button-group';
import stylesGeral from '~/styles';
import {
  dataValidator,
  nameValidator,
  ajustarFormatoDadosCombo,
} from '~/core/utils';
import {TextInputMask} from 'react-native-masked-text';
import moment from 'moment';
import 'moment/locale/pt-br';
//import DatePicker from 'react-native-date-picker'

const PropostaListagem = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [Propostas, setPropostas] = useState([]);
  const [page, setPage] = useState(1);
  const [MostrarFiltro, setMostrarFiltro] = useState(true);
  const [TipoEstoqueSelecionado, setTipoEstoqueSelecionado] = useState({value: '', error: '',});
  const [AtendimentoSelecionado, setAtendimentoSelecionado] = useState({value: '', error: '',});
  const [HabilitarCampos, setHabilitarCampos] = useState(true);
  const [Atendimentos, setAtendimentos] = useState([]);
  const [BuscaDescricao, setBuscaDescricao] = useState({value: '', error: ''});
  const [DataInicial, setDataInicial] = useState('');
  const [DataFinal, setDataFinal] = useState('');
  const radioButtonsData = [
    {id: 1, labelView: (<Text style={{ color: 'white', fontSize:12, }}>Dt. Aprovação</Text>), value: 'Dt. Aprovação' },
    {id: 2, labelView: (<Text style={{ color: 'white', fontSize:12, }}>Dt. Criação</Text>), value: 'Dt. Criação' },
    {id: 3, labelView: (<Text style={{ color: 'white', fontSize:12, }}>Dt. Faturamento</Text>), value: 'Dt. Faturamento' },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [chassiPlaca, setChassiPlaca] = useState('');
  const [pedido, setPedido] = useState('');
  const [proposta, setProposta] = useState('');

  useEffect(() => {
    setLoading(false);
    setRadioButtons(radioButtonsData[0])
    //carregarProposta();

    carregarDados();
  }, [inicioUseEffect]);

  const carregarDados = async function() {
    if (loading) return;
    setLoading(true);
    await carregarAtendimentos();
    setLoading(false);

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
    viewRadiogroup :{
      fontSize: fonts.tipo0,
      color: '#000',
    },

  });

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  async function carregarAtendimentos() {
    let AtendimentosAux = await getAtendimentos(null, null, 'ABE');
   // console.log(AtendimentosAux);
    setAtendimentos(
      ajustarFormatoDadosCombo(
        AtendimentosAux,
        'Atendimento_Codigo',
        'Atendimento_Nome',
      ),
    );
  }


async function carregarProposta(Page = 1) {
if (loading) return;
setLoading(true);
/*   
console.log('debugando call propostas veiculos')
console.log('radioButtons')
console.log(radioButtons.id)
console.log('DataInicial')
console.log(DataInicial.value)
console.log('DataFinal')
console.log(DataFinal.value)
console.log('AtendimentoSelecionado')
console.log(AtendimentoSelecionado.value)
console.log('chassiPlaca')
console.log(chassiPlaca)
console.log('proposta')
console.log(proposta)
console.log('pedido')
console.log(pedido)
//.locale('pt-br')
//let di = DataInicial.value
//let df = DataFinal.value
*/
let fromi =  ''//null//DataInicial.value.split("/")
let fromf =  ''//null//DataFinal.value.split("/")
let di = ''//null
let df = ''//null




if (DataInicial.value)
{
  if (DataInicial.value.length == 10)
  {
    fromi =  DataInicial.value.split("/")
    di = fromi[2] + '-' + fromi[1]  + '-' + fromi[0]
  }
}

if (DataFinal.value)
{
  if (DataFinal.value.length == 10)
  {
    fromf =  DataFinal.value.split("/")
    df = fromf[2] + '-' + fromf[1]  + '-' + fromf[0]
  }
}

console.log('fromdateixxx')

 // let di = DataInicial.value ? moment(DataInicial.value, "YYYY-MM-DD") : null
  //let df = DataFinal.value ? moment(DataFinal.value, "YYYY-MM-DD").locale('pt-br') : null

  console.log("dii");
  console.log(di);
  console.log("dff");
  console.log(df);

    let data = await getPropostaVeiculos(
    radioButtons.id == 1 ? 'A' : radioButtons.id == 2 ? 'C' : 'D', //tipo data
    di,//'2021-11-01',
    df,//'2021-11-17',
    AtendimentoSelecionado.value,
    chassiPlaca,
    proposta,
    pedido == null ? '' : pedido ? pedido : '',
    'L',//TipoConsulta, 
    ''
    );

    let PropostasAux = []

    data.Propostas.forEach(function(propostas) {
      propostas.Proposta.forEach(function(proposta) {
        PropostasAux.push(proposta)     
     })
   })
    
    if (PropostasAux.length == 0){//alterado
      setLoading(false);
      Alert.alert('Informação', 'Consulta não retornou dados.');
      return
    }

    setPropostas(PropostasAux);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    await carregarProposta();

    setRefreshing(false);
  }

  const filtrar = function() {
    setMostrarFiltro(false);
    carregarProposta();
    return true;
  };

  const __onItemPress = async function(Proposta_Codigo) {
    await AsyncStorage.setItem(
      '@Proposta_Codigo',
      Proposta_Codigo.toString(),
    );
    props.navigation.navigate('PropostaDetalhes');
  };

  const PropostaView = ItemProposta => {
    
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
              __onItemPress(ItemProposta.Proposta_Codigo);
              //__onItemPress(ItemProposta);
            }}>
            <View style={styles.viewItemFlatList}>
              
            
              <View>
                    <Image
                      style={styles.viewItemFlatListImageNull}
                      //source={require('~/assets/carro_estoque.png')}
                      source={require('~/assets/propostaico.png')}
                    />
              </View>

              
              <View>
                <Text style={{fontWeight: 'bold', fontSize: fonts.tipo2}}>
                  {ItemProposta.Cliente_Nome } 
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
                        {
                          ItemProposta.Modelo_Descricao }
                      </Text>

                      <Text
                        style={{
                          ...styles.descriçãoPequena,
                          color: 'grey',
                          marginLeft: 10,
                        }}>
                        {'Placa:' + ItemProposta.Veiculo_Placa}
                      </Text>

                    </View>
                  </View>


                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <Text
                      style={{
                        ...styles.descriçãoPequena,
                        color: 'grey',
                      }}>
                      Pedido: {ItemProposta.Proposta_Pedido} - {ItemProposta.Proposta_Status}
                    </Text>
                    <Text
                      style={{
                        ...styles.descriçãoPequena,
                        color: 'grey',
                        marginLeft: 25,
                      }}>
                      {ItemProposta.Veiculo_Chassi}
                    </Text>
                  </View>


                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <Text
                      style={{
                        ...styles.descriçãoPequena,
                        color: 'grey',
                      }}>
                      Vendedor: {ItemProposta.Vendedor_Nome}
                    </Text>
                    <Text
                      style={{
                        ...styles.descriçãoPequena,
                        color: 'grey',
                        marginLeft: 25,
                      }}>
                      {ItemProposta.Estoque_Tipo}
                    </Text>
                  </View>



                </View>




                  </View>   
                </View>  
          </Touchable>
        </View>

      </View>
    );
  };

 
  return (
    <>
      <Container
        funcaoFiltro={() => {
          setMostrarFiltro(!MostrarFiltro);
        }}
        tela="Consulta de Propostas"
        loading={loading || refreshing}
        functionFiltroHeader={() => {}}
        {...props}>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Propostas}
          renderItem={({item, index}) => PropostaView(item)}
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
            height: '200%',
          }}
          //onRequestClose={() => {}}
        >
          <View
            style={{
            //  width: '100%',
             // flex: 1,
             // marginLeft: 15,
            }}>
            <Text
              style={{
                ...stylesGeral.TextLabelsCadastro,
                color: 'white',
                fontSize: fonts.TextoTituloFiltro,
                textAlign: 'center',
              }}>
              PERÍODO
            </Text>
           </View>


           <View
            style={{
             // width: '100%',
              //flex: 1,
              alignItems: 'center',
            }}>
            <RadioGroup
           // color = 'grey'
           // activeColor = 'blue'
            style={styles.viewRadiogroup}
                  horizontal={true}
                  options={radioButtonsData}
                  radioButtons={radioButtons} 
                  onChange={onPressRadioButton} 
                  activeButtonId={1}
                  circleStyle={{ fillColor: 'white', borderColor: 'gray', borderWidth: 2,}}
                  
            />
   </View>

   <View
            style={{
             // width: '100%',
              //flex: 1,
              flexDirection: 'row',
              //borderBottomWidth:5,
              //borderColor: 'red',
              //marginLeft: 10,
              //marginRight: 50,
              justifyContent: 'space-around',
              alignSelf: 'stretch',
              marginBottom: 5
             // paddingVertical: 15,
            }}>

         
          <TextInputMask
            placeholder=" ____ / ____ / ____"
            type={'datetime'}
            autoFocus={true}
            options={{
              format: 'DD/MM/YYYY',
            }}



           // styleInput={{height: 45}}
            
            style={{          
              ...stylesGeral.ContainerIpunts,
              //marginTop: 20,
              backgroundColor: 'white',
              height: 40,
              width: '45%',
             // borderWidth: 1,
              //borderColor: 'grey',
              borderRadius: 3,
              fontSize: fonts.tipo2,
              marginRight: 10,
              marginLeft: 10,
              //padding: 10,
            }}
            returnKeyType="next"
            value={DataInicial.value}
            onChangeText={text => setDataInicial({value: text, error: ''})}
            //onChangeText={() => setOpen(true)}
            error={!!DataInicial.error}
            errorText={DataInicial.error}
          />
         
     
          <TextInputMask
             placeholder=" ____ / ____ / ____"
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}

            style={{
              ...stylesGeral.ContainerIpunts,
              //marginTop: -50,
              backgroundColor: 'white',
              height: 40,
              width:'45%',
              //borderWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              //borderColor: 'grey',
              borderRadius: 3,
              fontSize: fonts.tipo2,
             // padding: 10,
            }}
            returnKeyType="next"
            value={DataFinal.value}
            onChangeText={text => setDataFinal({value: text, error: ''})}
            error={!!DataFinal.error}
            errorText={DataFinal.error}
          />
    </View>


    <View
            style={{
              //width: '100%',
              //flex: 1,
             // paddingVertical: 15,
             marginLeft: 10,
             marginRight: 10,
            }}>
        <RNPickerSelect
          placeholder={{
            label: 'Atendimento',
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
          value={AtendimentoSelecionado.value}
          onValueChange={item => {
            setAtendimentoSelecionado({value: item, error: ''});
          }}
          items={Atendimentos}
         // disabled={!HabilitarCampos}
        />
      </View>


      <View
            style={{
             // width: '100%',
             // flex: 1,
              //paddingVertical: 15,
              marginLeft: 10,
             marginRight: 10,
            }}>
              <TextInput
                label="Chassi/Placa"
                styleContainer={{
                  ...stylesGeral.ContainerIpunts,
                }}
                styleInput={{height: 45}}
                returnKeyType="next"
                value={chassiPlaca}
                onChangeText={text => setChassiPlaca(text)}
                //error={!!BuscaDescricao.error}
                //errorText={BuscaDescricao.error}
                //autoCapitalize="none"
               // autoCompleteType="name"
               // textContentType="name"
                //keyboardType="email-address"
              />
      </View>

            <View
            style={{
              width: '100%',
              //flex: 1,
              flexDirection: 'row',
              //marginLeft: 10,
              //marginRight: 50,
              justifyContent: 'space-around',
             // paddingVertical: 15,
            }}>
          <TextInput
            label="Proposta"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '45%',}}
            styleInput={{height: 45}}
            value={proposta}
            onChangeText={text => setProposta(text)}
            //editable={!false}
          />
          <TextInput
            label="Pedido"
            styleContainer={{...stylesGeral.ContainerIpunts, width: '45%', }}
            styleInput={{height: 45}}
            value={pedido}
            onChangeText={text => setPedido(text)}
            //editable={!false}
          />   
      </View>

      <View
            style={{
             // width: '100%',
              flex: 1,
              marginLeft: 10,
              marginRight: 10,
              //paddingVertical: 15,
            }}>
                <Button
                  mode="contained"
                  style={{borderWidth: 2, borderColor: 'white'}}
                  onPress={filtrar}>
                  Pesquisar
                </Button>
            </View>
        </Modal>
      </Container>
    </>
  );
};

export default memo(PropostaListagem);


