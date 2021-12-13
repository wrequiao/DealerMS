import AsyncStorage from '@react-native-community/async-storage';
import {
  autenticarUsuarioXMLSOAP,
  validarDominioAcessoXMLSOAP,
  getAtendimentosXMLSOAP,
  getCamposCadAtendimentoXMLSOAP,
  getCadAtendimentoXMLSOAP,
  getEstoqueVeiculosXMLSOAP,
  getCadastroDeReservaXMLSOAP,
  getDadosDashboardXMLSOAP,
  getConsultaClienteXMLSOAP,
  getCadastroDePropostaXMLSOAP,
  getPropostaVeiculosXMLSOAP
} from './SoapXMLs';
const XMLParser = require('react-xml-parser');

import {
  getEmpresasMap,
  getPerfisMap,
  getAtendimentosMap,
  getMidiasMap,
  getNaturezasAtendimentoMap,
  getMeiosContatoMap,
  getEstoqueVeiculosMap,
  getVendasDashboardMap,
  getOpcionaisVeiculoMap,
  getClientesMap,
  getImagemVeiculoMap,//new
  getImagensVeiculoMap,//new
} from './Maps';

let MotrarLog = false;
const MOSTRAR_RESPONSE = MotrarLog;
const MOSTRAR_DATA_ENVIO = MotrarLog;
const USUARIO_CADASTRADO = '@USUARIO_CADASTRADO';
const USUARIO_HASH = '@USUARIO_HASH';
const USUARIO_NOME = '@USUARIO_NOME';
const USUARIO_LOGIN = '@USUARIO_LOGIN';
const USUARIO_SENHA = '@USUARIO_SENHA';
const USUARIO_EMAIL = '@USUARIO_EMAIL';
const EMPRESAS = '@EMPRESAS';
const EMPRESA_SELECIONADA = '@EMPRESA_SELECIONADA';
const PERFIS = '@PERFIS';

const ACESSOU = '@ACESSOU';
const DOMINIO_ACESSO = '@DOMINIO_ACESSO';
const DOMINIO_ACESSO_AJUSTADO = '@DOMINIO_ACESSO_AJUSTADO';

const BASE_LINK =
  'https://{DOMINIO}/AprovadorGateway.WebSetup/AprovadorGateway.asmx';
const DOMINIO_DESENV = 'hello.dealerms.com.br';
//'https://hello.dealerms.com.br/AprovadorGateway.WebSetup/AprovadorGateway.asmx';

export const signIn = async (
  //parm_USUARIO_HASH,
  parm_USUARIO_LOGIN,
  parm_USUARIO_SENHA,
  parm_EMPRESAS,
  parm_EMPRESA_SELECIONADA,
  parm_PERFIS,
  //parm_USUARIO_EMAIL,
) => {
  //await AsyncStorage.setItem(USUARIO_HASH, parm_USUARIO_HASH);
  //await AsyncStorage.setItem(USUARIO_NOME, parm_USUARIO_NOME);
  //wait AsyncStorage.setItem(USUARIO_EMAIL, parm_USUARIO_EMAIL);

  await AsyncStorage.setItem(USUARIO_LOGIN, parm_USUARIO_LOGIN);
  await AsyncStorage.setItem(USUARIO_SENHA, parm_USUARIO_SENHA);
  await AsyncStorage.setItem(EMPRESAS, JSON.stringify(parm_EMPRESAS));
  await setEmpresasUsuarioSelecionada(parm_EMPRESA_SELECIONADA);
  await AsyncStorage.setItem(PERFIS, JSON.stringify(parm_PERFIS));
  await AsyncStorage.setItem(USUARIO_CADASTRADO, 'true');

  //console.log(parm_USUARIO_HASH);
  //console.log(parm_USUARIO_NOME);
  //console.log(parm_USUARIO_EMAIL);

  return true;
};

