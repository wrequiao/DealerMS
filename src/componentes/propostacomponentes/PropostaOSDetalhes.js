import React, { Component, useState, useRef, useEffect, memo } from 'react';
import { StyleSheet, View, ScrollView, Alert, Text, Button, Modal, Image, TouchableOpacity, Animated, } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInput from '~/componentes/tela/TextInput';

const PropostaOSDetalhes = props => {

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#ffffff' 
  },
  head: { 
    height: 50, 
    backgroundColor: '#fff' 
  },
  text: { 
    textAlign: 'center', 
    fontWeight: '200' 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  },
  ico: { 
   justifyContent: "center",
   alignItems: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textTotal: {
    paddingTop: 20,
    justifyContent: 'flex-end',
  },
  monetario: { 
    justifyContent: 'flex-end',
   },
});

const [visible, setVisible] = useState(false);

const [viewModal, setviewModal] = useState(false);

const [osData, setOsData] = useState({});

  this.state = {
      tableHead: ['Seq', 'Descrição', 'Valor'],
      widthArr: [25, 190, 85],
      tableData: [[]],

      tableHeadProd: ['Cód', 'Descrição', 'Qtd', 'Valor'],
      widthArrProd: [60, 130, 30, 80],
      tableDataProd: [[]], 
  }

  let totalTipoOs = 0.00

  const data = [];
  let contador=0;
  
  if (props.OSs.Servicos)
  {
    this.state.tableData = props.OSs.Servicos.Servico.map(os => {
        data.push([os.Servico_Seq+'', os.Servico_Descricao, 'R$ '+ os.Servico_Valor])
        totalTipoOs += parseFloat(os.Servico_Valor.replace('.','').replace(',', '.'))
        contador++;
    })
 }

  const dataProd = [];
  let contadorProd=0;
  
  if (props.OSs.Produtos)
  {
    this.state.tableDataProd = props.OSs.Produtos.Produto.map(os => {
        dataProd.push([os.Produto_Codigo+'', os.Produto_Descricao, os.Produto_Quantidade, 'R$ '+ os.Produto_Valor])
        totalTipoOs += parseFloat(os.Produto_Valor.replace('.','').replace(',', '.'))
        contadorProd++;
    })
  }
  const totalTipoOsS = totalTipoOs.toString().replace('.', '@').replace(',', '.').replace('@', ',')
  
    return (
      <View style={styles.container}>

        <ScrollView pagingEnabled 
                onScroll={this.change}
                showsHorizontalScrollIndicator={true}>
                <View>
                <View>
                    <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                    <TextInput
                        label="Ordem de Serviço"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '60%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'' + props.OSs.OS_Codigo}
                    />
                    <TextInput
                        label="Dt. Abertura"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '40%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={ moment(props.OSs.OS_DataAberturao).format('DD-MM-YY')}
                    />
                    </View>

                    <View style={{...stylesGeral.ViewCamposCadastro, flexDirection: 'row'}}>
                    <TextInput
                        label="Consultor Técnico"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '70%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={props.OSs.TipoOS_ConsultorTecnico}
                    />
                    <TextInput
                        label="Tipo O.S"
                        styleContainer={{...stylesGeral.ContainerIpunts, width: '30%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={props.OSs.TipoOS_Sigla}
                    />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: '5%'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>

                <View >
                    <Text style={{...styles.textoDados, textAlign: 'auto', fontWeight: "bold", paddingBottom: "5%"}}>
                        TMO
                    </Text> 
                </View>

                <View>
                    <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                        <Row widthArr={state.widthArr} data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            {
                                data.map((dataRow, index) => (
                                <Row
                                key={index}
                                data={dataRow}
                                widthArr={state.widthArr}
                                style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                                textStyle={styles.text}
                                />
                                ))
                            }
                        </Table>
                        </ScrollView>
                    </View>
                    </ScrollView>
                </View>

                <View >
                    <Text style={{...styles.textoDados, textAlign: 'auto', fontWeight: "bold", paddingBottom: "5%"}}>
                        Produtos
                    </Text> 
                </View>

                <View>
                    <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                        <Row widthArr={state.widthArrProd} data={state.tableHeadProd} widthArr={state.widthArrProd} style={styles.head} textStyle={styles.text}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            {
                                dataProd.map((dataRow, index) => (
                                <Row
                                key={index}
                                data={dataRow}
                                widthArr={state.widthArrProd}
                                style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                                textStyle={styles.text}
                                />
                                ))
                            }
                        </Table>
                        </ScrollView>
                    </View>
                    </ScrollView>
                </View>
              
                <View style={styles.textTotal}>
                <TextInput
                        label="Total por Tipo de O.S"
                        styleContainer={{...stylesGeral.ContainerIpunts, textAlign: 'right', width: '100%'}}
                        styleInput={{height: 45}}
                        returnKeyType="next"
                        value={'R$ ' + totalTipoOsS}
                    />
                </View>


            </View>
            </ScrollView>
      </View>
    )
  
}

export default memo(PropostaOSDetalhes);