import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PropostaOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Código', 'Núm', 'Data', 'Status', 'Tipo'],
      widthArr: [30, 55, 55, 70, 100, 30],
      tableData: [[]]
    }
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(data.OS_Codigo + ' - ' + data.TipoOS_Sigla)}>
        <View style={styles.ico}>
          <Icon name="search" color="#0000CD" />
        </View>
      </TouchableOpacity>
    );
    const data = [];
    let contador=0;
    this.state.tableData = this.props.OSs.map(os => {
      data.push([element(os, contador), os.OS_Codigo, os.OS_Numero, moment(os.OS_DataAberturao).format('DD-MM-YY'), os.OS_Status, os.TipoOS_Sigla])
      contador++;
    })

    return (
      <View style={styles.container}>
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
    )
  }
}

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
});