export const signOut = async () => {
  //console.log('signOut');
  //console.log(await getUsuario());

  //await AsyncStorage.removeItem(USUARIO_HASH);
  //await AsyncStorage.removeItem(USUARIO_NOME);
  //await AsyncStorage.removeItem(USUARIO_EMAIL);
  await AsyncStorage.setItem(USUARIO_CADASTRADO, 'false');

  await AsyncStorage.removeItem(USUARIO_LOGIN);
  await AsyncStorage.removeItem(USUARIO_SENHA);

  await AsyncStorage.removeItem(EMPRESAS);
  await AsyncStorage.removeItem(EMPRESA_SELECIONADA);
  await AsyncStorage.removeItem(PERFIS);
};

export const usuarioAcessouAPP = async () => {
  let Acessou = await AsyncStorage.getItem(ACESSOU);
  //console.log('Acessou : ' + Acessou);

  if (Acessou) {
    //await AsyncStorage.removeItem(ACESSOU);
    return true;
  } else {
    await AsyncStorage.setItem(ACESSOU, 'true');
    return false;
  }
};

export const getPrimeiroAcesso = async () => {
  await AsyncStorage.setItem(PRIMEIRO_ACESSO, 'false');
};

export const getUsuario = async () => {
  let Usuario = new Object();

  //Usuario.Hash = await AsyncStorage.getItem(USUARIO_HASH);
  //Usuario.Nome = await AsyncStorage.getItem(USUARIO_NOME);
  //Usuario.Email = await AsyncStorage.getItem(USUARIO_EMAIL);

  Usuario.Login = await AsyncStorage.getItem(USUARIO_LOGIN);
  Usuario.Senha = await AsyncStorage.getItem(USUARIO_SENHA);
  Usuario.Empresas = JSON.parse(await AsyncStorage.getItem(EMPRESAS));
  Usuario.EmpresaSelecionada = await AsyncStorage.getItem(EMPRESA_SELECIONADA);
  Usuario.Perfis = JSON.parse(await AsyncStorage.getItem(PERFIS));

  return Usuario;
};

export const getEmpresasUsuario = async () => {
  return JSON.parse(await AsyncStorage.getItem(EMPRESAS));
};

export const getPerfisUsuario = async () => {
  return JSON.parse(await AsyncStorage.getItem(PERFIS));
};

export const getEmpresasUsuarioSelecionada = async () => {
  return await AsyncStorage.getItem(EMPRESA_SELECIONADA);
};

export const setEmpresasUsuarioSelecionada = async parm_EMPRESA_SELECIONADA => {
  return await AsyncStorage.setItem(
    EMPRESA_SELECIONADA,
    parm_EMPRESA_SELECIONADA.toString(),
  );
};

export const cadastrarDominioAcesso = async parm_DOMINIO_ACESSO => {
  await AsyncStorage.setItem(DOMINIO_ACESSO, parm_DOMINIO_ACESSO);

  let DominioAux =
    parm_DOMINIO_ACESSO.substring(0, parm_DOMINIO_ACESSO.indexOf('.')) +
    '.dealerms.com.br';
  await AsyncStorage.setItem(DOMINIO_ACESSO_AJUSTADO, DominioAux);
  //console.log(parm_DOMINIO_ACESSO);

  return true;
};

export const getDominioAcesso = async () => {
  let DominioAcesso = await AsyncStorage.getItem(DOMINIO_ACESSO_AJUSTADO);

  return DominioAcesso;
};

export const getDominioAcessoOriginal = async () => {
  let DominioAcesso = await AsyncStorage.getItem(DOMINIO_ACESSO);

  return DominioAcesso;
};

export const isAuthPhone = async () => {
  const UsuarioCadastrado = await AsyncStorage.getItem(USUARIO_CADASTRADO);
  return UsuarioCadastrado === null || UsuarioCadastrado == 'false'
    ? false
    : true;
};

