import React, { Component } from "react";
import { View, FlatList } from 'react-native'
import MovieItem from "./MovieItem";

class MovieList extends Component{
  render() { 
    return (
      <View>
        <FlatList
          renderItem={({ item }) => <MovieItem item={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.imdbID}
          data={this.props.data}
          onEndReached={()=>{this.props.loadMoreMovies()}}
          onEndReachedThreshold={0}
          initialNumToRender={10}
        />
      </View>  
    );
  }
}
 
export default MovieList;