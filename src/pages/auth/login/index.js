import React, {memo, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import Background from '~/componentes/tela/Background';
import Logo from '~/componentes/tela/Logo';
import Button from '~/componentes/tela/Button';
import TextInput from '~/componentes/tela/TextInput';
import {usuarioValidator, passwordValidator} from '~/core/utils';
import Global from '~/config/Global';

import {signIn, validarUsuarioSenha, usuarioAcessouAPP} from '~/servicos/auth';

import styles from './styles';

const LoginScreen = ({navigation}) => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicio, setInicio] = useState(true);

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  useEffect(() => {
    verificarUsuarioAcessouAPP();
    setRefreshing(true);
  }, [inicio]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const verificarUsuarioAcessouAPP = async () => {
    if (!(await usuarioAcessouAPP())) navigation.navigate('CadLinkAcesso'); // Tela de cadastro do dominio
  };

  const _onLoginPressed = async () => {
    Keyboard.dismiss();
    setRefreshing(true);
    setLoading(true);

    if (__DEV__) {
      require('react-devtools');
      import('~/config/ReactotronConfig');
      //email.value = 'FERNANDO.DESENVAPP';
      //password.value = 'Dealernet@133';
      //email.value = 'volney';
      //password.value = 'Dealer@2020';
    }

    const usuarioError = usuarioValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (usuarioError || passwordError) {
      setEmail({...email, error: usuarioError});
      setPassword({...password, error: passwordError});

      setLoading(false);
      return;
    }

    let RetornoValidacao = await validarUsuarioSenha(
      email.value,
      password.value,
    );
    //console.log(UsuarioSenhaValidados);

    if (RetornoValidacao && RetornoValidacao.Ok) {
      //console.log('Usuario validado com sucesso!');
      console.log('Login OK');
      let Empresas = RetornoValidacao.Dados.Empresas;
      let Perfis = RetornoValidacao.Dados.Perfis;
      let Empresadefault = Empresas.filter(empresa => (empresa.Empresa_Default != '0'));

      if (Empresas[0]) {
        let EmpresaSelecionada = Empresadefault[0].Empresa_Codigo;

        await signIn(
          email.value,
          password.value,
          Empresas,
          EmpresaSelecionada,
          Perfis,
        ); //Gravar dados do usuário
        navigation.navigate('App'); // Tela inicial do App
      } else {
        Alert.alert(
          'Informação',
          'Nenhuma empresa vinvulada ao usuário informado! Verifique com o suporte.',
        );
      }
    } else {
      setEmail({...email, error: 'Usuário inválido'});
      setPassword({...password, error: 'Senha inválida'});

      Alert.alert('Informação', RetornoValidacao.Erro);
    }

    setLoading(false);
  };

  return (
    <Background scroll={true} loading={loading || refreshing}>
      <Logo />

      <TextInput
        label="Usuário"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        //keyboardType="email-address"
      />

      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.label}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('CadLinkAcesso')}>
          <Text style={styles.link}>Cadastrar/ Editar link de acesso</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(LoginScreen);
