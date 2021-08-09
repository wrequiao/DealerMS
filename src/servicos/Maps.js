const XMLParser = require('react-xml-parser');

export const getValor = (ItemOBJDataXML, LabelXML) => {
  if (!(ItemOBJDataXML && LabelXML)) return null;

  let AuxValor = ItemOBJDataXML.getElementsByTagName(LabelXML)[0];

  return AuxValor ? AuxValor.value : null;
};

export const getObjectParser = (OBJDataXML, TabelaLinhasDeCamposCorresp) => {
  let ObjectParser = new Array();
  for (let ItemOBJDataXML of OBJDataXML) {
    let OBJAux = new Object();
    for (let Linha of TabelaLinhasDeCamposCorresp) {
      if (Linha.LabelXML != 'Veiculo_ImagemCapa' && Linha.LabelXML != 'Veiculo_ImagemCapaTipo'){//NEW
        OBJAux[Linha.LabelOBJ] = getValor(ItemOBJDataXML, Linha.LabelXML);
      }
      else//NEW
      { 
          if (Linha.LabelXML == 'Veiculo_ImagemCapa')
          {
            OBJAux[Linha.LabelOBJ] = extrairDadosImagem(Linha, ItemOBJDataXML, 'Imagem');
          }

          if (Linha.LabelXML == 'Veiculo_ImagemCapaTipo')
          {
            OBJAux[Linha.LabelOBJ] = extrairDadosImagem(Linha, ItemOBJDataXML, 'TipoImagem');
          } 
      }
    }
      //NEW
      
   // }
    ObjectParser.push(OBJAux);
  }


  return ObjectParser;
};

export const extrairDadosImagem = async (
  Linha, 
  ItemOBJDataXML, 
  TagInternaValor,
) => {

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
              let valorInterno = ItemOBJDataXMLi.getElementsByTagName(TagInternaValor)[0];
              if (valorInterno)
              {
                return valorInterno.value;
              }
            }
          }
      }
    }
}


