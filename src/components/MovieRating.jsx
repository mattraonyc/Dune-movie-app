
import { FaStar as FullStar, FaStarHalfAlt as HalfStar, FaRegStar as EmptyStar } from "react-icons/fa";

function MovieRating( {rating} ) {

  const roundToStep =  (val, step=1) => {
    if (val !== 0) {
      const inverseStep = 1/step;
      return Math.round(val*inverseStep)/inverseStep;
    } else {
      return val;
    }
  }

  const getStars = () => {
    const numStars = 5;
    const starRatingArr = [];
    // Scale rating to be 0-5 stars (default scale is 0-10)
    const ratingOutOf5 = rating/2;
    // Round scaled rating to nearest half star (steps of 0.5)
    let roundedRating = roundToStep(ratingOutOf5, 0.5)
    // Add appropriate stars to the starRatingArr
    for (let i = 0; i < numStars; i++) {
      if (roundedRating >= 1) {
        starRatingArr.push(<FullStar key={i} className="full-star"/>);
        roundedRating -= 1;
      } else if (roundedRating >= 0.5) {
        starRatingArr.push(<HalfStar key={i} className="half-star"/>);
        roundedRating -= 0.5;
      } else {
        starRatingArr.push(<EmptyStar key={i} className="empty-star"/>);
      }
    }
    return starRatingArr;
  }

  
  

  return (
    <div className="movie-rating">
      <div className="star-rating">
        {/* Render rating as stars /5 */}
        {getStars().map((star) => star)}
      </div>
      <span className="score-rating .screen-reader-text">{rating*10}%</span>
    </div>
  )
}

MovieRating.defaultProps = {
  rating: 0,
}

export default MovieRating