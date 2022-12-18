import { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { appTitle, endpointGetMovies } from "../global/globals"
import MovieCarousel from "../components/MovieCarousel"
import MovieContainer from "../components/MovieContainer";
import MovieFilter from "../components/MovieFilter";
import { API_KEY } from "../global/globals";

const PageHome = () => {

  // Movie Filter
  const selectedMovieFilter = useSelector((state) => state.movieFilter.value);
  // Movie List
  const [movieList, setMovieList] = useState(false);
  // Flag for if more pages can be loaded
  const [canLoadMore, setCanLoadMore] = useState(true);
  // Last loaded page
  const [moviePage, setMoviePage] = useState(1);

  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `${appTitle}`
    window.scrollTo(0, 0); 
  }, [])

  const fetchMovies = useCallback(async (page) => {
    const res = await fetch(`${endpointGetMovies}${selectedMovieFilter}?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const selectedMovies = data.results;
    if (page === 1) {
      setMovieList(selectedMovies)
    } else {
      setMovieList(movieList => [...movieList, ...selectedMovies]);
    }
    // If the total page limit has been reached set the canLoadMore flag
    if (page >= data.total_pages) {
      setCanLoadMore(false)
    }
  }, [selectedMovieFilter])

  // Handle loadMore button
  const handleLoadMore = () => {
    fetchMovies(moviePage + 1);
    setMoviePage(moviePage + 1);
  }

  // Re-fetch movies if the selectedMovieFilter changes - this will also occur on page load
  useEffect(() => {
    fetchMovies(1)
    setMoviePage(1);
    setCanLoadMore(true)
  }, [fetchMovies, selectedMovieFilter])

 

  return (
    <section className="page page-home">
      <h2 className="screen-reader-text">Home</h2>
      {movieList && <MovieCarousel movieList={movieList.slice(0,3)}/>}
      {movieList && <div className="main-content">
        <MovieFilter />
        {movieList && <MovieContainer movieList={movieList} />}
        {canLoadMore && <button 
          onClick={handleLoadMore}
          className="btn load-more-btn"
        >
          Load more <span className="screen-reader-text">movies</span>
        </button>}
      </div>}
    </section>
  );

};

export default PageHome;