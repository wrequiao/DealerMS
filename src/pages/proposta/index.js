import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import {
  dataValidator,
  nameValidator,
  ajustarFormatoDadosCombo,
} from '~/core/utils';

import {TextInputMask} from 'react-native-masked-text';
import Button from '~/componentes/tela/Button';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import TextInput from '~/componentes/tela/TextInput';

import stylesGeral from '~/styles';

import {
  getAtendimentos,
  getVeiculoCod,
  cadastrarPropostaVeiculo,
  getEstoqueVeiculos,
} from '~/servicos/auth';

const PropostaVeiculos = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);

  const [HabilitarCampos, setHabilitarCampos] = useState(true);

  const [VeiculoCodigo, setVeiculoCodigo] = useState();
  const [VeiculoCodigoExterno, setVeiculoCodigoExterno] = useState();
  const [Veiculo_Preco, setVeiculo_Preco] = useState('');
  const [Veiculo_Modelo_Desc, setVeiculo_Modelo_Desc] = useState('');
  const [Veiculo_Modelo_Cod, setVeiculo_Modelo_Cod] = useState('');
  const [PropostaObs, setPropostaObs] = useState('');

  const [Chassi, setChassi] = useState('');
  const [Placa, setPlaca] = useState('');
  //const [Validade, setValidade] = useState('');

  const [Atendimentos, setAtendimentos] = useState([]);
  const [AtendimentoSelecionado, setAtendimentoSelecionado] = useState({
    value: '',
    error: '',
  });

  useEffect(() => {
    carregarDados();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const carregarDados = async function() {
    if (loading) return;
    setLoading(true);

    await carregarAtendimentos();

    let VeiculoCodigoAux = await AsyncStorage.getItem(
      '@Veiculo_Codigo_Proposta',
    );
    if (VeiculoCodigoAux) setVeiculoCodigoExterno(VeiculoCodigoAux);
    await AsyncStorage.removeItem('@Veiculo_Codigo_Proposta');

    //VeiculoCodigoAux = props.navigation.getParam('VeiculoCodigo');
    if (VeiculoCodigoAux) {
      let EstoqueAux = await getEstoqueVeiculos(null, VeiculoCodigoAux);
      //console.log('\n', EstoqueAux);

      let VeiculoAux = EstoqueAux ? EstoqueAux[0] : false;
      //console.log('\n', VeiculoAux);

      if (VeiculoAux) {

        //console.log('debugtelanovaxxx')
        //console.log(VeiculoAux)
        setVeiculoCodigo(VeiculoCodigoAux);
        setChassi({value: VeiculoAux.Veiculo_Chassi, error: ''});
        setPlaca({value: VeiculoAux.Veiculo_Placa, error: ''});

        setVeiculo_Preco({value: VeiculoAux.Veiculo_Preco, error: ''})
        setVeiculo_Modelo_Desc(({value: VeiculoAux.Veiculo_Modelo_Desc, error: ''}))
        setVeiculo_Modelo_Cod(({value: VeiculoAux.Veiculo_Modelo_Cod, error: ''}))
      } else {
        Alert.alert(
          'Informação',
          'Não foi possível carregar os dados do veículo.',
        );
      }
    }

    setLoading(false);
  };

  async function carregarAtendimentos() {
    //console.log(Nome.value);
    let AtendimentosAux = await getAtendimentos(null, null, 'ABE');
    //console.log(AtendimentosAux);
    setAtendimentos(
      ajustarFormatoDadosCombo(
        AtendimentosAux,
        'Atendimento_Codigo',
        'Atendimento_Nome',
      ),
    );

    //console.log(AtendimentosAux);
  }

  const styles = StyleSheet.create({
    viewBase: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      alignSelf: 'flex-start',
      width: '100%',
      marginVertical: 10,
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
  });

  const __onPressPropostaVeiculo = async function() {
    setLoading(true);

    let ChassiError;
    let PlacaError;

    //Veiculo ja selecionado
    if (!VeiculoCodigoExterno) {
      ChassiError = nameValidator(Chassi.value, 'Chassi');
      PlacaError = nameValidator(Placa.value, 'Placa');
    }

    const AtendimentoError =
      !AtendimentoSelecionado.value || AtendimentoSelecionado.value == ''
        ? 'Atendimento precisa ser selecionado.'
        : '';

    if (AtendimentoError || (ChassiError && PlacaError)) {

      if (ChassiError && PlacaError) {
        setChassi({...Chassi, error: ChassiError});
        setPlaca({...Placa, error: PlacaError});
      } else {
        setChassi({...Chassi, error: ''});
        setPlaca({...Placa, error: ''});
      }

      setAtendimentoSelecionado({
        ...AtendimentoSelecionado,
        error: AtendimentoError,
      });

      if (AtendimentoError) {
        Alert.alert('Informação', AtendimentoError);
      }
    } else {
        //console.log('else debug')
      //console.log('VeiculoCodigo : ' + VeiculoCodigo);
      setChassi({...Chassi, error: ''});
      setPlaca({...Placa, error: ''});
      setPropostaObs({...PropostaObs, error: ''});
      setVeiculo_Preco({...Veiculo_Preco, error: ''});

      let VeiculoAux;

      if (!VeiculoCodigoExterno) {
        VeiculoAux = await getVeiculoCod(Chassi.value, Placa.value);

        if (VeiculoAux) {
          setVeiculoCodigo(VeiculoAux.Veiculo_Codigo);
        } else {
          Alert.alert(
            'Informação',
            'Veículo não consta como Disponível em estoque, Proposta não autorizada',
          );

          setLoading(false);
          return;
        }
      }
      //setLoading(false);
      //console.log('VeiculoCodigo : ' + VeiculoCodigo);
     
      
      //console.log('obser')
      //console.log(PropostaObs.value)
      //console.log('Veiculo_Preco')
      //console.log(Veiculo_Preco.value)
      
      //return
      //console.log('else debug2')
      let RetornoCadastro = await cadastrarPropostaVeiculo(
        VeiculoCodigo ? VeiculoCodigo : VeiculoAux.Veiculo_Codigo,
        AtendimentoSelecionado.value,
        PropostaObs.value, 
        Veiculo_Preco.value.replace(".", "").replace(",", ".")
      );

      //console.log('else debug3')
      //console.log(RetornoCadastro)

      if (RetornoCadastro && RetornoCadastro.Ok) {
        setHabilitarCampos(false);
        Alert.alert('Sucesso', 'Proposta cadastrada.');
      } else {
        Alert.alert('Mensagem', RetornoCadastro.Erro);
      }
    }

    setLoading(false);
  };

  return (
    <Container
      scroll={true}
      tela="Proposta de Veículos"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
      <View
        style={{
          alignSelf: 'center',
          width: '100%',
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
          disabled={!HabilitarCampos}
        />
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 15,
        }}>
        <Text
          style={{
            fontSize: fonts.tipo4,
            textAlign: 'left',
            color: theme.colors.primary,
            fontWeight: 'bold',
          }}>
          Dados do Veículo
        </Text>
      </View>

      <View style={styles.viewBase}>
        <View style={{...styles.viewTextoModelo}}>
          <Text style={{...styles.textoDados, fontSize: fonts.tipo4}}>
           {Veiculo_Modelo_Desc.value}
           
          </Text>
        </View>
      </View>

      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Chassi:</Text>
        </View>
        <View
          style={{
            width: 200,
            marginLeft: 25,
          }}>
          <TextInput
            //label="Busca Descrição"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -11,
            }}
            styleInput={{
              height: 40,
              backgroundColor: theme.colors.terceary,
            }}
            returnKeyType="next"
            value={Chassi.value}
           // onChangeText={text => setChassi({value: text, error: ''})}
            error={!!Chassi.error}
            errorText={Chassi.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Placa:</Text>
        </View>
        <View
          style={{
            width: 150,
            marginLeft: 35,
          }}>

          <TextInput
            //label="Busca Descrição"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -11,
            }}
            styleInput={{
              height: 40,
              backgroundColor: theme.colors.terceary,
            }}
            returnKeyType="next"
            value={Placa.value}
           // onChangeText={text => setPlaca({value: text, error: ''})}
            error={!!Placa.error}
            errorText={Placa.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>

      <View style={stylesGeral.ViewCamposCadastro}>
          <TextInput
            label="Observações da Proposta"
            styleContainer={stylesGeral.ContainerIpunts}
            returnKeyType="next"
            value={PropostaObs.value}
            maxLength={100}
            numberOfLines={5}
            onChangeText={text => setPropostaObs({value: text, error: ''})}
            error={!!PropostaObs.error}
            errorText={PropostaObs.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            //keyboardType="email-address"
            multiline={true}
            editable={true}
          />
        </View>
      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Preço:</Text>
        </View>
        <View
          style={{
            width: 200,
            marginLeft: 25,
          }}>
          <TextInput
            //label="Busca Descrição"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -11,
            }}
            styleInput={{
              height: 40,
             // backgroundColor: theme.colors.terceary,
            }} 
            returnKeyType="next"
            value={Veiculo_Preco.value}
            onChangeText={text => setVeiculo_Preco({value: text, error: ''})}
            error={!!Veiculo_Preco.error}
            errorText={Veiculo_Preco.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={true}
            //keyboardType="email-address"
          >{}</TextInput>
        </View>
        </View>

      <View style={{...stylesGeral.ViewCamposCadastro, marginTop: 20}}>
        <Button
          mode="contained"
          disabled={!HabilitarCampos}
          onPress={__onPressPropostaVeiculo}>
          Tenho Interesse
        </Button>
      </View>
    </Container>
  );
};
export default memo(PropostaVeiculos);