export const getEmpresasMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Empresa_Codigo', LabelXML: 'Empresa_Codigo'},
    {LabelOBJ: 'Empresa_Nome', LabelXML: 'Empresa_Nome'},
    {LabelOBJ: 'Empresa_Default', LabelXML: 'Empresa_Default'},
  ];
  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getPerfisMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'PerfilAcesso_Codigo', LabelXML: 'PerfilAcesso_Codigo'},
    {LabelOBJ: 'PerfilAcesso_Descricao', LabelXML: 'PerfilAcesso_Descricao'},
    {LabelOBJ: 'Empresa_Nome', LabelXML: 'Empresa_Nome'},
    {LabelOBJ: 'Empresa_Nome', LabelXML: 'Empresa_Nome'},
    {LabelOBJ: 'Empresa_Nome', LabelXML: 'Empresa_Nome'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getAtendimentosMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Atendimento_Codigo', LabelXML: 'Atendimento_CodigoDealer'},
    {LabelOBJ: 'Atendimento_Status', LabelXML: 'Atendimento_Status'},
    {
      LabelOBJ: 'Atendimento_Empresa_Codigo',
      LabelXML: 'Atendimento_EmpresaCodigo',
    },
    {LabelOBJ: 'Atendimento_Nome', LabelXML: 'Atendimento_Nome'},
    {LabelOBJ: 'Atendimento_DDD1', LabelXML: 'Atendimento_DDD1'},
    {LabelOBJ: 'Atendimento_DDD2', LabelXML: 'Atendimento_DDD2'},
    {LabelOBJ: 'Atendimento_Telefone1', LabelXML: 'Atendimento_Telefone1'},
    {LabelOBJ: 'Atendimento_Telefone2', LabelXML: 'Atendimento_Telefone2'},
    {LabelOBJ: 'Atendimento_Email', LabelXML: 'Atendimento_Email'},
    {
      LabelOBJ: 'Atendimento_Doc_Identif',
      LabelXML: 'Atendimento_DocumentoIdentificador',
    },
    {LabelOBJ: 'Atendimento_DataHora', LabelXML: 'Atendimento_DataHora'},
    {LabelOBJ: 'Atendimento_Assunto', LabelXML: 'Atendimento_Assunto'},
    {LabelOBJ: 'Atendimento_Descricao', LabelXML: 'Atendimento_Descricao'},
    {
      LabelOBJ: 'Atendimento_Usu_Identif',
      LabelXML: 'Atendimento_UsuarioIdentificador',
    },
    {
      LabelOBJ: 'Atendimento_Midia_Desc',
      LabelXML: 'Atendimento_MidiaDescricao',
    },
    {
      LabelOBJ: 'Atendimento_Natu_Anted_Desc',
      LabelXML: 'Atendimento_NaturezaAtendimentoDescricao',
    },
    {
      LabelOBJ: 'Atendimento_Cont_Desc',
      LabelXML: 'Atendimento_MeioContatoDescricao',
    },
    {LabelOBJ: 'Atendimento_Via_APP', LabelXML: 'Atendimento_ViaApp'},
    {
      LabelOBJ: 'Atendimento_Midia_Desc',
      LabelXML: 'Atendimento_MidiaDescricao',
    },
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getMidiasMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Midia_Codigo', LabelXML: 'Midia_Codigo'},
    {LabelOBJ: 'Midia_Descricao', LabelXML: 'Midia_Descricao'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getNaturezasAtendimentoMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {
      LabelOBJ: 'Natureza_Atendimento_Codigo',
      LabelXML: 'NaturezaAtendimento_Codigo',
    },
    {
      LabelOBJ: 'Natureza_Atendimento_Descricao',
      LabelXML: 'NaturezaAtendimento_Descricao',
    },
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getMeiosContatoMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Meio_Contato_Codigo', LabelXML: 'MeioContato_Codigo'},
    {LabelOBJ: 'Meio_Contato_Descricao', LabelXML: 'MeioContato_Descricao'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getVendasDashboardMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'QuantidadeVN', LabelXML: 'QuantidadeVN'},
    {LabelOBJ: 'TotalVN', LabelXML: 'TotalVN'},
    {LabelOBJ: 'TotalVN', LabelXML: 'TotalVN'},
    {LabelOBJ: 'TotalMargemVN', LabelXML: 'TotalMargemVN'},
    {LabelOBJ: 'QuantidadeVU', LabelXML: 'QuantidadeVU'},
    {LabelOBJ: 'TotalVU', LabelXML: 'TotalVU'},
    {LabelOBJ: 'TotalMargemVU', LabelXML: 'TotalMargemVU'},
    {LabelOBJ: 'QuantidadeVD', LabelXML: 'QuantidadeVD'},
    {LabelOBJ: 'TotalVD', LabelXML: 'TotalVD'},
    {LabelOBJ: 'TotalMargemVD', LabelXML: 'TotalMargemVD'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getEstoqueVeiculosMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Veiculo_Codigo', LabelXML: 'Veiculo_CodigoDealer'},
    {LabelOBJ: 'Veiculo_Ano_Modelo', LabelXML: 'Veiculo_AnoMod'},
    {
      LabelOBJ: 'Veiculo_Ano_Fabricacao',
      LabelXML: 'Veiculo_AnoFab',
    },
    {LabelOBJ: 'Veiculo_Ano_Modelo', LabelXML: 'Veiculo_AnoMod'},
    {LabelOBJ: 'Veiculo_Chassi', LabelXML: 'Veiculo_Chassi'},

    {LabelOBJ: 'Veiculo_UF_Placa', LabelXML: 'Veiculo_UFPlaca'},
    {LabelOBJ: 'Veiculo_Placa', LabelXML: 'Veiculo_Placa'},
    {LabelOBJ: 'Veiculo_Modelo_Cod', LabelXML: 'Veiculo_ModeloCod'},
    {LabelOBJ: 'Veiculo_Modelo_Desc', LabelXML: 'Veiculo_ModeloDesc'},
    {
      LabelOBJ: 'Vaiculo_Familia_Cod',
      LabelXML: 'Vaiculo_FamiliaCod',
    },
    {LabelOBJ: 'Veiculo_Familia_Desc', LabelXML: 'Veiculo_FamiliaDesc'},
    {LabelOBJ: 'Veiculo_Marca', LabelXML: 'Veiculo_Marca'},
    {LabelOBJ: 'Veiculo_KM', LabelXML: 'Veiculo_KM'},
    {
      LabelOBJ: 'Veiculo_Combustivel',
      LabelXML: 'Veiculo_Combustivel',
    },
    {LabelOBJ: 'Veiculo_Cor', LabelXML: 'Veiculo_Cor'},
    {LabelOBJ: 'Veiculo_Empresa_Codigo', LabelXML: 'Veiculo_EmpresaCodigo'},
    {LabelOBJ: 'Veiculo_Empresa_Nome', LabelXML: 'Veiculo_EmpresaNome'},
    {LabelOBJ: 'Veiculo_Estoque_Tipo', LabelXML: 'Veiculo_EstoqueTipo'},
    {
      LabelOBJ: 'Veiculo_Estoque_Descricao',
      LabelXML: 'Veiculo_EstoqueDescricao',
    },
    {
      LabelOBJ: 'Veiculo_Descricao',
      LabelXML: 'Veiculo_Descricao',
    },
    {LabelOBJ: 'Veiculo_Dias_Estoque', LabelXML: 'Veiculo_DiasEstoque'},
    {LabelOBJ: 'Veiculo_Em_Transito', LabelXML: 'Veiculo_EmTransito'},
    {LabelOBJ: 'Veiculo_Preco', LabelXML: 'Veiculo_Preco'},

    {LabelOBJ: 'Veiculo_ImagemCapa', LabelXML: 'Veiculo_ImagemCapa'},//new
    {LabelOBJ: 'Veiculo_ImagemCapaTipo', LabelXML: 'Veiculo_ImagemCapaTipo'},//new
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);

};

export const getOpcionaisVeiculoMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Opcional_Codigo', LabelXML: 'Opcional_Codigo'},
    {LabelOBJ: 'Opcional_Descricao', LabelXML: 'Opcional_Descricao'},
    {LabelOBJ: 'Opcional_Valor', LabelXML: 'Opcional_Valor'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};


export const getClientesMap = DataXML => {
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Cliente_Codigo', LabelXML: 'Cliente_PessoaCodigo'},
    {LabelOBJ: 'Cliente_Nome', LabelXML: 'Cliente_Nome'},
    {LabelOBJ: 'Cliente_DDD1', LabelXML: 'Cliente_DDD1'},
    {LabelOBJ: 'Cliente_DDD2', LabelXML: 'Cliente_DDD2'},
    {LabelOBJ: 'Cliente_Telefone1', LabelXML: 'Cliente_Telefone1'},
    {LabelOBJ: 'Cliente_Telefone2', LabelXML: 'Cliente_Telefone2'},
    {LabelOBJ: 'Cliente_Email', LabelXML: 'Cliente_Email'},
    {LabelOBJ: 'Cliente_DocIdentif',LabelXML: 'Cliente_DocumentoIdentificador',},
    {LabelOBJ: 'Atendimento_DataHora', LabelXML: 'Atendimento_DataHora'},
    {LabelOBJ: 'Atendimento_Assunto', LabelXML: 'Atendimento_Assunto'},
    {LabelOBJ: 'Atendimento_Descricao', LabelXML: 'Atendimento_Descricao'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};


export const getVeiculoImagensMap = DataXML => {  //novo
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Veiculo_Imagens', LabelXML: 'Veiculo_Imagens'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};

export const getVeiculoImagemMap = DataXML => {  //novo
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'Veiculo_Imagem', LabelXML: 'Veiculo_Imagem'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};


export const getVeiculoImagemDetMap = DataXML => {  //novo
  let TabelaLinhasDeCamposCorresp = [
    {LabelOBJ: 'TipoImagem', LabelXML: 'TipoImagem'},
    {LabelOBJ: 'Imagem', LabelXML: 'Imagem'},
  ];

  return getObjectParser(DataXML, TabelaLinhasDeCamposCorresp);
};
