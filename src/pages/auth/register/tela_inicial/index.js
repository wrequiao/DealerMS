import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Background from '~/componentes/tela/Background';
import Logo from '~/componentes/tela/Logo';
import Header from '~/componentes/tela/Header';
import Button from '~/componentes/tela/Button';
import TextInput from '~/componentes/tela/TextInput';
import BackButton from '~/componentes/tela/BackButton';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneValidator,
} from '~/core/utils';

import styles from '../styles';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [phoneNumber, setPhone] = useState({value: '', error: ''});

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(phoneNumber.value);

    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setPhone({...phoneNumber, error: phoneError});
      return false;
    }

    navigation.navigate('NumberValidade', {
      Name: name.value,
      Email: email.value,
      Password: password.value,
      Phone: '+55' + phoneNumber.value,
    });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Login')} />

      <Logo />

      <Header>Criar Conta</Header>

      <TextInput
        label="Nome"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Senha"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Telefone"
        returnKeyType="done"
        value={phoneNumber.value}
        onChangeText={text => setPhone({value: text, error: ''})}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
        keyboardType="phone-pad"
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Próximo
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