export const validarUsuarioSenha = async (Usuario, Senha) => {
  let Data = autenticarUsuarioXMLSOAP()
    .replace('{USUARIO}', Usuario)
    .replace('{SENHA}', Senha);

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);

  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let UsuarioSenhaValidos = RetornoCod.value == 1;

  if (UsuarioSenhaValidos) {
    let EmpresasXML = XMLResposta.getElementsByTagName('Empresa');
    let Empresas = getEmpresasMap(EmpresasXML);

    let PerfisXML = XMLResposta.getElementsByTagName('PerfilAcesso');
    let Perfis = getPerfisMap(PerfisXML);

    let DadosUsuario = new Object();
    DadosUsuario.Perfis = Perfis;
    DadosUsuario.Empresas = Empresas;

    return {Ok: true, Dados: DadosUsuario};
  } else {
    let RetornoErroXML = XMLResposta.getElementsByTagName('Mensagem')[0];
    let RetornoErroXML2 = XMLResposta.getElementsByTagName(
      'RetornoMensagem',
    )[0];

    return {Ok: false, Erro: RetornoErroXML.value || RetornoErroXML2.value};
  }
};

export const getRelatorioDashboard = async (DataInicial, DataFinal) => {
  let NovaDataInicial = '';
  let NovaDataFinal = '';
  try {
    let DataAux = DataInicial.split('/');
    NovaDataInicial = DataAux[2] + '-' + DataAux[1] + '-' + DataAux[0];

    DataAux = DataFinal.split('/');
    NovaDataFinal = DataAux[2] + '-' + DataAux[1] + '-' + DataAux[0];
  } catch (err) {
    console.log(err);
    return false;
  }

  let DadosUsuario = await getUsuario();
  let Data = getDadosDashboardXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace(/{SENHA}/g, DadosUsuario.Senha)
    .replace(/{EMPRESA_CODIGO}/g, DadosUsuario.EmpresaSelecionada)
    .replace('{DATA_INICIO}', NovaDataInicial)
    .replace('{DATA_FIM}', NovaDataFinal);

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log(XMLResposta);

  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod.value == 1;

  if (ValorRetorno) {
    let VendasXML = XMLResposta.getElementsByTagName('Vendas');
    let VendasAux = getVendasDashboardMap(VendasXML);

    return VendasAux ? VendasAux[0] : false;
  } else {
    return false;
  }
};

export const cadastrarAtendimento = async Atendimento => {
  let DadosUsuario = await getUsuario();
  let Data = getCadAtendimentoXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace('{SENHA}', DadosUsuario.Senha)
    .replace('{EMPRESA_CODIGO}', DadosUsuario.EmpresaSelecionada)
    .replace('{NOME}', Atendimento.Nome)
    .replace('{DDD1}', Atendimento.DDD1)
    .replace('{TELEFONE1}', Atendimento.Telefone1)
    .replace('{DDD2}', Atendimento.DDD2)
    .replace('{TELEFONE2}', Atendimento.Telefone2)
    .replace('{EMAIL}', Atendimento.Email)
    .replace('{DOC_IDENTIFICADOR}', Atendimento.CPF_CNPJ)
    .replace('{ASSUNTO}', Atendimento.Assunto)
    .replace('{DESCRICAO}', Atendimento.Descricao)
    .replace('{MIDIA_CODIGO}', Atendimento.Midia)
    .replace('{NATUREZA_ATEND_COD}', Atendimento.NaturezaAtendimento)
    .replace('{MEIO_CONTATO_CODIGO}', Atendimento.MeioContato);

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log(XMLResposta);

  let StatusAux = XMLResposta.getElementsByTagName('Status')[0];

  if (StatusAux && StatusAux.value != 'ERRO') {
    return {Ok: true};
  } else {
    let MensagemErro = XMLResposta.getElementsByTagName('Mensagem')[0];
    return {Ok: false, Erro: MensagemErro.value};
  }
};

