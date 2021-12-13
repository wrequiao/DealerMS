import React from 'react';
import {View, Image, ScrollView, Dimensions, Text, StyleSheet, TouchableHighlight} from 'react-native';
import TextInput from '~/componentes/tela/TextInput';
import moment from 'moment';

const {width} = Dimensions.get("window");
const height = width * 0.6
//const { width, height } = Dimensions.get('window')


export default class PropostaGeral extends React.Component{
   
    render(){
        return(
                     
            <View>
            <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Proposta"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '30%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Codigo+'' }
                      />
                
                <TextInput
                        label="Pedido"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '30%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Pedido+''}
                      /> 
                
                <TextInput
                        label="Valor"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '40%',}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'R$ ' + this.props.PropostaD.Proposta_Valor}
                      />  
                </View>
      
              <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Vendedor"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '67%',}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Vendedor+'' }
                      />
                
                <TextInput
                        label="Nota Fiscal"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_NotaFiscalNumero+''}
                      /> 
                </View>
      
              <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Cliente"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '100%',}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_ClienteNome+'' }
                      />
                </View>
      
              <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Empresa"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '100%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_EmpresaNome+'' }
                      />
                </View>
      
              <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Chassi"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Chassi+'' }
                      />
                
                <TextInput
                        label="Placa"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Placa ? this.props.PropostaD.Proposta_Placa+'' : ''}
                      /> 
                
                <TextInput
                        label="Ano"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_AnoModAnoFab+''}
                      />  
                </View>
      
              <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Cor"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Cor+'' }
                      />
                
                <TextInput
                        label="Dias Estoque"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_DiasEstoque ? this.props.PropostaD.Proposta_DiasEstoque+'' : ''}
                      /> 
                
                <TextInput
                        label="Status"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '33%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_Status+''}
                      />  
                </View>
      
              <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
              <TextInput
                        label="Status do Veículo"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Veiculo_Status+'' }
                      />
                <TextInput
                        label="Previsão de Entrega"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '50%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={this.props.PropostaD.Proposta_DataPrevisaoEntrega ? moment(this.props.PropostaD.Proposta_DataPrevisaoEntrega).format('DD-MM-YYYY') : ''}
                      /> 
                </View>
          </View>
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