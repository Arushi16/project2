import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { getDetails } from '../api'
import MovieDetail from '../MovieDetail'
import {REACT_APP_API_KEY} from 'react-native-dotenv'

const apiKey = REACT_APP_API_KEY

class DetailScreen extends Component {
  state = {
    movies: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const { item } = this.props.route.params
    const results = await getDetails(item.imdbID,apiKey)
    this.setState({ movies: results, isLoading: false })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ?
          <View>
            <ActivityIndicator size="large" color="#000" style={styles.loading} />
            <Text style={styles.loadingText}>Loading... Please Wait!</Text>
          </View> :
          <MovieDetail item={this.state.movies} />
        }        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6ffe6',
    padding: 10,
    paddingBottom: 30,
    height:'100%'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 50
  },
  loadingText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
  }
})

export default DetailScreen