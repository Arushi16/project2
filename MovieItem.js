import React from "react";
import { Text, View, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

const DEFAULT_POSTER = `https://cdn2.vectorstock.com/i/1000x1000/57/86/cinema-and-movie-night-background-two-vector-19355786.jpg`

const MovieItem = (props) => {
    const { item } = props
    const poster = item.Poster
    const imagePath = (poster === 'N/A' ? DEFAULT_POSTER : poster)
    return (
        <View style={styles.container}>
            <Image style={styles.img}
                source={{ uri: `${imagePath}` }}
            />
            <TouchableOpacity 
                onPress={() =>
                    props.navigation.navigate('DetailScreen',{item: item}
                )}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{item.Title}</Text>
                    <Text>{item.Year} ({item.Type})</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#e6ffe6'
    },
    wrapper: {
        flex: 1,
        padding: 10,
    },
    img: {
        width: 100,
        height: 100,
        margin: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 290,
    }
})
export default MovieItem