export const cadastrarReservaVeiculo = async (
  Veiculo_Codigo,
  Atendimento,
  Validade,
) => {
  let NovaDataValidade = '';
  try {
    let DataAux = Validade.split('/');
    NovaDataValidade = DataAux[2] + '-' + DataAux[1] + '-' + DataAux[0];
  } catch (err) {
    console.log(err);
    return false;
  }

  let DadosUsuario = await getUsuario();
  let Data = getCadastroDeReservaXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace(/{SENHA}/g, DadosUsuario.Senha)
    .replace(/{EMPRESA_CODIGO}/g, DadosUsuario.EmpresaSelecionada)
    .replace('{VEICULO_CODIGO}', Veiculo_Codigo)
    .replace('{ATENDIMENTO_CODIGO}', Atendimento)
    .replace('{DATA_RESERVA}', NovaDataValidade);

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log(XMLResposta);

  let StatusAux = XMLResposta.getElementsByTagName('Status')[0];

  if (StatusAux && StatusAux.value != 'ERRO') {
    return {Ok: true};
  } else {
    let MensagemErro = XMLResposta.getElementsByTagName('Mensagem')[0];
    //console.log('Retorno Erro: '+JSON.stringify(MensagemErro.value));
    return {Ok: false, Erro: MensagemErro.value};
  }
};


export const cadastrarPropostaVeiculo = async (
  Veiculo_Codigo,
  Atendimento,
  PropostaObs, 
  Veiculo_Preco
) => {

  let DadosUsuario = await getUsuario();
  let Data = getCadastroDePropostaXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace(/{SENHA}/g, DadosUsuario.Senha)
    .replace(/{EMPRESA_CODIGO}/g, DadosUsuario.EmpresaSelecionada)
    .replace('{VEICULO_CODIGO}', Veiculo_Codigo)
    .replace('{ATENDIMENTO_CODIGO}', Atendimento)
    .replace('{VEICULO_OBS_PROPOSTA}', PropostaObs)
    .replace('{VEICULO_VALOR}', Veiculo_Preco)
    .replace('{VEICULO_VALOR}', Veiculo_Preco);
  
  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log('resposta')
  //console.log(XMLResposta);

  let StatusAux = XMLResposta.getElementsByTagName('Status')[0];

  if (StatusAux && StatusAux.value != 'ERRO') {
    return {Ok: true};
  } else {
    let MensagemErro = XMLResposta.getElementsByTagName('Mensagem')[0];
    //console.log('Retorno Erro: '+JSON.stringify(MensagemErro.value));
    return {Ok: false, Erro: MensagemErro.value.replace('ERRO', 'Proposta não criada')};
  }


};

export const getVeiculoCod = async (Chassi, Placa) => {
  let Veiculos = null;
  let Veiculo = null;

  let ChassiAux = Chassi ? Chassi.toUpperCase() : null;
  let PlacaAux = Placa ? Placa.toUpperCase() : null;

  if (ChassiAux) {
    Veiculos = await getEstoqueVeiculos('VN', ChassiAux);
    Veiculo = Veiculos ? Veiculos[0] : null;
  } else {
    if (PlacaAux) {
      Veiculos = await getEstoqueVeiculos('VN', PlacaAux);
      //console.log('Veiculos : ' + Veiculos);
      Veiculo = Veiculos ? Veiculos[0] : null;
    }
  }

  return Veiculo;
};

