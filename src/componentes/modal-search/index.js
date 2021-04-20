import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Touchable from 'react-native-platform-touchable';
import Button from '~/componentes/tela/Button';
import {Modal} from 'react-native-paper';
import {wp, hp} from '~/core/utils';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const ModalConsultarCliente = props => {
  const {
    Clientes,
    ExibirModalBuscaCliente,
    setExibirModalBuscaCliente,
    setDadosCliente,
  } = props;

  const renderItem = Cliente => {
    //console.log('Cliente : ' + JSON.stringify(Cliente));

    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={{...styles.ViewCliente}}
        onPress={() => setDadosCliente(Cliente)}>
        <View style={{...styles.ViewNomeCliente}}>
          <Text style={{...styles.TextoPadrao}}>{Cliente.Cliente_Nome}</Text>
        </View>

        <View style={{...styles.ViewCPFCliente}}>
          <Text style={{...styles.TextoPadrao, fontSize: 15}}>CPF/CNPJ: </Text>
          <Text style={{...styles.TextoPadrao, fontSize: 15}}>
            {getCampoMascaraCPFCNPJ(Cliente.Cliente_DocIdentif)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getCampoMascaraCPFCNPJ = CPF_CNPJParm => {
    let CPF_CNPJAux = CPF_CNPJParm;
    //setCPFCNPJ({value: CPF_CNPJAux, error: ''});
    //console.log('adicionarMascaraCampoCPFCNPJ');
    //console.log('CPF_CNPJAux : ' + CPF_CNPJAux);
    //console.log('length : ' + CPF_CNPJAux.length);

    if (CPF_CNPJAux && CPF_CNPJAux.length > 0) {
      if (CPF_CNPJAux.length == 11) {
        // CPF
        if (!(CPF_CNPJAux.indexOf('.') > 0 || CPF_CNPJAux.indexOf('-') > 0)) {
          CPF_CNPJAux = `${CPF_CNPJAux.substring(0, 3)}.${CPF_CNPJAux.substring(
            3,
            6,
          )}.${CPF_CNPJAux.substring(6, 9)}-${CPF_CNPJAux.substring(9, 11)}`;
          //console.log('CPF_CNPJAux : ' + CPF_CNPJAux);
        }
      }

      if (CPF_CNPJAux.length == 14) {
        //CNPJ
        if (!(CPF_CNPJAux.indexOf('.') > 0 || CPF_CNPJAux.indexOf('/') > 0)) {
          CPF_CNPJAux = `${CPF_CNPJAux.substring(0, 2)}.${CPF_CNPJAux.substring(
            2,
            5,
          )}.${CPF_CNPJAux.substring(5, 8)}/${CPF_CNPJAux.substring(
            8,
            12,
          )}-${CPF_CNPJAux.substring(12, 14)}`;
          //console.log('CPF_CNPJAux : ' + CPF_CNPJAux);
        }
      }
    }

    return CPF_CNPJAux;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ExibirModalBuscaCliente}
      onDismiss={() => setExibirModalBuscaCliente(false)}
      contentContainerStyle={{
        ...styles.Modal,
      }}>
        <SafeAreaView style={{alignContent:'flex-start', alignItems:'flex-start', alignSelf:'flex-start'}}>
          <FlatList
            data={Clientes}
            renderItem={Cliente => renderItem(Cliente.item)}
            keyExtractor={item => item.id}
          />
          <View style={{width: '80%', marginStart: 40}}>
            <Button
              mode="contained"
              onPress={() => setExibirModalBuscaCliente(false)}>
              VOLTAR
            </Button>
          </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal: {
    width: '100%',
    height: hp(90),
    paddingTop: hp(1.5),
    backgroundColor: 'white',
    //flex: 1,
    top: 0,
    position: 'absolute',
  },
  ViewCliente: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingVertical: hp(1.5),
    marginHorizontal: 20,
  },
  ViewNomeCliente: {},
  ViewCPFCliente: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  TextoPadrao: {
    fontSize: 18,
    textAlign: 'center',

    color: 'black',
  },
  BotaoVoltar: {
    width: '80%',
  },
});

export default ModalConsultarCliente;
