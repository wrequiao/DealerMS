import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import Button from '~/componentes/tela/Button';
import TextInput from '~/componentes/tela/TextInput';

import {TextInputMask} from 'react-native-masked-text';
import {
  dataValidator,
  nameValidator,
  ajustarFormatoDadosCombo,
} from '~/core/utils';

import stylesGeral from '~/styles';
//import styles from './styles';
import {getRelatorioDashboard} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';

const Dashboard = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [DataInicial, setDataInicial] = useState('');
  const [DataFinal, setDataFinal] = useState('');
  const [VeiculosNovos, setVeiculosNovos] = useState('');
  const [VeiculosUsados, setVeiculosUsados] = useState('');
  const [VendaDireta, setVendaDireta] = useState('');
  const [TotalVN, setTotalVN] = useState('');
  const [TotalVU, setTotalVU] = useState('');
  const [TotalVD, setTotalVD] = useState('');

  useEffect(() => {
    setRefreshing(true);
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const __onConsultarPress = async function() {
    setLoading(true);
    let DataInicialError = dataValidator(DataInicial.value);
    let DataFinalError = dataValidator(DataFinal.value);

    if (DataInicialError || DataFinalError) {
      setDataInicial({...DataFinal, error: DataInicialError});
      setDataFinal({...DataFinal, error: DataFinalError});

      if (DataInicialError) {
        Alert.alert('Informação', DataInicialError);
      }
      if (DataFinalError) {
        Alert.alert('Informação', DataFinalError);
      }
    } else {
      let VendasDashBoard = await getRelatorioDashboard(
        DataInicial.value,
        DataFinal.value,
      );

      if (VendasDashBoard) {
        //console.log(VendasDashBoard);

        setVeiculosNovos(VendasDashBoard.QuantidadeVN);
        setVeiculosUsados(VendasDashBoard.QuantidadeVU);
        setVendaDireta(VendasDashBoard.QuantidadeVD);

        setTotalVN(VendasDashBoard.TotalVN);
        setTotalVU(VendasDashBoard.TotalVU);
        setTotalVD(VendasDashBoard.TotalVD);
      } else {
        setLoading(false);
        Alert.alert(
          'Informação',
          'Não foi encontrado nenhum dado para o período.',
        );
      }
    }
    setLoading(false);
  };

  return (
    <Container
      scroll={true}
      tela="Dashboard"
      loading={loading || refreshing}
      {...props}
      exibirHeader={true}
      exibirFiltro={false}>
      <View style={{...stylesGeral.ViewPadrao, width: '90%'}}>
        <Text
          style={{
            textAlign: 'left',
            color: 'grey',
            fontSize: fonts.tipo3,
          }}>
          Período:
        </Text>
      </View>
      <View
        style={{
          ...stylesGeral.ViewPadrao,
          flexDirection: 'row',
          marginTop: 20,
          //alignContent: 'center',
          width: '90%',
        }}>
        <View style={{width: 140}}>
          <TextInputMask
            placeholder="Inicial"
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            style={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -11,
              height: 40,
              borderWidth: 1,
              //borderColor: 'grey',
              borderRadius: 3,
              fontSize: fonts.tipo2,
              paddingLeft: 10,
            }}
            returnKeyType="next"
            value={DataInicial.value}
            onChangeText={text => setDataInicial({value: text, error: ''})}
            error={!!DataInicial.error}
            errorText={DataInicial.error}
          />
        </View>
        <View style={{width: 140, marginLeft: 30}}>
          <TextInputMask
            placeholder="Final"
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            style={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -11,
              height: 40,
              borderWidth: 1,
              //borderColor: 'grey',
              borderRadius: 3,
              fontSize: fonts.tipo2,
              paddingLeft: 10,
            }}
            returnKeyType="next"
            value={DataFinal.value}
            onChangeText={text => setDataFinal({value: text, error: ''})}
            error={!!DataFinal.error}
            errorText={DataFinal.error}
          />
        </View>
      </View>
      <View style={{...stylesGeral.ViewCamposCadastro, marginTop: 20}}>
        <Button mode="contained" onPress={__onConsultarPress}>
          Consultar
        </Button>
      </View>

      <View
        style={{...stylesGeral.ViewPadrao, marginBottom: 10, marginTop: 50}}>
        <View>
          <Text
            style={{
              fontSize: fonts.tipo4,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Veículos Novos:
          </Text>
        </View>
        <View
          style={{
            width: 140,
            marginLeft: 30,
            position: 'absolute',
            right: 0,
          }}>
          <TextInput
            //label="Final"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -5,
            }}
            styleInput={{
              height: 30,
              color: 'grey',
            }}
            returnKeyType="next"
            value={VeiculosNovos}
            //onChangeText={text => setVeiculosNovos({value: text, error: ''})}
            error={!!VeiculosNovos.error}
            errorText={VeiculosNovos.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>
      <View
        style={{...stylesGeral.ViewPadrao, marginBottom: 10, marginTop: 10}}>
        <View>
          <Text
            style={{
              fontSize: fonts.tipo4,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Total VN:
          </Text>
        </View>
        <View
          style={{
            width: 140,
            marginLeft: 30,
            position: 'absolute',
            right: 0,
          }}>
          <TextInput
            //label="Final"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -5,
            }}
            styleInput={{
              height: 30,
              color: 'grey',
            }}
            returnKeyType="next"
            value={TotalVN}
            //onChangeText={text => setTotalVN({value: text, error: ''})}
            error={!!TotalVN.error}
            errorText={TotalVN.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>

      <View
        style={{...stylesGeral.ViewPadrao, marginBottom: 10, marginTop: 10}}>
        <View>
          <Text
            style={{
              fontSize: fonts.tipo4,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Veículos Usados:
          </Text>
        </View>
        <View
          style={{
            width: 140,
            marginLeft: 30,
            position: 'absolute',
            right: 0,
          }}>
          <TextInput
            //label="Final"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -5,
            }}
            styleInput={{
              height: 30,
              color: 'grey',
            }}
            returnKeyType="next"
            value={VeiculosUsados}
            //onChangeText={text => setVeiculosUsados({value: text, error: ''})}
            error={!!VeiculosUsados.error}
            errorText={VeiculosUsados.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>
      <View
        style={{...stylesGeral.ViewPadrao, marginBottom: 10, marginTop: 10}}>
        <View>
          <Text
            style={{
              fontSize: fonts.tipo4,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Total VU:
          </Text>
        </View>
        <View
          style={{
            width: 140,
            marginLeft: 30,
            position: 'absolute',
            right: 0,
          }}>
          <TextInput
            //label="Final"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -5,
            }}
            styleInput={{
              height: 30,
              color: 'grey',
            }}
            returnKeyType="next"
            value={TotalVU}
            //onChangeText={text => setTotalVU({value: text, error: ''})}
            error={!!TotalVU.error}
            errorText={TotalVU.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>
      <View
        style={{
          ...stylesGeral.ViewPadrao,
          marginBottom: 10,
          marginTop: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: fonts.tipo4,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Venda Direta:
          </Text>
        </View>
        <View
          style={{
            width: 140,
            marginLeft: 30,
            position: 'absolute',
            right: 0,
          }}>
          <TextInput
            //label="Final"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -5,
            }}
            styleInput={{
              height: 30,
              color: 'grey',
            }}
            returnKeyType="next"
            value={VendaDireta}
            //onChangeText={text => setVendaDireta({value: text, error: ''})}
            error={!!VendaDireta.error}
            errorText={VendaDireta.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>
      <View
        style={{
          ...stylesGeral.ViewPadrao,
          marginBottom: 10,
          marginTop: 10,
          marginBottom: 50,
        }}>
        <View>
          <Text
            style={{
              fontSize: fonts.tipo4,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Total VD:
          </Text>
        </View>
        <View
          style={{
            width: 140,
            marginLeft: 30,
            position: 'absolute',
            right: 0,
          }}>
          <TextInput
            //label="Final"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              marginTop: -5,
            }}
            styleInput={{
              height: 30,
              color: 'grey',
            }}
            returnKeyType="next"
            value={TotalVD}
            //onChangeText={text => setTotalVD({value: text, error: ''})}
            error={!!TotalVD.error}
            errorText={TotalVD.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={false}
            //keyboardType="email-address"
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  Padrao: {
    flex: 1,
  },
});

export default memo(Dashboard);
