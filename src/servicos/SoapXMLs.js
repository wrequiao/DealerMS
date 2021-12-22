export const tratarParametros = Parametros => {
  return Parametros.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

export const autenticarUsuarioXMLSOAP = () => {
  let XML = `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
   <soap:Header />
   <soap:Body>
      <tem:AutenticarUsuario>
         <tem:Acesso>
            <tem:Usuario>{USUARIO}</tem:Usuario>
            <tem:Senha>{SENHA}</tem:Senha>
         </tem:Acesso>
         <tem:XMLParametros>?</tem:XMLParametros>
      </tem:AutenticarUsuario>
   </soap:Body>
</soap:Envelope>`;

  return XML;
};


export const validarDominioAcessoXMLSOAP = () => {
  let XML = `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
  <soap:Header />
  <soap:Body>
     <tem:ValidarURL>
        <tem:XMLParametros>{LINK_ACESSO}</tem:XMLParametros>
     </tem:ValidarURL>
  </soap:Body>
</soap:Envelope>`;

  return XML;
};

export const getCadAtendimentoXMLSOAP = () => {
  let Parametros = tratarParametros(`
   <Parametros>
         <Atendimento_EmpresaCodigo>{EMPRESA_CODIGO}</Atendimento_EmpresaCodigo>
         <Atendimento_Nome>{NOME}</Atendimento_Nome>
         <Atendimento_DDD1>{DDD1}</Atendimento_DDD1>
         <Atendimento_Telefone1>{TELEFONE1}</Atendimento_Telefone1>
         <Atendimento_DDD2>{DDD2}</Atendimento_DDD2>
         <Atendimento_Telefone2>{TELEFONE2}</Atendimento_Telefone2>
         <Atendimento_Email>{EMAIL}</Atendimento_Email>
         <Atendimento_DocumentoIdentificador>{DOC_IDENTIFICADOR}</Atendimento_DocumentoIdentificador>
         <Atendimento_Assunto>{ASSUNTO}</Atendimento_Assunto>
         <Atendimento_Descricao>{DESCRICAO}</Atendimento_Descricao>
         <Atendimento_UsuarioIdentificador>{USUARIO}</Atendimento_UsuarioIdentificador>
         <Atendimento_MidiaCodigo>{MIDIA_CODIGO}</Atendimento_MidiaCodigo>
         <Atendimento_NaturezaAtendimentoCodigo>{NATUREZA_ATEND_COD}</Atendimento_NaturezaAtendimentoCodigo>
         <Atendimento_MeioContatoCodigo>{MEIO_CONTATO_CODIGO}</Atendimento_MeioContatoCodigo>
   </Parametros>`);

  let XML =
    `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
      <soap:Header />
      <soap:Body>
         <tem:IncluirAtendimento>
            <tem:Acesso>
               <tem:Usuario>{USUARIO}</tem:Usuario>
               <tem:Senha>{SENHA}</tem:Senha>
            </tem:Acesso>
            <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
         </tem:IncluirAtendimento>
      </soap:Body>
   </soap:Envelope>`;
  return XML;
};

export const getAtendimentosXMLSOAP = () => {
  let Parametros = tratarParametros(`
  <Parametros>
  <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
  <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
  <Atendimento_CodigoDealer>{ATENDIMENTO_CODIGO}</Atendimento_CodigoDealer>
  <Cliente_Nome>{CLIENTE_NOME}</Cliente_Nome>
  <Cliente_Documento>{DOCUMENTO}</Cliente_Documento>
  <Atendimento_Status>{STATUS}</Atendimento_Status>
  </Parametros>`);

  let XML =
    `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
   <soap:Header />
   <soap:Body>
      <tem:ConsultarAtendimentos>
         <tem:Acesso>
            <tem:Usuario>{USUARIO}</tem:Usuario>
            <tem:Senha>{SENHA}</tem:Senha>
         </tem:Acesso>
         <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
      </tem:ConsultarAtendimentos>
   </soap:Body>
</soap:Envelope>`;

  return XML;
};

export const getCamposCadAtendimentoXMLSOAP = () => {
  let Parametros = tratarParametros(`
  <Parametros>
      <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
      <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
   </Parametros>`);

  let XML =
    `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
       <soap:Header />
       <soap:Body>
          <tem:ConsultarDadosCamposAtendimento>
             <tem:Acesso>
                <tem:Usuario>{USUARIO}</tem:Usuario>
                <tem:Senha>{SENHA}</tem:Senha>
             </tem:Acesso>
             <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
          </tem:ConsultarDadosCamposAtendimento>
       </soap:Body>
    </soap:Envelope>`;
  return XML;
};

export const getEstoqueVeiculosXMLSOAP = () => {
  let Parametros = tratarParametros(`
   <Parametros>
   <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
   <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
   <Estoque_Tipo>{ESTOQUE_TIPO}</Estoque_Tipo>
   <Busca_Descricao>{DESCRICAO}</Busca_Descricao>
   <Retorna_Imagem>{FILTROIMAGEM}</Retorna_Imagem> 
   </Parametros>`);

  let XML =
    `
 <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
    <soap:Header />
    <soap:Body>
       <tem:ConsultarEstoque>
          <tem:Acesso>
             <tem:Usuario>{USUARIO}</tem:Usuario>
             <tem:Senha>{SENHA}</tem:Senha>
          </tem:Acesso>
          <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
       </tem:ConsultarEstoque>
    </soap:Body>
 </soap:Envelope>`;

  return XML;
};

export const getCadastroDeReservaXMLSOAP = () => {
  let Parametros = tratarParametros(`
    <Parametros>
    <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
    <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
    <Veiculo_Codigo>{VEICULO_CODIGO}</Veiculo_Codigo>
    <Atendimento_Codigo>{ATENDIMENTO_CODIGO}</Atendimento_Codigo>
    <ValorEntrada>0</ValorEntrada>
    <DataFinalReserva>{DATA_RESERVA}</DataFinalReserva>
    </Parametros>`);

  let XML =
    `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
     <soap:Header />
     <soap:Body>
        <tem:IncluirReserva>
           <tem:Acesso>
              <tem:Usuario>{USUARIO}</tem:Usuario>
              <tem:Senha>{SENHA}</tem:Senha>
           </tem:Acesso>
           <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
        </tem:IncluirReserva>
     </soap:Body>
  </soap:Envelope>`;

  return XML;
};

export const getCadastroDePropostaXMLSOAP = () => {
   let Parametros = tratarParametros(`
   <SDT_PropostaDados>
     <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
     <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
     <DadosVeiculo>
      <Veiculo_Codigo>{VEICULO_CODIGO}</Veiculo_Codigo>
     </DadosVeiculo>
     <Atendimento_Codigo>{ATENDIMENTO_CODIGO}</Atendimento_Codigo>
     <Proposta_Valor>{VEICULO_VALOR}</Proposta_Valor>
     <Proposta_VeiculoValor>{VEICULO_VALOR}</Proposta_VeiculoValor>
     <Envia_Email>1</Envia_Email>
     <SMS>1</SMS>
     <Proposta_Observacao>{VEICULO_OBS_PROPOSTA}</Proposta_Observacao>
   </SDT_PropostaDados>`);
 

   let XML =
     `
   <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
      <soap:Header />
      <soap:Body>
         <tem:IncluirProposta>
            <tem:Acesso>
               <tem:Usuario>{USUARIO}</tem:Usuario>
               <tem:Senha>{SENHA}</tem:Senha>
            </tem:Acesso>
            <tem:XMLParametros>` +
     Parametros +
     `</tem:XMLParametros>
         </tem:IncluirProposta>
      </soap:Body>
   </soap:Envelope>`;
 
   return XML;
 };

 
export const getDadosDashboardXMLSOAP = () => {
  let Parametros = tratarParametros(`
     <Parametros>
     <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
     <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
     <Tipo_Consulta>DSB01</Tipo_Consulta>
     <Data_Inicio>{DATA_INICIO}</Data_Inicio>
     <Data_Fim>{DATA_FIM}</Data_Fim>
     </Parametros>`);

  let XML =
    `
   <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
      <soap:Header />
      <soap:Body>
         <tem:ConsultarDashboardVendas>
            <tem:Acesso>
               <tem:Usuario>{USUARIO}</tem:Usuario>
               <tem:Senha>{SENHA}</tem:Senha>
            </tem:Acesso>
            <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
         </tem:ConsultarDashboardVendas>
      </soap:Body>
   </soap:Envelope>`;

  return XML;
};

//BUSCA DE CLIENTES

export const getConsultaClienteXMLSOAP = () => {
  let Parametros = tratarParametros(`
<Parametros>
 <Busca_Descricao>{DADOS_CLIENTE}</Busca_Descricao>
</Parametros> `);

  let XML =
    `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
         <soap:Header/>
         <soap:Body>
            <tem:ConsultarCliente>
            <tem:Acesso>
               <tem:Usuario>{USUARIO}</tem:Usuario>
               <tem:Senha>{SENHA}</tem:Senha>
            </tem:Acesso>
            <tem:XMLParametros>` +
    Parametros +
    `</tem:XMLParametros>
               </tem:ConsultarCliente>
         </soap:Body>
      </soap:Envelope>`;
  return XML;
};


export const getPropostaVeiculosXMLSOAP = () => {
   let Parametros = tratarParametros(`
    <Parametros>
    <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
    <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
    <Tipo_Consulta>{TIPO_CONSULTA}</Tipo_Consulta>
    <Fluxo_Atividade>{FLUXO_ATIVIDADE}</Fluxo_Atividade>
    <Proposta_Codigo>{PROPOSTA_CODIGO}</Proposta_Codigo> 
    <Proposta_Pedido>{PROPOSTA_PEDIDO}</Proposta_Pedido> 
    <Atendimento_Codigo>{ATENDIMENTO_CODIGO}</Atendimento_Codigo> 
    <Chassi_Placa>{CHASSI_PLACA}</Chassi_Placa> 
    <Tipo_Data>{TIPO_DATA}</Tipo_Data> 
    <Data_Inicial>{DATA_INICIAL}</Data_Inicial> 
    <Data_Final>{DATA_FINAL}</Data_Final> 
    </Parametros>`);
 
   let XML =
     `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
     <soap:Header />
     <soap:Body>
        <tem:ConsultarProposta>
           <tem:Acesso>
              <tem:Usuario>{USUARIO}</tem:Usuario>
              <tem:Senha>{SENHA}</tem:Senha>
           </tem:Acesso>
           <tem:XMLParametros>` +
     Parametros +
     `</tem:XMLParametros>
        </tem:ConsultarProposta>
     </soap:Body>
  </soap:Envelope>`;
 
   return XML;
 };



 export const getCustosVeiculosSimulacaoXMLSOAP = () => {
   let Parametros = tratarParametros(`
    <Parametros>
    <Empresa_Codigo>{EMPRESA_CODIGO}</Empresa_Codigo>
    <Usuario_Identificador>{USUARIO}</Usuario_Identificador>
    <Tipo_Consulta>{TIPO_CONSULTA}</Tipo_Consulta>
    <Fluxo_Atividade>{FLUXO_ATIVIDADE}</Fluxo_Atividade>
    <Proposta_Codigo>{PROPOSTA_CODIGO}</Proposta_Codigo> 
    <Proposta_Pedido>{PROPOSTA_PEDIDO}</Proposta_Pedido> 
    <Atendimento_Codigo>{ATENDIMENTO_CODIGO}</Atendimento_Codigo> 
    <Chassi_Placa>{CHASSI_PLACA}</Chassi_Placa> 
    <Tipo_Data>{TIPO_DATA}</Tipo_Data> 
    <Data_Inicial>{DATA_INICIAL}</Data_Inicial> 
    <Data_Final>{DATA_FINAL}</Data_Final> 
    <Valor_Simulacao>{VALOR_SIMULACAO}</Valor_Simulacao> 
    <Veiculo_Simulacao>{VEICULO_SIMULACAO}</Veiculo_Simulacao> 
    </Parametros>`);
 
   let XML =
     `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
     <soap:Header />
     <soap:Body>
        <tem:ConsultarProposta>
           <tem:Acesso>
              <tem:Usuario>{USUARIO}</tem:Usuario>
              <tem:Senha>{SENHA}</tem:Senha>
           </tem:Acesso>
           <tem:XMLParametros>` +
     Parametros +
     `</tem:XMLParametros>
        </tem:ConsultarProposta>
     </soap:Body>
  </soap:Envelope>`;
 
   return XML;
 };

 
