const base = "http://www.omdbapi.com/?apikey=";

export const fetchMovies = async (searchString,page,apiKey) => {
    try {
        const query = searchString.split(' ').join('%20')
        const link = `${base}${apiKey}&s=${query}&page=${page}`
        const response = await fetch(link)
        const results = await response.json()
        return {
            movies: results.Search,
            totalResults: Number(results.totalResults)
        }
    }
    catch(err){
        return console.log(err)
    }
}

export const getDetails = async(query,apiKey) => {
    try{
        const link = `${base}${apiKey}&i=${query}`
        const response = await fetch(link)
        const results = await response.json()
        return results
    }
    catch(err){
        return console.log(err)
    }
}