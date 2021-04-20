import React, {memo, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import {usuarioValidator} from '~/core/utils';
import Background from '~/componentes/tela/Background';
import BackButton from '~/componentes/tela/BackButton';
import Logo from '~/componentes/tela/Logo';
import HeaderLogin from '~/componentes/tela/HeaderLogin';
import TextInput from '~/componentes/tela/TextInput';
import Button from '~/componentes/tela/Button';
import {verificarExisteUsuario} from '~/servicos/auth';
import Global from '~/config/Global';
import Loading from '~/componentes/loading';

import {theme} from '~/core/theme';
import styles from './styles';

const ForgotPasswordScreen = ({navigation}) => {
  const TempoRefresh = Global.TEMPO_REFRESH;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inicio, setInicio] = useState(true);

  const [email, setEmail] = useState({value: '', error: ''});

  useEffect(() => {
    setRefreshing(true);
  }, [inicio]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, TempoRefresh);
    }
  }, [refreshing]);

  const _onSendPressed = async () => {
    Keyboard.dismiss();
    setRefreshing(true);
    setLoading(true);

    const emailError = usuarioValidator(email.value);

    if (emailError) {
      setEmail({...email, error: emailError});

      setLoading(false);
      return;
    } else {
      //let EmailUsuarioExiste = await verificarExisteUsuario(email.value);
      //console.log(EmailUsuarioExiste);

      if (false) {
        Alert.alert('Aviso', 'Email enviado com sucesso.', [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        setEmail({
          ...email,
          error: 'Este usuário não possui cadastro.',
        });

        setLoading(false);
        return;
      }

      setLoading(false);
    }
  };

  return (
    <Background scroll={true} loading={loading || refreshing}>
      <Logo />

      <HeaderLogin>Recuperar senha</HeaderLogin>

      <TextInput
        label="Usuário"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Enviar
      </Button>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(ForgotPasswordScreen);
