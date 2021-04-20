//import React from 'react'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal';
import Button from '~/componentes/tela/Button';


const { width, height } = Dimensions.get('window')
//style={styles.cardView} este style pertence ao primeiro view abaixo depois do return

const CarouselItem = ({ item }) => {

    const [isModalVisible, setModalVisible] = useState(true);

    const toggleModal = () => {
    setModalVisible(!isModalVisible);
    };


    return (
       
            <View>
                <TouchableOpacity onPress={()=>toggleModal}>
                    <Image style={styles.image} source={{uri: 'data:image/png;base64,' + item.Imagem}} />
                </TouchableOpacity>

                <Modal isVisible={isModalVisible}>
                    <View style={{flex: 1}}>
                    <Text>Hello!</Text>

                    <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>

            </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 50,//20
        height: height / 3,//3
        backgroundColor: 'white',
        margin: 5,//10
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 50,//20
        height: height / 3,
        //borderRadius: 10,//10
        resizeMode: 'contain',
        margin: 5,//10
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem