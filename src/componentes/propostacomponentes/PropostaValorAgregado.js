import React from 'react';
import {View, Image, ScrollView, Dimensions, Text, StyleSheet, TouchableHighlight} from 'react-native';
import TextInput from '~/componentes/tela/TextInput';
import moment from 'moment';

const {width} = Dimensions.get("window");
const height = width * 0.6
//const { width, height } = Dimensions.get('window')


export default class PropostaValorAgregado extends React.Component{
   
    render(){
        return(
            
          <ScrollView pagingEnabled 
                onScroll={this.change}
                showsHorizontalScrollIndicator={true}>
                <View>

                <View >
                    <Text style={{...styles.textoDados, textAlign: 'auto', fontWeight: "bold", paddingBottom: "5%"}}>
                        Valores Agregados
                    </Text> 
                </View>

            {this.props.ValoresAgregados ? this.props.ValoresAgregados.map(agregado => {
                        return (

                          <View>
                            <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                            <Text style={{...styles.textoDados, textAlign: 'auto', width: '65%'}}>
                            {agregado.ValorAgregado_Descricao}
                            </Text> 
                        
                            <Text style={{...styles.textoDados, textAlign: 'auto', width: '6%'}}>
                                {'(' + agregado.ValorAgregado_Sinal + ')'}
                            </Text>  

                            <Text style={{...styles.textoDados, textAlign: 'auto', width: '30%'}}>
                                {'R$ ' + agregado.ValorAgregado_Valor}
                            </Text> 

                            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: '5%'}}>
                              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                            </View>

                            </View>
                        </View>
                        )
                    }) : (<></>)}

                        <View style={{...stylesGeral.ViewCamposCadastro, alignItems: 'flex-end'  }}>
                          <Text style={{...styles.textoDados, alignSelf: 'flex-end', paddingRight: '10%', paddingTop: '10%'}}>
                          {'Total: R$ ' + this.props.TotalAgregado}
                          </Text> 
                        </View>
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