import React from 'react';
import {View, Image, ScrollView, Dimensions, Text, StyleSheet, TouchableHighlight} from 'react-native';

const {width} = Dimensions.get("window");
const height = width * 0.6
//const { width, height } = Dimensions.get('window')
/*
const images = [
    'https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?cs=srgb&dl=pexels-thisisengineering-3862601.jpg&fm=jpg',
    'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?cs=srgb&dl=pexels-thisisengineering-3586966.jpg&fm=jpg',
    'https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?cs=srgb&dl=pexels-thisisengineering-1182825.jpg&fm=jpg',
    'https://images.pexels.com/photos/1058278/pexels-photo-1058278.jpeg?cs=srgb&dl=pexels-thisisengineering-1058278.jpg&fm=jpg',
    'https://images.pexels.com/photos/2326290/pexels-photo-2326290.jpeg?cs=srgb&dl=pexels-thisisengineering-2326290.jpg&fm=jpg',
]
*/

export default class Slider extends React.Component{
    state = {
        active: 0,
    }

    change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active){
            this.setState({active: slide});
        }
    }

    imageClicked(val){
       this.props.onImagePress(val)     
    }

    render(){
        return(
            <View style={style.container}>
                <ScrollView 
                    pagingEnabled 
                    horizontal 
                    onScroll={this.change}
                    showsHorizontalScrollIndicator={false}
                    style={style.scroll}
                >
                { 
                    this.props.images.map((image, index) => 
                            <TouchableHighlight underlayColor={'none'} onPress={(e) => {e.stopPropagation(); this.imageClicked(image.Imagem)}}>
                                <Image
                                key={index}
                                source={{uri: 'data:image/png;base64,' + image.Imagem}}
                                style={style.image}/> 
                            </TouchableHighlight>                  
                        )
                }
                </ScrollView>
                <View style={style.pagination}>
                    {
                        this.props.images.map((i, k) => (
                            <Text style={k==this.state.active ? style.pagingActiveText : style.pagingText}>⬤</Text>
                        ))
                    }    
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