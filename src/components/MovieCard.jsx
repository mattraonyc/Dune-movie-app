import { useState } from "react";
import { pathToPoster } from "../global/globals";
import MoviePoster from "./MoviePoster";
import MovieRating from "./MovieRating";
import FavouriteHeart from "./FavouriteHeart";
import MovieInfoButton from "./MovieInfoButton";


function MovieCard({movie}) {

  // Track whether card is open (overlay showing) or closed (overlay hidden)
  const [ cardOpen, setCardOpen ] = useState(false);
  // Allow cards to be locked open
  const [ lockedOpen, setLockedOpen ] = useState(false);

  // Utility Functions to open/close cards freely
  const openCard = () => {
    setCardOpen(true);
  } 

  const closeCard = () => {
    setCardOpen(false);
  } 

  // Functions to open and close cards as long as they are not locked open
  const controlledOpen = () => {
    if (!lockedOpen) {
      openCard();
    }
  }
  
  const controlledClose = () => {
    if (!lockedOpen) {
      closeCard();
    }
  }

  // Toggle cards to be locked/unlocked on click
  const handleClick = () => {
    if (!lockedOpen) {
      openCard()
    } else {
      closeCard()
    }
    setLockedOpen(!lockedOpen);
  }

  const movieCardID = `movie-${movie.id}`
  return (
    <article 
      id={movieCardID} 
      className={"movie-card" + (cardOpen ? " card-open" : "")}
      onMouseEnter={controlledOpen}
      onMouseLeave={controlledClose}
      onClick={handleClick}
    >
      <MoviePoster 
        posterPath={movie.poster_path ? `${pathToPoster}${movie.poster_path}` : ""}
        alt={`${movie.title} poster`}
        className="movie-card-poster"
      />
      <div className="movie-card-overlay">
        <MovieRating rating={movie.vote_average}/>
        <FavouriteHeart 
          movie={movie}
          onFocus={controlledOpen}
          onBlur={controlledClose}
        />
        <h3 className="movie-title">{movie.title}</h3>
        {movie.release_date && <p className="movie-release-date">{movie.release_date}</p>}
        {movie.overview && <p className="movie-overview">{movie.overview}</p>}
        <MovieInfoButton 
          movie={movie}
          onFocus={controlledOpen}
          onBlur={controlledClose}
        />
      </div>
    </article>
  );
}

export default MovieCard;
