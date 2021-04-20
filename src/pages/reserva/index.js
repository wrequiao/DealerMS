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
//import styles from './styles';
import {
  getAtendimentos,
  getVeiculoCod,
  cadastrarReservaVeiculo,
  getEstoqueVeiculos,
} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';

const ReservaVeiculos = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);

  const [HabilitarCampos, setHabilitarCampos] = useState(true);

  const [VeiculoCodigo, setVeiculoCodigo] = useState();
  const [VeiculoCodigoExterno, setVeiculoCodigoExterno] = useState();
  const [Chassi, setChassi] = useState('');
  const [Placa, setPlaca] = useState('');
  const [Validade, setValidade] = useState('');

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
      '@Veiculo_Codigo_Reserva',
    );

    if (VeiculoCodigoAux) setVeiculoCodigoExterno(VeiculoCodigoAux);
    await AsyncStorage.removeItem('@Veiculo_Codigo_Reserva');

    //VeiculoCodigoAux = props.navigation.getParam('VeiculoCodigo');
    if (VeiculoCodigoAux) {
      let EstoqueAux = await getEstoqueVeiculos(null, VeiculoCodigoAux);
      //console.log('\n', EstoqueAux);

      let VeiculoAux = EstoqueAux ? EstoqueAux[0] : false;
      //console.log('\n', VeiculoAux);

      if (VeiculoAux) {
        setVeiculoCodigo(VeiculoCodigoAux);
        setChassi({value: VeiculoAux.Veiculo_Chassi, error: ''});
        setPlaca({value: VeiculoAux.Veiculo_Placa, error: ''});
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

  const __onPressReservarVeiculo = async function() {
    setLoading(true);

    let DataError = dataValidator(Validade.value);
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

    if (DataError || AtendimentoError || (ChassiError && PlacaError)) {
      setValidade({...Validade, error: DataError});

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
      if (DataError) {
        Alert.alert('Informação', DataError);
      }
    } else {
      //console.log('VeiculoCodigo : ' + VeiculoCodigo);
      setChassi({...Chassi, error: ''});
      setPlaca({...Placa, error: ''});

      let VeiculoAux;

      if (!VeiculoCodigoExterno) {
        VeiculoAux = await getVeiculoCod(Chassi.value, Placa.value);

        if (VeiculoAux) {
          setVeiculoCodigo(VeiculoAux.Veiculo_Codigo);
        } else {
          Alert.alert(
            'Informação',
            'Veículo não consta como Disponível em estoque, reserva não autorizada',
          );

          setLoading(false);
          return;
        }
      }

      //console.log('VeiculoCodigo : ' + VeiculoCodigo);

      let RetornoCadastro = await cadastrarReservaVeiculo(
        VeiculoCodigo ? VeiculoCodigo : VeiculoAux.Veiculo_Codigo,
        AtendimentoSelecionado.value,
        Validade.value,
      );

      if (RetornoCadastro && RetornoCadastro.Ok) {
        setHabilitarCampos(false);
        Alert.alert('Sucesso', 'Reserva efetuada.');
      } else {
        Alert.alert('Mensagem', RetornoCadastro.Erro);
      }
    }

    setLoading(false);
  };

  return (
    <Container
      scroll={true}
      tela="Reserva de Veículos"
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
            label: 'Atendimentos',
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
              backgroundColor:
                !VeiculoCodigoExterno && HabilitarCampos
                  ? 'white'
                  : theme.colors.terceary,
            }}
            returnKeyType="next"
            value={Chassi.value}
            onChangeText={text => setChassi({value: text, error: ''})}
            error={!!Chassi.error}
            errorText={Chassi.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={!VeiculoCodigoExterno && HabilitarCampos}
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
              backgroundColor:
                !VeiculoCodigoExterno && HabilitarCampos
                  ? 'white'
                  : theme.colors.terceary,
            }}
            returnKeyType="next"
            value={Placa.value}
            onChangeText={text => setPlaca({value: text, error: ''})}
            error={!!Placa.error}
            errorText={Placa.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={!VeiculoCodigoExterno && HabilitarCampos}
            //keyboardType="email-address"
          />
        </View>
      </View>

      <View style={styles.viewBase}>
        <View>
          <Text style={styles.label}>Validade:</Text>
        </View>
        <View
          style={{
            width: 150,
            marginLeft: 10,
          }}>
          <TextInputMask
            //placeholder={'Validade'}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            style={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -6,
              height: 40,
              backgroundColor: HabilitarCampos
                ? 'white'
                : theme.colors.terceary,
              borderWidth: 1,
              //borderColor: 'grey',
              borderRadius: 3,
              fontSize: fonts.tipo2,
              paddingLeft: 10,
            }}
            returnKeyType="next"
            value={Validade.value}
            onChangeText={text => setValidade({value: text, error: ''})}
            error={!!Validade.error}
            errorText={Validade.error}
            //autoCapitalize="none"
          />
        </View>
      </View>
      <View style={{...stylesGeral.ViewCamposCadastro, marginTop: 20}}>
        <Button
          mode="contained"
          disabled={!HabilitarCampos}
          onPress={__onPressReservarVeiculo}>
          Reservar
        </Button>
      </View>
    </Container>
  );
};
export default memo(ReservaVeiculos);
