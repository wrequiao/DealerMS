import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Container from '~/componentes/tela/Container';
import Global from '~/config/Global';
import {theme} from '~/core/theme';
import {fonts} from '~/core/fonts';
import pickerSelectStyles from '~/assets/styles/pickerStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import TextInput from '~/componentes/tela/TextInput';
import {RadioButton} from 'react-native-paper';
import Button from '~/componentes/tela/Button';
import TouchClick from '~/componentes/touch_click';
import ModalConsultarCliente from '~/componentes/modal-search';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneValidator,
  ajustarFormatoDadosCombo,
  CPF_CNPJValidator,
} from '~/core/utils';

import stylesGeral from '~/styles';
import styles from './styles';

import {
  getCamposCadAtendimento,
  cadastrarAtendimento,
  getAtendimentos,
  consultarClienteAtendimento,
} from '~/servicos/auth';
//import Touchable from 'react-native-platform-touchable';

const AtendimentosCadastro = props => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [ModoVisualizacao, setModoVisualizacao] = useState(false);
  const [AtendimentoCodigo, setAtendimentoCodigo] = useState();

  const [Midias, setMidias] = useState([]);
  const [MidiaSelecionada, setMidiaSelecionada] = useState(-1);
  const [MidiaDesc, setMidiaDesc] = useState('');
  const [NaturezasAtendimento, setNaturezasAtendimento] = useState([]);
  const [NaturezaAtendimentoSelec, setNaturezaAtendimentoSelec] = useState(-1);
  const [NaturezaAtendimentoDesc, setNaturezaAtendimentoDesc] = useState('');
  const [MeiosContato, setMeiosContato] = useState([]);
  const [MeioContatoSelecionado, setMeioContatoSelecionado] = useState(-1);
  const [MeioContatoDesc, setMeioContatoDesc] = useState('');

  const [Nome, setNome] = useState({value: '', error: ''});
  const [CPF_CNPJ, setCPFCNPJ] = useState({value: '', error: ''});
  const [Email, setEmail] = useState({value: '', error: ''});
  const [DDD1, setDDD1] = useState({value: '', error: ''});
  const [Telefone1, setTelefone1] = useState({value: '', error: ''});
  const [DDD2, setDDD2] = useState({value: '', error: ''});
  const [Telefone2, setTelefone2] = useState({value: '', error: ''});
  const [Assunto, setAssunto] = useState({value: '', error: ''});
  const [Descricao, setDescricao] = useState({value: '', error: ''});
  const [checkedRadioTemperatura, setCheckedRadioTemperatura] = useState(
    'FRIA',
  );
  const [DescricaoClienteParaBusca, setDescricaoClienteParaBusca] = useState({
    value: '',
    error: '',
  });

  const [DadosBuscaCliente, setDadosBuscaCliente] = useState([]);
  const [ExibirModalBuscaCliente, setExibirModalBuscaCliente] = useState(false);

  useEffect(() => {
    carregarDadosCadAtendimento();
  }, [inicioUseEffect]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const carregarDadosCadAtendimento = async function() {
    if (loading) return;
    setLoading(true);

    let AtendimentoCodigoAux = await AsyncStorage.getItem(
      '@Atendimento_Codigo',
    );

    let CamposCadastro = await getCamposCadAtendimento();
    //console.log(CamposCadastro);

    setNaturezasAtendimento(
      ajustarFormatoDadosCombo(
        CamposCadastro.NaturezasAtendimento,
        'Natureza_Atendimento_Codigo',
        'Natureza_Atendimento_Descricao',
      ),
    );

    setMeiosContato(
      ajustarFormatoDadosCombo(
        CamposCadastro.MeiosContato,
        'Meio_Contato_Codigo',
        'Meio_Contato_Descricao',
      ),
    );

    setMidias(
      ajustarFormatoDadosCombo(
        CamposCadastro.Midias,
        'Midia_Codigo',
        'Midia_Descricao',
      ),
    );

    //console.log('AtendimentoCodigoAux : ' + AtendimentoCodigoAux);
    if (AtendimentoCodigoAux) {
      await carregarDadosAtendimento(AtendimentoCodigoAux);
      setModoVisualizacao(true);

      await AsyncStorage.removeItem('@Atendimento_Codigo');
    }

    setLoading(false);
  };
  //if (loading || refreshing) return;

  const carregarDadosAtendimento = async function(AtendimentoCodigoAux) {
    //console.log('carregarDadosAtendimento');
    //console.log('AtendimentoCodigo : ' + AtendimentoCodigo);

    let Retorno = await getAtendimentos(null, null, null, AtendimentoCodigoAux);
    let AtendimentoOBJ = Retorno[0];

    console.log(AtendimentoOBJ);

    setNome({value: AtendimentoOBJ.Atendimento_Nome, error: ''});
    setCPFCNPJ({value: AtendimentoOBJ.Atendimento_Doc_Identif, error: ''});
    setEmail({value: AtendimentoOBJ.Atendimento_Email, error: ''});
    setDDD1({value: AtendimentoOBJ.Atendimento_DDD1, error: ''});
    setTelefone1({value: AtendimentoOBJ.Atendimento_Telefone1, error: ''});
    setDDD2({value: AtendimentoOBJ.Atendimento_DDD2, error: ''});
    setTelefone2({value: AtendimentoOBJ.Atendimento_Telefone2, error: ''});
    setAssunto({value: AtendimentoOBJ.Atendimento_Assunto, error: ''});
    setDescricao({value: AtendimentoOBJ.Atendimento_Descricao, error: ''});
    setMidiaDesc({value: AtendimentoOBJ.Atendimento_Midia_Desc, error: ''});
    setNaturezaAtendimentoDesc({
      value: AtendimentoOBJ.Atendimento_Natu_Anted_Desc,
      error: '',
    });
    setMeioContatoDesc({
      value: AtendimentoOBJ.Atendimento_Cont_Desc,
      error: '',
    });

    //console.log(AtendimentoOBJ.Atendimento_Nome);
  };

  const adicionarMascaraCampoCPFCNPJ = CPF_CNPJParm => {
    let CPF_CNPJAux = CPF_CNPJParm;
    //setCPFCNPJ({value: CPF_CNPJAux, error: ''});
    //console.log('adicionarMascaraCampoCPFCNPJ');
    //console.log('CPF_CNPJAux : ' + CPF_CNPJAux);
    //console.log('length : ' + CPF_CNPJAux.length);

    if (CPF_CNPJAux && CPF_CNPJAux.length > 0) {
      if (CPF_CNPJAux.length == 11) {
        // CPF
        if (!(CPF_CNPJAux.indexOf('.') > 0 || CPF_CNPJAux.indexOf('-') > 0)) {
          CPF_CNPJAux = `${CPF_CNPJAux.substring(0, 3)}.${CPF_CNPJAux.substring(
            3,
            6,
          )}.${CPF_CNPJAux.substring(6, 9)}-${CPF_CNPJAux.substring(9, 11)}`;
          //console.log('CPF_CNPJAux : ' + CPF_CNPJAux);

          setCPFCNPJ({value: CPF_CNPJAux, error: ''});
        }
      }

      if (CPF_CNPJAux.length == 14) {
        //CNPJ
        if (!(CPF_CNPJAux.indexOf('.') > 0 || CPF_CNPJAux.indexOf('/') > 0)) {
          CPF_CNPJAux = `${CPF_CNPJAux.substring(0, 2)}.${CPF_CNPJAux.substring(
            2,
            5,
          )}.${CPF_CNPJAux.substring(5, 8)}/${CPF_CNPJAux.substring(
            8,
            12,
          )}-${CPF_CNPJAux.substring(12, 14)}`;
          //console.log('CPF_CNPJAux : ' + CPF_CNPJAux);

          setCPFCNPJ({value: CPF_CNPJAux, error: ''});
        }
      }
    }
  };

  async function _onConfirmarPressed() {
    Keyboard.dismiss();

    if (ModoVisualizacao) {
      props.navigation.goBack();
    } else {
      setRefreshing(true);
      setLoading(true);

      const NomeError = nameValidator(Nome.value);
      const CPF_CNPJError = CPF_CNPJValidator(CPF_CNPJ.value);
      const EmailError = emailValidator(Email.value);
      const DDD1Error = nameValidator(DDD1.value, 'DDD 1');
      const Telefone1Error = phoneValidator(Telefone1.value, 'Telefone 1');
      const AssuntoError = nameValidator(Assunto.value, 'Assunto');
      const DescricaoError = nameValidator(Descricao.value, 'Descrição');

      if (
        NomeError ||
        CPF_CNPJError ||
        EmailError ||
        DDD1Error ||
        Telefone1Error ||
        AssuntoError ||
        DescricaoError
      ) {
        setNome({...Nome, error: NomeError});
        setCPFCNPJ({...CPF_CNPJ, error: CPF_CNPJError});
        setEmail({...Email, error: EmailError});
        setDDD1({...DDD1, error: DDD1Error});
        setTelefone1({...Telefone1, error: Telefone1Error});
        setAssunto({...Assunto, error: AssuntoError});
        setDescricao({...Descricao, error: DescricaoError});

        setLoading(false);
        return;
      }

      let Atendimento = new Object();

      Atendimento.Nome = Nome.value;
      Atendimento.CPF_CNPJ = CPF_CNPJ.value
        .replace('.', '')
        .replace('.', '')
        .replace('/', '')
        .replace('-', '');
      Atendimento.Email = Email.value;
      Atendimento.DDD1 = DDD1.value;
      Atendimento.Telefone1 = Telefone1.value;
      Atendimento.DDD2 = DDD2.value;
      Atendimento.Telefone2 = Telefone2.value;
      Atendimento.Assunto = Assunto.value;
      Atendimento.Descricao = Descricao.value;
      Atendimento.Midia = MidiaSelecionada;
      Atendimento.NaturezaAtendimento = NaturezaAtendimentoSelec;
      Atendimento.MeioContato = MeioContatoSelecionado;
      Atendimento.Temperatura = checkedRadioTemperatura;

      let RetornoCadastro = await cadastrarAtendimento(Atendimento);
      //console.log(RetornoCadastro);

      if (RetornoCadastro && RetornoCadastro.Ok) {
        //console.log('Cadastro OK');
        //console.log('RetornoCadastro');

        Alert.alert('Informação', 'Atendimento cadastro com sucesso.', [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate('AtendimentosListagem'),
          },
        ]);
      } else {
        if (!RetornoCadastro) {
          Alert.alert('Informação', 'Houve um problema ao efetuar o cadastro!');
        } else {
          Alert.alert('Informação', RetornoCadastro.Erro);
        }

        setLoading(false);
      }
    }
  }

  const handleBuscarCliente = async () => {
    if (DescricaoClienteParaBusca.value) {
      setLoading(true);
      let RetornoConsultarClienteAtendimento = await consultarClienteAtendimento(
        DescricaoClienteParaBusca.value,
      );
      console.log(
        'RetornoConsultarClienteAtendimento : ' +
          JSON.stringify(RetornoConsultarClienteAtendimento),
      );

      if (RetornoConsultarClienteAtendimento) {
        setDadosBuscaCliente(RetornoConsultarClienteAtendimento);

        if (RetornoConsultarClienteAtendimento.length > 0) {
          if (RetornoConsultarClienteAtendimento.length > 1) {
            setExibirModalBuscaCliente(true);
          } else {
            let DadosCliente = RetornoConsultarClienteAtendimento[0];

            setNome({value: DadosCliente.Cliente_Nome, error: ''});
            adicionarMascaraCampoCPFCNPJ(DadosCliente.Cliente_DocIdentif);
            setEmail({value: DadosCliente.Cliente_Email, error: ''});
            setDDD1({value: DadosCliente.Cliente_DDD1, error: ''});
            setTelefone1({value: DadosCliente.Cliente_Telefone1, error: ''});
            setDDD2({value: DadosCliente.Cliente_DDD2, error: ''});
            setTelefone2({value: DadosCliente.Cliente_Telefone2, error: ''});

            setDescricaoClienteParaBusca({value: '', error: ''});
          }
        } else {
          Alert.alert('Informação', 'Nenhum cliente encontrado');
          let TextoPesquisaAux = DescricaoClienteParaBusca.value;

          if (TextoPesquisaAux.match('[0-9]+')) {
            adicionarMascaraCampoCPFCNPJ(DescricaoClienteParaBusca.value);
          } else {
            setNome({value: DescricaoClienteParaBusca.value, error: ''});
          }
        }
      }

      setLoading(false);
    }
  };

  const setDadosCliente = DadosCliente => {
    //console.log("DadosCliente : "+JSON.stringify(DadosCliente));

    setNome({value: DadosCliente.Cliente_Nome, error: ''});
    adicionarMascaraCampoCPFCNPJ(DadosCliente.Cliente_DocIdentif);
    setEmail({value: DadosCliente.Cliente_Email, error: ''});
    setDDD1({value: DadosCliente.Cliente_DDD1, error: ''});
    setTelefone1({value: DadosCliente.Cliente_Telefone1, error: ''});
    setDDD2({value: DadosCliente.Cliente_DDD2, error: ''});
    setTelefone2({value: DadosCliente.Cliente_Telefone2, error: ''});

    setDescricaoClienteParaBusca({value: '', error: ''});
    setExibirModalBuscaCliente(false);
  };

  return (
    <>
      <Container
        scroll={true}
        tela="Cadastro de atendimento"
        exibirFiltro={false}
        loading={loading || refreshing}
        {...props}
        exibirHeader={true}>
        {ModoVisualizacao ? (
          <View style={stylesGeral.ViewCamposCadastro}>
            <TextInput
              label="Natureza do Atendimento"
              styleContainer={stylesGeral.ContainerIpunts}
              styleInput={{height: 45}}
              returnKeyType="next"
              value={NaturezaAtendimentoDesc.value}
              //onChangeText={text => setNome({value: text, error: ''})}
              error={!!NaturezaAtendimentoDesc.error}
              errorText={NaturezaAtendimentoDesc.error}
              //autoCapitalize="none"
              autoCompleteType="name"
              textContentType="name"
              editable={false}
              //keyboardType="email-address"
            />
          </View>
        ) : (
          <View style={stylesGeral.ViewCamposCadastro}>
            <Text style={stylesGeral.TextLabelsCadastro}>
              Natureza do Atendimento
            </Text>

            <RNPickerSelect
              placeholder={{
                label: 'Selecione...',
                color: 'black',
                fontSize: 18,
              }}
              style={pickerSelectStyles}
              Icon={() => {
                return <Chevron size={2} color="gray" />;
              }}
              useNativeAndroidPickerStyle={false}
              value={NaturezaAtendimentoSelec}
              onValueChange={NaturezaAtendimento => {
                setNaturezaAtendimentoSelec(NaturezaAtendimento);
              }}
              items={NaturezasAtendimento}
            />
          </View>
        )}

        {ModoVisualizacao ? (
          <View style={stylesGeral.ViewCamposCadastro}>
            <TextInput
              label="Meio de contato"
              styleContainer={stylesGeral.ContainerIpunts}
              styleInput={{height: 45}}
              returnKeyType="next"
              value={MeioContatoDesc.value}
              //onChangeText={text => setNome({value: text, error: ''})}
              error={!!MeioContatoDesc.error}
              errorText={MeioContatoDesc.error}
              //autoCapitalize="none"
              autoCompleteType="name"
              textContentType="name"
              editable={false}
              //keyboardType="email-address"
            />
          </View>
        ) : (
          <View style={stylesGeral.ViewCamposCadastro}>
            <Text style={stylesGeral.TextLabelsCadastro}>Meio de contato</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Selecione...',
                color: 'black',
                fontSize: 18,
              }}
              style={pickerSelectStyles}
              Icon={() => {
                return <Chevron size={2} color="gray" />;
              }}
              useNativeAndroidPickerStyle={false}
              value={MeioContatoSelecionado}
              onValueChange={MeioContato => {
                setMeioContatoSelecionado(MeioContato);
              }}
              items={MeiosContato}
            />
          </View>
        )}

        {ModoVisualizacao ? (
          <View style={stylesGeral.ViewCamposCadastro}>
            <TextInput
              label="Mídia"
              styleContainer={stylesGeral.ContainerIpunts}
              styleInput={{height: 45}}
              returnKeyType="next"
              value={MidiaDesc.value}
              //onChangeText={text => setNome({value: text, error: ''})}
              error={!!MidiaDesc.error}
              errorText={MidiaDesc.error}
              //autoCapitalize="none"
              autoCompleteType="name"
              textContentType="name"
              editable={false}
              //keyboardType="email-address"
            />
          </View>
        ) : (
          <View style={stylesGeral.ViewCamposCadastro}>
            <Text style={stylesGeral.TextLabelsCadastro}>Mídia</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Selecione...',
                color: 'black',
                fontSize: 18,
              }}
              style={pickerSelectStyles}
              Icon={() => {
                return <Chevron size={2} color="gray" />;
              }}
              useNativeAndroidPickerStyle={false}
              value={MidiaSelecionada}
              onValueChange={midia => {
                setMidiaSelecionada(midia);
              }}
              items={Midias}
            />
          </View>
        )}

        {!ModoVisualizacao && (
          <View style={stylesGeral.ViewCampoPesquisar}>
            <TextInput
              label="Pesquisar cliente..."
              styleContainer={stylesGeral.ContainerIpunts}
              mode="flat"
              styleInput={{
                //marginStart: -33,
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                fontSize: 80,
              }}
              returnKeyType="search"
              value={DescricaoClienteParaBusca.value}
              onChangeText={text =>
                setDescricaoClienteParaBusca({value: text, error: ''})
              }
              onSubmitEditing={handleBuscarCliente}
              error={!!DescricaoClienteParaBusca.error}
              errorText={DescricaoClienteParaBusca.error}
              autoCompleteType="name"
              textContentType="name"
              editable={!ModoVisualizacao}
            />
            <TouchClick onPress={handleBuscarCliente}>
              <Image
                style={{width: 43, height: 43, marginTop: 25, marginLeft: 15}}
                source={require('~/assets/pesquisar_cliente.png')}
              />
            </TouchClick>
          </View>
        )}
        <View style={stylesGeral.ViewCamposCadastro}>
          <TextInput
            label="Nome"
            styleContainer={stylesGeral.ContainerIpunts}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={Nome.value}
            onChangeText={text => setNome({value: text, error: ''})}
            error={!!Nome.error}
            errorText={Nome.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            editable={!ModoVisualizacao}
            //keyboardType="email-address"
          />
        </View>
        <View style={stylesGeral.ViewCamposCadastro}>
          <TextInput
            label="CPF/CNPJ"
            styleContainer={stylesGeral.ContainerIpunts}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={CPF_CNPJ.value}
            onChangeText={text => setCPFCNPJ({value: text, error: ''})}
            error={!!CPF_CNPJ.error}
            errorText={CPF_CNPJ.error}
            autoCapitalize="none"
            autoCompleteType="off"
            //textContentType="name"
            onBlur={() => adicionarMascaraCampoCPFCNPJ(CPF_CNPJ.value)}
            keyboardType="numbers-and-punctuation"
            editable={!ModoVisualizacao}
          />
        </View>
        <View style={stylesGeral.ViewCamposCadastro}>
          <TextInput
            label="Email"
            styleContainer={stylesGeral.ContainerIpunts}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={Email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!Email.error}
            errorText={Email.error}
            autoCapitalize="none"
            autoCompleteType="off"
            textContentType="emailAddress"
            keyboardType="email-address"
            editable={!ModoVisualizacao}
          />
        </View>
        <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="DDD"
            styleContainer={{...stylesGeral.ContainerIpunts, width: 70}}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={DDD1.value}
            onChangeText={text => setDDD1({value: text, error: ''})}
            error={!!DDD1.error}
            errorText={DDD1.error}
            //autoCapitalize="none"
            //autoCompleteType="name"
            //textContentType="name"
            //keyboardType="email-address"
            keyboardType="phone-pad"
            editable={!ModoVisualizacao}
          />
          <TextInput
            label="Telefone"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              width: 180,
              marginLeft: 20,
            }}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={Telefone1.value}
            onChangeText={text => setTelefone1({value: text, error: ''})}
            error={!!Telefone1.error}
            errorText={Telefone1.error}
            //autoCapitalize="none"
            //autoCompleteType="name"
            //textContentType="name"
            //keyboardType="email-address"
            keyboardType="phone-pad"
            editable={!ModoVisualizacao}
          />
        </View>
        <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <TextInput
            label="DDD"
            styleContainer={{...stylesGeral.ContainerIpunts, width: 70}}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={DDD2.value}
            onChangeText={text => setDDD2({value: text, error: ''})}
            error={!!DDD2.error}
            errorText={DDD2.error}
            //autoCapitalize="none"
            //autoCompleteType="name"
            //textContentType="name"
            //keyboardType="email-address"
            keyboardType="phone-pad"
            editable={!ModoVisualizacao}
          />
          <TextInput
            label="Telefone 2"
            styleContainer={{
              ...stylesGeral.ContainerIpunts,
              width: 180,
              marginLeft: 20,
            }}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={Telefone2.value}
            onChangeText={text => setTelefone2({value: text, error: ''})}
            error={!!Telefone2.error}
            errorText={Telefone2.error}
            //autoCapitalize="none"
            //autoCompleteType="name"
            //textContentType="name"
            //keyboardType="email-address"
            keyboardType="phone-pad"
            editable={!ModoVisualizacao}
          />
        </View>
        <View style={stylesGeral.ViewCamposCadastro}>
          <TextInput
            label="Assunto"
            styleContainer={stylesGeral.ContainerIpunts}
            styleInput={{height: 45}}
            returnKeyType="next"
            value={Assunto.value}
            onChangeText={text => setAssunto({value: text, error: ''})}
            error={!!Assunto.error}
            errorText={Assunto.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            //keyboardType="email-address"
            editable={!ModoVisualizacao}
          />
        </View>
        <View style={stylesGeral.ViewCamposCadastro}>
          <TextInput
            label="Descrição"
            styleContainer={stylesGeral.ContainerIpunts}
            returnKeyType="next"
            value={Descricao.value}
            onChangeText={text => setDescricao({value: text, error: ''})}
            error={!!Descricao.error}
            errorText={Descricao.error}
            //autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            //keyboardType="email-address"
            multiline={true}
            numberOfLines={8}
            editable={!ModoVisualizacao}
          />
        </View>
        <View style={stylesGeral.ViewCamposCadastro}>
          <Text
            style={{
              ...stylesGeral.TextLabelsCadastro,
              marginTop: 6,
              marginRight: 25,
              fontWeight: 'bold',
            }}>
            Temperatura
          </Text>
        </View>
        <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
          <RadioButton.Group
            onValueChange={value => setCheckedRadioTemperatura(value)}
            value={checkedRadioTemperatura}>
            <RadioButton color={theme.colors.primary} value="FRIA" />
            <Text
              style={{
                ...stylesGeral.TextLabelsCadastro,
                marginTop: 6,
                marginRight: 25,
              }}>
              Fria
            </Text>
            <RadioButton color={theme.colors.primary} value="MORNA" />
            <Text
              style={{
                ...stylesGeral.TextLabelsCadastro,
                marginTop: 6,
                marginRight: 25,
              }}>
              Morna
            </Text>
            <RadioButton color={theme.colors.primary} value="QUENTE" />
            <Text
              style={{
                ...stylesGeral.TextLabelsCadastro,
                marginTop: 6,
                marginRight: 25,
              }}>
              Quente
            </Text>
          </RadioButton.Group>
        </View>

        <View style={stylesGeral.ViewCamposCadastro}>
          <Button mode="contained" onPress={_onConfirmarPressed}>
            {ModoVisualizacao ? 'Voltar' : 'Confirmar'}
          </Button>
        </View>
      </Container>
      {ExibirModalBuscaCliente && (
        <ModalConsultarCliente
          Clientes={DadosBuscaCliente}
          ExibirModalBuscaCliente={ExibirModalBuscaCliente}
          setExibirModalBuscaCliente={setExibirModalBuscaCliente}
          setDadosCliente={setDadosCliente}
        />
      )}
    </>
  );
};

export default memo(AtendimentosCadastro);