export const getEstoqueVeiculos = async (
  TipoEstoqueSelecionadoAux,
  BuscaDescricaoAux,
  ConsultaPorVeiculoCod = false,
  ConsultaImagemVeiculo = false,
) => {
  //let Data = await executarAPIJson('Estoque');
  //console.log(Data);
  //return Data;

  //console.log(ConsultaPorVeiculoCod);
  let TipoEstoqueSelecionado = TipoEstoqueSelecionadoAux
    ? TipoEstoqueSelecionadoAux
    : 'VN';

  //console.log('tipo do estoque');
  //console.log(TipoEstoqueSelecionado);

  let BuscaDescricao = BuscaDescricaoAux ? BuscaDescricaoAux : '';

  let DadosUsuario = await getUsuario();
  let Data = getEstoqueVeiculosXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace(/{SENHA}/g, DadosUsuario.Senha)
    .replace(/{EMPRESA_CODIGO}/g, DadosUsuario.EmpresaSelecionada)

    .replace('{ESTOQUE_TIPO}', TipoEstoqueSelecionado)
    .replace('{DESCRICAO}', BuscaDescricao)
    .replace('{FILTROIMAGEM}', ConsultaImagemVeiculo ? 1 : 0);//novo alterado tb getEstoqueVeiculosXMLSOAP

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);

  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod ? RetornoCod.value == 1 : false;

  if (ValorRetorno) {
    let EstoqueXML = XMLResposta.getElementsByTagName('Veiculo');
/*
//debug imagem
    console.log('EstoqueXML____LLimg7')
    for (let ItemOBJDataXML of EstoqueXML) 
    {
      let regs = ItemOBJDataXML.getElementsByTagName('Veiculo_Imagens');
      if(regs)
      {
        for (let img of regs) 
        { 
            if (img)
            {
              img.value = img.value.replace(/&amp;lt;/g, '<').replace(/&amp;gt;/g, '>');
              var xmlItens = new XMLParser().parseFromString(img.value);
              let xmlItensXml = xmlItens.getElementsByTagName('Veiculo_Imagem');
              for (let ItemOBJDataXMLi of xmlItensXml) 
              {
                let tipo = ItemOBJDataXMLi.getElementsByTagName('TipoImagem')[0];
                let imagem = ItemOBJDataXMLi.getElementsByTagName('Imagem')[0];
                if (tipo && imagem)
                {
                  console.log(tipo.value);
                  console.log(imagem.value);
                }
              }
            }
        }
      }
    }
    //debug imagem
*/

    let Estoque = getEstoqueVeiculosMap(EstoqueXML);

    if (ConsultaPorVeiculoCod) {
      let OpcionaisVeiculoXML = XMLResposta.getElementsByTagName('Opcional');
      if (Estoque) {
        let Veiculo_Opcionais = getOpcionaisVeiculoMap(OpcionaisVeiculoXML);
        
         //debug imagem
         let Veiculo_Imagens = new Array();
         for (let ItemOBJDataXML of EstoqueXML) 
         {
           let x = ItemOBJDataXML.getElementsByTagName('Veiculo_Imagens')[0];
           if (x){
              let y = new XMLParser().parseFromString('<Veiculo_Imagens>' + x.value + '</Veiculo_Imagens>')
              let regs = y.getElementsByTagName('Imagem');
              if(regs)
              {
                for (let img of regs) 
                { 
                  if (img)
                    {
                          //console.log('foreachveiculoimagem_11')                    
                          let OBJAuxI = new Object();
                          OBJAuxI['Imagem'] = img.value;
                          Veiculo_Imagens.push(OBJAuxI);
                    } 
                }
              }
            }
         }
         //debug imagem

        /*
        //debug imagem
            let Veiculo_Imagens = new Array();
            for (let ItemOBJDataXML of EstoqueXML) 
            {
              let regs = ItemOBJDataXML.getElementsByTagName('Veiculo_Imagens');//Veiculo_Imagens
              if(regs)
              {
                console.log('foreachveiculoimagem_3')
                  console.log(regs)
                for (let img of regs) 
                { 
                  console.log('foreachveiculoimagem_2')
                  console.log(img)
                    if (img)
                    {
                      img.value = img.value.replace(/&amp;lt;/g, '<').replace(/&amp;gt;/g, '>');
                      var xmlItens = new XMLParser().parseFromString(img.value);
                      let xmlItensXml = xmlItens.getElementsByTagName('Veiculo_Imagem');//Veiculo_Imagem
                      for (let ItemOBJDataXMLi of xmlItensXml) 
                      {
                        console.log('foreachveiculoimagem_1')
                        let imagem = ItemOBJDataXMLi.getElementsByTagName('Imagem')[0];
                        if (imagem)
                        {
                          let OBJAuxI = new Object();
                          OBJAuxI['Imagem'] = imagem.value;
                          Veiculo_Imagens.push(OBJAuxI);
                        }
                      }
                    }
                }
              }
            }
            //debug imagem
            */

        if (Veiculo_Opcionais || Veiculo_Imagens) {
          let OBJAux = new Object();
          OBJAux.DadosGerais = Estoque;
          
          if (Veiculo_Opcionais)
            OBJAux.Veiculo_Opcionais = Veiculo_Opcionais;
          
          if (Veiculo_Imagens){
            OBJAux.Veiculo_Imagens = Veiculo_Imagens;
          }
          return OBJAux;
        }
      }
    }

    return Estoque;
  } else {
    return false;
  }
};

