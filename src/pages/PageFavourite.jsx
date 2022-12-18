import { useEffect } from "react";
import { appTitle } from "../global/globals";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieContainer from "../components/MovieContainer";
import confusedFace from "../images/confused-face.svg";

const PageFavourite = () => {

  const favouritesList = useSelector((state) => state.favouritesList.value);
  
  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `Favourites - ${appTitle}`;
    window.scrollTo(0, 0);
  }, [])

  return (
      <section className="page page-favourites">
        <h2>Favourites</h2>
        {favouritesList.length > 0 ? 
          <MovieContainer movieList={favouritesList}/> : 
          <div className="no-favourites">
            <img src={confusedFace} alt="A confused emoticon" />
            <p>It seems like you have no favourites currently added. You can add movies to your favourites through the <Link to={"/"}>home page</Link>. You can also search for movies using the search bar.</p>
          </div>}
      </section>
  );

};

export default PageFavourite;