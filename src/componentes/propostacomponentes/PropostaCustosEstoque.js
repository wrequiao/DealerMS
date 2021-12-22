import React, {useState, useEffect, memo} from 'react';
import {View, Image, ScrollView, Dimensions, Text, StyleSheet, TouchableHighlight} from 'react-native';
import TextInput from '~/componentes/tela/TextInput';

const {width} = Dimensions.get("window");
const height = width * 0.6
//const { width, height } = Dimensions.get('window')
const [ValorSimulacaoNew, setValorSimulacaoNew] = useState(0);

export default class PropostaCustosEstoque extends React.Component{
   
    render(){
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
                        value={'R$ ' + this.props.PropostaD.Proposta_Valor}
                        onChangeText={text => setValorSimulacaoNew(text)}
                    />
                    <TextInput
                        label="Total Custo"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'R$ ' + this.props.PropostaD.Proposta_CustoTotal}
                    />
                    </View>

                    <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                    <TextInput
                        label="Resultado"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '60%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'R$ ' + this.props.PropostaD.Proposta_Margem}
                    />
                    <TextInput
                        label="%"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '40%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_PercMargem + '%'}
                    />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: '5%'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>

                <View >
                    <Text style={{...styles.textoDados, textAlign: 'auto', fontWeight: "bold", paddingBottom: "5%"}}>
                        Composição do Custo
                    </Text> 
                </View>
                
                {this.props.Custos ? this.props.Custos.map(custo => {
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
}

const style = StyleSheet.create({
    container: {marginTop: 10, width, height, marginBottom: 30, alignSelf: 'center'},
    scroll: {width, height},
    image: {width, height, resizeMode: 'contain'},
    pagination: {flexDirection:'row', position: 'absolute', bottom: -25, alignSelf: 'center'},
    pagingText: {fontSize: (width / 30), color: '#888', margin: 3},
    pagingActiveText: {fontSize: (width / 30), color: '#000', margin: 3},

})