export const getAtendimentos = async (
  ClienteNome,
  Documento,
  Status,
  AtendimentoCodigo,
) => {
  let StatusAux = Status == 'ABE' || Status == 'CON' ? Status : '';
  let DadosUsuario = await getUsuario();
  let Data = getAtendimentosXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace('{SENHA}', DadosUsuario.Senha)
    .replace('{EMPRESA_CODIGO}', DadosUsuario.EmpresaSelecionada)
    .replace('{CLIENTE_NOME}', ClienteNome ? ClienteNome : '')
    .replace('{DOCUMENTO}', Documento ? Documento : '')
    .replace('{STATUS}', StatusAux ? StatusAux : '')
    .replace(
      '{ATENDIMENTO_CODIGO}',
      AtendimentoCodigo ? AtendimentoCodigo : '',
    );

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log(XMLResposta);

  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod.value == 1;

  if (ValorRetorno) {
    let AtendimentosXML = XMLResposta.getElementsByTagName('Atendimento');
    let Atendimentos = getAtendimentosMap(AtendimentosXML);

    return Atendimentos;
  } else {
    return false;
  }
};

//BUSCA DE CLIENTES

export const consultarClienteAtendimento = async DescricaoCliente => {
  let DadosUsuario = await getUsuario();
  let Data = getConsultaClienteXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace('{SENHA}', DadosUsuario.Senha)
    .replace('{DADOS_CLIENTE}', DescricaoCliente ? DescricaoCliente : '');

  if (MOSTRAR_DATA_ENVIO) {
    console.log('Data:', Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log('XMLRESPOTA:' , XMLResposta);

  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod.value == 1;

  if (ValorRetorno) {
    let ClientesXML = XMLResposta.getElementsByTagName('Cliente');
    let Clientes = getClientesMap(ClientesXML);

    return Clientes;
  } else {
    let RetornoMensagem = XMLResposta.getElementsByTagName(
      'RetornoMensagem',
    )[0];
    console.log('RetornoMensagem : ' + JSON.stringify(RetornoMensagem));
    return false;
  }
};

export const getCamposCadAtendimento = async () => {
  let DadosUsuario = await getUsuario();
  let Data = getCamposCadAtendimentoXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace('{SENHA}', DadosUsuario.Senha)
    .replace('{EMPRESA_CODIGO}', DadosUsuario.EmpresaSelecionada);

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let XMLResposta = await executarAPIServico(Data);
  //console.log(XMLResposta);

  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod.value == 1;

  if (ValorRetorno) {
    let MidiasXML = XMLResposta.getElementsByTagName('Midia');
    let Midias = getMidiasMap(MidiasXML);

    let NaturezasAtendimentoXML = XMLResposta.getElementsByTagName(
      'NaturezaAtendimento',
    );
    let NaturezasAtendimento = getNaturezasAtendimentoMap(
      NaturezasAtendimentoXML,
    );

    let MeiosContatoXML = XMLResposta.getElementsByTagName('MeioContato');
    let MeiosContato = getMeiosContatoMap(MeiosContatoXML);

    let CamposCadAtendimento = new Object();

    CamposCadAtendimento.Midias = Midias;
    CamposCadAtendimento.NaturezasAtendimento = NaturezasAtendimento;
    CamposCadAtendimento.MeiosContato = MeiosContato;

    return CamposCadAtendimento;
  } else {
    return false;
  }
};

export const validarDominioAcesso = async DominioAcesso => {
  //let LinkAcesso = BASE_LINK.replace('{DOMINIO}', DominioAcesso);
  let Data = validarDominioAcessoXMLSOAP(); //.replace('{LINK_ACESSO}', LinkAcesso);

  if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }

  let DominioAux =
    DominioAcesso.substring(0, DominioAcesso.indexOf('.')) + '.dealerms.com.br';

  let XMLResposta = await executarAPIServico(Data, DominioAux, true);
  //console.log(XMLResposta);
  if (XMLResposta && XMLResposta.getElementsByTagName('RetornoCod')) {
    let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
    return RetornoCod.value == 1; // Se RetornoCod, link é valido
  } else {
    return false;
  }
};

export const executarAPIServico = async (
  Data,
  Dominio,
  DesconsiderarErroComunicacao = false,
) => {
  let URL = '';

  //console.log('Dominio : ' + Dominio);

  if (Dominio) {
    URL = BASE_LINK.replace('{DOMINIO}', Dominio);
  } else {
    if (__DEV__) {
      URL = BASE_LINK.replace('{DOMINIO}', await getDominioAcesso());
      //URL = BASE_LINK.replace('{DOMINIO}', DOMINIO_DESENV);
      //console.log('getDominioAcesso() : ' + getDominioAcesso());
    } else {
      URL = BASE_LINK.replace('{DOMINIO}', await getDominioAcesso());

      //console.log('getDominioAcesso() : ' + getDominioAcesso());
    }
  }

  //console.log(URL);

  try {
    
    let response = await fetch(URL, {
      method: 'POST',
      body: Data,
      headers: {
        'Content-Type': 'application/soap+xml',
        encoding: 'ISO-8859-1',
      },
    });

    let DataResponse = await response.text(); 
    
    //tratamento regex
    DataResponse = DataResponse.replace(/&lt;/g, '<');
    DataResponse = DataResponse.replace(/&gt;/g, '>');
    
    if (MOSTRAR_RESPONSE) console.log(DataResponse);
    
    var xml = new XMLParser().parseFromString(DataResponse);
    
    return xml;
  } catch (err) {
    //console.log(err);
    if (!DesconsiderarErroComunicacao)
      alert('Houve um erro ao executar a conexão. Erro: ' + err);
  }
};

//Função auxliar para verificar se a 'Data' esta vazia
export const getEmptyData = function(Data) {
  return JSON.stringify(Data) == '[]';
};

export const executarAPIJson = async Recurso => {
  let URL = 'http://fwcinformatica.com.br/db.json';
  //console.log(URL);

  try {
    let response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.log('Houve um erro ao executar a conexão JSON. Erro: ' + err);
  }
};


export const getPropostaVeiculos = async (
  TipoData,
  DtIni,
  DtFim,
  Atendimento,
  ChassiPlaca,
  Proposta,
  Pedido,
  TipoConsulta, 
  FluxoAtividade
) => {
  console.log('Data1');
  let DadosUsuario = await getUsuario();
  let Data = getPropostaVeiculosXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace(/{SENHA}/g, DadosUsuario.Senha)
    .replace(/{EMPRESA_CODIGO}/g, DadosUsuario.EmpresaSelecionada)
    .replace(/{TIPO_CONSULTA}/g, TipoConsulta)//L (Lista), D (Detalhe), F (Fluxo)
    .replace(/{FLUXO_ATIVIDADE}/g, FluxoAtividade)//opc 'Autorizar VN', 'Autorizar VU', 'Autorizar VD/VI','Autorizar VM'
    .replace(/{PROPOSTA_CODIGO}/g, Proposta)
    .replace(/{PROPOSTA_PEDIDO}/g, Pedido)
    .replace(/{ATENDIMENTO_CODIGO}/g, Atendimento)
    .replace(/{CHASSI_PLACA}/g, ChassiPlaca)
    .replace(/{TIPO_DATA}/g, TipoData)//TipoData.toString())
    .replace(/{DATA_INICIAL}/g, DtIni)
    .replace(/{DATA_FINAL}/g, DtFim)
    
 if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }
  
  let XMLResposta = await executarAPIServico(Data);
  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod ? RetornoCod.value == 1 : false;
  
  if (ValorRetorno) {
    let MidiasXML = XMLResposta.getElementsByTagName('Propostas');
    console.log(MidiasXML)
    let EstoqueXML = XMLResposta.getElementsByTagName('XMLRetorno')[0];
    let data = JSON.parse(EstoqueXML.value)
    return data;
  } else {
    return false;
  }
};


