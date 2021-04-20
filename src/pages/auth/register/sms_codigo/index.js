import React, {memo, useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Background from '~/componentes/tela/Background';
import Logo from '~/componentes/tela/Logo';
import Header from '~/componentes/tela/Header';
import Button from '~/componentes/tela/Button';
import TextInput from '~/componentes/tela/TextInput';
import BackButton from '~/componentes/tela/BackButton';
import {
  isAuthFirebase,
  signIn,
  solicitarValidacaoTelefoneSMS,
  validarCodigoTelefoneSMS,
} from '~/servicos/auth';

import styles from '../styles';

const RegisterScreen = ({route, navigation}) => {
  const [inicio, setInicio] = useState(true);
  const [CodigoSMS, setCodigoSMS] = useState({value: '', error: ''});
  const [ConfirmResult, setConfirmResult] = useState();
  const [VerificationID, setVerificationID] = useState();
  const Name = navigation.getParam('Name');
  const Email = navigation.getParam('Email');
  const Password = navigation.getParam('Password');
  const PhoneNumber = navigation.getParam('Phone');

  useEffect(async () => {
    let ConfirmResultAux = await solicitarValidacaoTelefoneSMS(PhoneNumber);

    //console.log(ConfirmResultAux);
    setConfirmResult(ConfirmResultAux);
  }, [inicio]);

  const _validarCodigoSMS = async () => {
    let retorno = await validarCodigoTelefoneSMS(
      ConfirmResult,
      CodigoSMS.value,
    );
    //console.log(retorno);

    if (retorno) {
      Alert.alert('Parabéns!', 'Cadastro concluído com sucesso.', [
        {
          text: 'Continuar',
          onPress: () => navigation.navigate('App'),
        },
      ]);
    } else {
      setCodigoSMS({value: '', error: 'Código de verificação inválido!'});
    }
  };

  return (
    <Background>
      <Logo />

      <Header>Insera o código SMS</Header>

      <TextInput
        label="Código"
        returnKeyType="done"
        value={CodigoSMS.value}
        onChangeText={text => setCodigoSMS({value: text, error: ''})}
        error={!!CodigoSMS.error}
        errorText={CodigoSMS.error}
        keyboardType="phone-pad"
      />

      <Button
        mode="contained"
        onPress={_validarCodigoSMS}
        style={styles.button}>
        Cadastrar
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Já possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(RegisterScreen);
