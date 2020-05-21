import React from "react";
import { Text, View, Image, StyleSheet, Animated } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";

const DEFAULT_POSTER = `https://cdn2.vectorstock.com/i/1000x1000/57/86/cinema-and-movie-night-background-two-vector-19355786.jpg`

const renderColor = (Value) => {
    return (Value.split('/')[1] === '10' ?
        (
            Value >= '7' ? 'green'
                :
                (Value >= '4' ? 'orange' : 'red')
        )
        :
        (
            Value.includes('%') ?
                (Value >= '70%' ? 'green'
                    :
                    (Value >= '40%' ? 'orange' : 'red'))
                :
                (
                    Value.split('/')[1] === '100' ?
                        (Value >= '70' ? 'green' : (Value >= '40' ? 'orange' : 'red')
                        )
                        :
                        'white'
                )
        ))
}

const renderWidth = (Value) => {
    return Value.includes("%") ?
        Value :
        (
            Value.split('/')[1] === '10' ?
                `${(Value.split('/')[0]) * 10}%` : `${Value}%`
        )
}

const MovieDetail = (props) => {
    const { item } = props
    const poster = item.Poster
    const imagePath = (poster === 'N/A' ? DEFAULT_POSTER : poster)
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>{item.Title} ({item.Year})</Text>
            <View>
                <Image style={styles.img}
                    source={{ uri: `${imagePath}` }}
                />
                <Text style={styles.plot}>{item.Plot !== 'N/A' ? item.Plot : `Plot ${item.Plot}`}</Text>
                <Text style={styles.cardText}>Type: {item.Type}</Text>
                <Text style={styles.cardText}>Duration: {item.Runtime}</Text>
                <Text style={styles.cardText}>Genre: {item.Genre}</Text>
                <Text style={styles.cardText}>Director: {item.Director}</Text>
                <Text style={styles.cardText}>Writer: {item.Writer}</Text>
                <Text style={styles.cardText}>Actors: {item.Actors}</Text>
                <Text style={styles.text}>Country: {item.Country}</Text>

                {item.Ratings ? item.Ratings.map(
                    rating =>
                        <View key={rating.Source} style={styles.cardText}>
                            <Text style={styles.text}>{rating.Source}</Text>
                            <View style={styles.progressBar}>
                                <Animated.View style={{
                                    backgroundColor: renderColor(rating.Value),
                                    width: renderWidth(rating.Value),
                                    position: 'absolute',
                                    left: 0, right: 0, top: 0, bottom: 0
                                }}
                                />
                            </View>
                            <Text style={styles.cardText}>{rating.Value}</Text>
                        </View>)
                    : null
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderStyle:'solid',
        borderWidth:2,
        padding:5,
    },
    heading: {
        color: '#101010',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    cardText: {
        fontSize: 15,
        color: '#4d4d4d',
        padding: 4,
        textTransform: 'capitalize'
    },
    plot: {
        fontSize: 15,
        color: '#4d4d4d',
        padding: 5,
        fontStyle: 'italic'
    },
    img: {
        width: 200,
        height: 300,
        margin: 5,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    text: {
        fontSize: 15,
        color: '#4d4d4d',
        padding: 4,
    }
})
export default MovieDetail