export const getPropostaVeiculosDetalhes = async (
  TipoData,
  DtIni,
  DtFim,
  Atendimento,
  ChassiPlaca,
  Proposta,
  Pedido,
  TipoConsulta, 
  FluxoAtividade
) => {
  
  let DadosUsuario = await getUsuario();
  let Data = getPropostaVeiculosXMLSOAP()
    .replace(/{USUARIO}/g, DadosUsuario.Login)
    .replace(/{SENHA}/g, DadosUsuario.Senha)
    .replace(/{EMPRESA_CODIGO}/g, DadosUsuario.EmpresaSelecionada)
    .replace(/{TIPO_CONSULTA}/g, TipoConsulta)//L (Lista), D (Detalhe), F (Fluxo)
    .replace(/{FLUXO_ATIVIDADE}/g, FluxoAtividade)//opc 'Autorizar VN', 'Autorizar VU', 'Autorizar VD/VI','Autorizar VM'
    .replace(/{PROPOSTA_CODIGO}/g, Proposta)
    .replace(/{PROPOSTA_PEDIDO}/g, Pedido)
    .replace(/{ATENDIMENTO_CODIGO}/g, Atendimento)
    .replace(/{CHASSI_PLACA}/g, ChassiPlaca)
    .replace(/{TIPO_DATA}/g, TipoData)//TipoData.toString())
    .replace(/{DATA_INICIAL}/g, DtIni)
    .replace(/{DATA_FINAL}/g, DtFim)
    
 if (MOSTRAR_DATA_ENVIO) {
    console.log(Data);
  }
  
  let XMLResposta = await executarAPIServico(Data);
  let RetornoCod = XMLResposta.getElementsByTagName('RetornoCod')[0];
  let ValorRetorno = RetornoCod ? RetornoCod.value == 1 : false;
  
  if (ValorRetorno) {
    //let MidiasXML = XMLResposta.getElementsByTagName('Propostas');
    //console.log('MidiasXML detalhes')
    //console.log(MidiasXML)
    let propostaXML = XMLResposta.getElementsByTagName('XMLRetorno')[0];
    let data = JSON.parse(propostaXML.value)
    //console.log('propostas detalhes com codigo data2') 
    //console.log(data.Propostas)
return data.Propostas;

    data.Propostas.forEach(function(propostas) {
       console.log('propostas detalhes com codigo') 
       let propostasRoot = propostas.Proposta
       //console.log(propostas) 
       propostasRoot.forEach(function(proposta) {
          console.log(proposta.Proposta_Codigo) 
          console.log('propostaforeach') 
          console.log(proposta) 
          return proposta;
          let custos = proposta.Custos.Custo
          console.log('custos')
          console.log(custos)
          custos.forEach(function(custo) {
            console.log(custo.Custo_Descricao)
            console.log(custo.Custo_Valor)
          })

          let parcelas = proposta.Parcelas.Parcela
          console.log('parcelas')
          console.log(parcelas)
          console.log('parcelas0')
          console.log(proposta.Parcelas)
          parcelas.forEach(function(parcela) {
            console.log(parcela.Parcela_Descricao)
          })
      })
    })
    

    //return true;
  } else {
    return false;
  }
};

