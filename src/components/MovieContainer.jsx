/*
  Component to render a list of movies as a container of MovieCards Components
*/

import MovieCard from "./MovieCard"

function MovieContainer( {movieList} ) {
  
  return (
    <div className="movie-container">
      {movieList.length > 0 && movieList.map((movie) => {
        return <MovieCard key={movie.id} 
                          movie={movie}
        />
      })}
    </div>
  )
}

export default MovieContainer