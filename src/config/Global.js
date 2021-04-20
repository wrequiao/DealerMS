export default {
  TEMPO_REFRESH: __DEV__ ? 1000 : 1000,
};

//Ajusta o objeto de retorno para o combo
export const ajustarFormatoDadosCombo = function(Data) {
  let NovoFormato = [];

  Data.forEach(function(Item) {
    let NovoItem = new Object();
    NovoItem.label = Item.CategoriaNome;
    NovoItem.value = Item.CategoriaCod;

    NovoFormato.push(NovoItem);
  });

  //console.log('ajustarFormatoDadosCombo : '+NovoFormato);
  return NovoFormato;
};

//Ajusta o objeto de retorno para o combo
export const ajustarFormatoDadosComboPaises = function(Data) {
  let NovoFormato = [];

  Data.forEach(function(Item) {
    let NovoItem = new Object();
    NovoItem.label = Item.nome;
    NovoItem.value = Item.numcode;

    NovoFormato.push(NovoItem);
  });

  //console.log('ajustarFormatoDadosCombo : '+NovoFormato);
  return NovoFormato;
};
