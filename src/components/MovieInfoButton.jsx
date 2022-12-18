import { Link } from "react-router-dom"

function MovieInfoButton( { movie, tabIndex, onBlur, onFocus } ) {
  return (
    movie && 
      <Link 
        to={`/movie/${movie.id}`} 
        className="btn"
        tabIndex={tabIndex}
        onBlur={onBlur}
        onFocus={onFocus}
      >More Info<span className='screen-reader-text'> about {movie.title}</span>
      </Link>
  )
}

MovieInfoButton.defaultProps = {
  tabIndex: 0,
  onBlur: () => {},
  onFocus: () => {},
  disabled: false,
} 

export default MovieInfoButton