import {Linking} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const getPercentLayout = () => {
  return {wp: widthPercentageToDP, hp: heightPercentageToDP};
};

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email não pode ser vazio.';
  if (!re.test(email)) return 'Email válido.';

  return '';
};

export const dataValidator = data => {
  var re = new RegExp(
    '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$',
  );

  if (!data || data.length <= 0) return 'Data não pode ser vazia.';
  if (!re.test(data)) return 'Data inválida. Formato: 99/99/9999';

  return '';
};

export const CPF_CNPJValidator = CPF_CNPJ => {
  const re = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

  if (CPF_CNPJ)
    if (!re.test(CPF_CNPJ))
      return 'CPF/ CNPJ inválido. Formato: 555.555.555-55 ou 55.555.555/5555-55';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Senha não pode ser vazia.';

  return '';
};

export const usuarioValidator = usuario => {
  if (!usuario || usuario.length <= 0) return 'Usuário não pode ser vazio.';

  return '';
};

export const nameValidator = (name, Campo = 'Nome') => {
  if (!name || name.length <= 0) return Campo + ' não pode ser vazio.';

  return '';
};

export const phoneValidator = (phone, Campo = 'Telefone') => {
  if (!phone || phone.length <= 0) return Campo + ' não pode ser vazio.';

  return '';
};

//Ajusta o objeto de retorno para o combo
export const ajustarFormatoDadosCombo = function(Data, CampoCod, CampoDesc) {
  let NovoFormato = [];
  //console.log('Data : ' + Data);

  Data.forEach(function(Item) {
    let NovoItem = new Object();

    NovoItem.value = Item[CampoCod];
    NovoItem.label = Item[CampoDesc];

    NovoFormato.push(NovoItem);
  });

  //console.log('ajustarFormatoDadosCombo : ' + NovoFormato);
  return NovoFormato;
};

export const openURL = function(
  URL,
  MSGErro = 'Não é possível abrir esta URL',
) {
  Linking.canOpenURL(URL)
    .then(supported => {
      if (!supported) {
        alert(MSGErro);
      } else {
        return Linking.openURL(URL);
      }
    })
    .catch(err => console.error('Um erro ocorreu ao tentar abrir o link', err));
};
