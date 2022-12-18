import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { endpointGetMovies, pathToOriginalImage, pathToPoster, pathToActorProfile } from "../global/globals";
import { appTitle } from "../global/globals";
import placeHolderProfile from "../images/placeholder_profile.webp";
import placeHolderProfileJpg from "../images/placeholder_profile.jpg";
import MoviePoster from "../components/MoviePoster";
import MovieRating from "../components/MovieRating";
import FavouriteHeart from "../components/FavouriteHeart";
import { FaYoutube } from "react-icons/fa";
import { API_KEY } from "../global/globals";

function PageMovie() {
  const { id } = useParams();

  // Movie object
  const [movie, setMovie] = useState(false);
  // Background style
  const [style, setStyle] = useState({})
  // Cast List
  const [cast, setCast] = useState(false);
  // Cast List
  const [videoLink, setVideoLink] = useState(false);

  const navigate = useNavigate();

  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} - ${appTitle}`
    }
    window.scrollTo(0, 0)
  }, [movie])

  // Once id is set, call API to get movie details 
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${endpointGetMovies}${id}?api_key=${API_KEY}&append_to_response=videos,credits`)

      // If Invalid Id, redirect to 404
      if (res.status !== 200) {
        navigate("/404")
      }

      const data = await res.json();
      setMovie(data);

      // Get Trailer
      const trailers = data.videos.results.filter(video => (video.type==="Trailer" && video.official === true && video.site === "YouTube"));
      if (trailers.length > 0) {
        setVideoLink(`https://www.youtube.com/watch?v=${trailers[0].key}`);
      }

      // Get Cast
      const topBilledCast = data.credits.cast.slice(0,8);
      setCast(topBilledCast);
    }

    fetchMovie();
  }, [id, navigate])

  const formatRuntime = (runtimeMinutes) => {
    const minutesInHour = 60;
    const hours = Math.floor(runtimeMinutes / minutesInHour);
    const minutes = runtimeMinutes % minutesInHour;
    return `${hours}h ${minutes>10 ? minutes : "0" + minutes}m`
  };

  // Dynamically set backdrop image
  // const style = {
  //   backgroundImage: `url(${pathToOriginalImage}${movie.backdrop_path})`,
  // }
  useEffect(() => {
    if (movie.backdrop_path) {
      setStyle({backgroundImage: `url(${pathToOriginalImage}${movie.backdrop_path})`})
    } 
  }, [movie.backdrop_path])

  return (
    <section className="page page-movie">
      {movie.backdrop_path && 
        <div className="movie-backdrop">
          <div className="backdrop-image" style={style}></div>
        </div>
      }
      <div className="movie-content">
        <MoviePoster 
          posterPath={movie.poster_path ? `${pathToPoster}${movie.poster_path}` : ""}
          alt={`${movie.title} poster`}
          className="movie-poster"
        />
        <div className="movie-text">
          <MovieRating rating={movie.vote_average}/>
          <FavouriteHeart movie={movie}/>
          <h2 className="movie-title">{movie.title}</h2>
          <div className="movie-release-info">
            {movie.release_date && <p className="movie-release-date">{movie.release_date}</p>}
            {movie.runtime ? <p className="movie-runtime">{formatRuntime(movie.runtime)}</p> : null}
            {movie.genres && movie.genres.length > 0 && <p className="movie-genres">{movie.genres.map((genre) => genre.name).join(', ')}</p>}
          </div>
          {movie.overview && <p className="movie-overview">{movie.overview}</p>}
          {videoLink && 
            <a 
              href={videoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="movie-trailer btn"
            >
              <FaYoutube className="trailer-icon" aria-hidden="true" />
              <p>Official Trailer</p>
            </a>
          }
        </div>
        {cast && cast.length > 0 && <section className="movie-cast">
          <h3>Cast & Crew</h3>
          <div className="cast-container">
            <div className="cast-wrapper">
              {cast.map((actor) => {
                return (
                  <article key={actor.id} className="actor">
                    <picture>
                      <source srcSet={actor.profile_path ? `${pathToActorProfile}${actor.profile_path}` : ""} type="image/jpeg" />
                      <source srcSet={placeHolderProfile} type="image/webp" />
                      <img src={placeHolderProfileJpg} alt={`${actor.name} profile`} className="actor-img" loading="lazy" />
                    </picture>
                    <div className="actor-text">
                      <h4 className="actor-name">{actor.name}</h4>
                      <p className="actor-character">{actor.character}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>}
      </div>
    </section>
  )
}

export default PageMovie