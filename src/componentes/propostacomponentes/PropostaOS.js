import React, { Component, useState, useRef, useEffect, memo } from 'react';
import { StyleSheet, View, ScrollView, Alert, Text, Button, Modal, Image, TouchableOpacity, Animated, } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropostaOSDetalhes from '~/componentes/propostacomponentes/PropostaOSDetalhes'

const ModalPoup = ({osParam, visible, children}) => {

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
    height: '90%',
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
});
  const [os, setOs] = useState(osParam);
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}> 
      <View style={styles.modalBackGround}>
      <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const PropostaOS = props => {

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
});

const [visible, setVisible] = useState(false);

const [viewModal, setviewModal] = useState(false);

const [osData, setOsData] = useState({});

  this.state = {
      tableHead: ['', 'Código', 'Núm', 'Data', 'Status', 'Tipo'],
      widthArr: [30, 55, 55, 70, 100, 30],
      tableData: [[]],
     // viewModal: false,    
  }

  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(data)}>
      <View style={styles.ico}>
        <Icon name="search" color="#0000CD" />
      </View>
    </TouchableOpacity>

  );

  const data = [];
  let contador=0;
  this.state.tableData = props.OSs.map(os => {
    data.push([element(os, contador), os.OS_Codigo, os.OS_Numero, moment(os.OS_DataAberturao).format('DD-MM-YY'), os.OS_Status, os.TipoOS_Sigla])
    contador++;
  })

  toggleModal = () => {
    setVisible(!visible)
  };

  _alertIndex = (os) => { 
    setOsData(os);
    this.toggleModal();
  }

  
    return (
      <View style={styles.container}>


      <ModalPoup  visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
            <Text >[X]</Text>
            </TouchableOpacity>
          </View>
        </View>
       <PropostaOSDetalhes OSs={osData}/>
      </ModalPoup>

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

export default memo(PropostaOS);