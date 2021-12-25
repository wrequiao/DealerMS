import React, {useState, useEffect, memo} from 'react';
import {View, Image, ScrollView, Dimensions, Text, StyleSheet, TouchableHighlight} from 'react-native';
import TextInput from '~/componentes/tela/TextInput';
import Button from '~/componentes/tela/Button';
import {getEstoqueVeiculos, getCustosVeiculoSimulacao} from '~/servicos/auth';

const {width} = Dimensions.get("window");
const height = width * 0.6


const PropostaCustosEstoque = props => {
    const [ValorSimulacaoNew, setValorSimulacaoNew] = useState(props.PropostaD.Proposta_Valor);
    const [PropostaD, setPropostaD] = useState({});
    const [Custos, setCustos] = useState([]);
    const [Veiculo_Codigo, setVeiculo_Codigo] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const [inicioUseEffect, setinicioUseEffect] = useState(true);
  
    useEffect(() => {
        console.log('entrando na pagina modal')
        console.log(JSON.stringify(PropostaD))
        console.log('valor')
        setValorSimulacaoNew(props.PropostaD.Proposta_Valor)
         getCustosVeiculoSimulacaoGet();
      }, [inicioUseEffect]);
  
    const style = StyleSheet.create({
        container: {marginTop: 10, width, height, marginBottom: 30, alignSelf: 'center'},
        scroll: {width, height},
        image: {width, height, resizeMode: 'contain'},
        pagination: {flexDirection:'row', position: 'absolute', bottom: -25, alignSelf: 'center'},
        pagingText: {fontSize: (width / 30), color: '#888', margin: 3},
        pagingActiveText: {fontSize: (width / 30), color: '#000', margin: 3},

    })


async function _onCalcularPressed() {
    console.log('clickou')
}


        const getCustosVeiculoSimulacaoGet = async function() 
        {
          setLoading(true);
          let preco = parseFloat(ValorSimulacaoNew.replace('.','').replace(',', '.')) 
          let data = await getCustosVeiculoSimulacao(
            'C',
            '',
            '',
            '',
            '',
            '',
            '',
            'D',//TipoConsulta, 
            '',
            preco,
            Veiculo_Codigo 
            );
           
            //setLoading(false);
      
            data.forEach(function(propostas) {
              propostas.Proposta.forEach(function(proposta) {
                PropostasAux = proposta
              })
            });
      
            if (!PropostasAux){
              setLoading(false);
              Alert.alert('Informação', 'Consulta não retornou dados.');
              return
            }
      
            if (PropostasAux)
            this.props.PropostaD = PropostasAux
      
            if (PropostasAux.Custos)
            {
      
             
              PropostasAux.Custos.Custo.unshift({
                "Custo_Descricao":"Valor Presente",
                "Custo_Valor": PropostasAux.Proposta_ValorPresente
             })
             this.props.Custos = PropostasAux.Custos.Custo
          
              PropostasAux.Custos.Custo.forEach(function(item) 
              {
                if (item.Custo_Descricao == "Valor Agregado")
                {
                  setTotalAgregado(formatarTotalAgregado(item.Custo_Valor))
                }
              })
            }
            if (PropostasAux.ValoresAgregados)
              setValoresAgregados(PropostasAux.ValoresAgregados.ValorAgregado)
           
            setLoading(false)
           
            //return PropostasAux
      
      
            console.log('valores retornados')
            console.log(JSON.stringify(PropostaD))
            console.log('valores retornados2')
            console.log(JSON.stringify(Custos))
            console.log('valores retornados3')
            console.log(JSON.stringify(ValoresAgregados))
            console.log('valores retornados4')
            console.log(JSON.stringify(TotalAgregado))
           
            return PropostasAux
        }


        return(
                     
            <ScrollView pagingEnabled 
                onScroll={this.change}
                showsHorizontalScrollIndicator={true}>
                <View>
                <View>
                    <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                    <TextInput
                        label="Valor da Simulação"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={ ValorSimulacaoNew}
                        onChangeText={text => setValorSimulacaoNew(text)}
                    />
                    <TextInput
                        label="Total Custo"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'R$ ' + props.PropostaD.Proposta_CustoTotal}
                    />
                    </View>

                    <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                    <TextInput
                        label="Resultado"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '60%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'R$ ' + props.PropostaD.Proposta_Margem}
                    />
                    <TextInput
                        label="%"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '40%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={props.PropostaD.Proposta_PercMargem + '%'}
                    />
                    </View>
                </View>

                <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                        <Button mode="contained" onPress={_onCalcularPressed}>
                        Calcular
                        </Button>
                    </View>

                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: '5%'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>

                <View >
                    <Text style={{...styles.textoDados, textAlign: 'auto', fontWeight: "bold", paddingBottom: "5%"}}>
                        Composição do Custo
                    </Text> 
                </View>
                
                {props.Custos ? props.Custos.map(custo => {
                        return (
                        <View>
                            <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                            <Text style={{...styles.textoDados, textAlign: 'auto', width: '70%'}}>
                                {custo.Custo_Descricao}
                            </Text> 
                        
                            <Text style={{...styles.textoDados, textAlign: 'auto', width: '30%'}}>
                                {'R$ ' + custo.Custo_Valor}
                            </Text>  
                            </View>
                        </View>
                        )
                    }) : (<></>)}

            </View>
            </ScrollView>
    )
    }
//}

export default memo(PropostaCustosEstoque);
