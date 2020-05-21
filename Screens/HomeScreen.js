import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { fetchMovies } from '../api'
import MovieItem from '../MovieItem'
import MovieList from '../MovieList';
import { REACT_APP_API_KEY } from 'react-native-dotenv'

const apiKey = REACT_APP_API_KEY

export default class HomeScreen extends Component {
  state = {
    movies: [],
    movieTitle: '',
    currentPage: 1,
    maxPages: 1,
  }

  onMovieTitleChange = (text) => {
    this.setState({
      movieTitle: text,
      currentPage: 1,
    })
    this.getMovies(text)
  }

  getMovies = async (text) => {
    const results = await fetchMovies(text, this.state.currentPage, apiKey)
    this.setState({
      movies: results.movies,
      maxPages: Math.ceil(results.totalResults / 10),
    })
  }

  loadMoreMovies = async () => {
    if (this.state.currentPage < this.state.maxPages) {
      const results = await fetchMovies(this.state.movieTitle, this.state.currentPage + 1, apiKey)
      this.setState({
        movies: [...this.state.movies, ...results.movies],
        currentPage: this.state.currentPage + 1,
      })
    }
  }

  // handleSubmit = (e) => {
  //   Keyboard.dismiss()
  //   this.getMovies(this.state.movieTitle)
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Movies List</Text>
        <TextInput
          style={styles.input}
          value={this.state.movieTitle}
          onChangeText={this.onMovieTitleChange}
          placeholder="Search Movies..."
          returnKeyType="search"
        />
        {/* <Button title='Search Movie' onPress={this.handleSubmit} /> */}
        <MovieList data={this.state.movies}
          navigation={this.props.navigation}
          loadMoreMovies={this.loadMoreMovies}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6ffe6',
    paddingTop: 20,
    paddingBottom: 100,
    marginBottom: 120,
    height: '100%'
  },
  heading: {
    fontSize: 30,
    color: "#000",
    alignSelf: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    padding: 10,
  },
  noResult: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#FF6347'
  }
});