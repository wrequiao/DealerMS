//Ajusta o objeto de retorno para o combo
export const ajustarFormatoDadosComboEmpresas = function(Data) {
  let NovoFormato = [];

  Data.forEach(function(Item) {
    let NovoItem = new Object();
    NovoItem.label = Item.Empresa_Nome;
    NovoItem.value = Item.Empresa_Codigo;

    NovoFormato.push(NovoItem);
    //console.log('ajustarFormatoDadosCombo : '+NovoFormato);
  });

  //console.log('ajustarFormatoDadosCombo : '+NovoFormato);
  return NovoFormato;
};
