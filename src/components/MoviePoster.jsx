import placeholderPosterJpg from "../images/placeholder_poster.jpg";
import placeholderPoster from "../images/placeholder_poster.webp";

function MoviePoster({posterPath, alt, className}) {
  return (
    <picture>
      <source srcSet={posterPath} type="image/jpeg" />
      <source srcSet={placeholderPoster} type="image/webp" />
      <img src={placeholderPosterJpg} alt={alt} className={className} loading="lazy" />
    </picture>
  )
}

export default MoviePoster