import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { appTitle } from "../global/globals";
import { endpointSearchMovies } from "../global/globals";
import MovieContainer from "../components/MovieContainer";
import { API_KEY } from "../global/globals";

const PageSearch = () => {
  const { query } = useParams();
  // Movie List
  const [resultsList, setResultsList] = useState(false);
  // Flag for if more pages can be loaded
  const [canLoadMore, setCanLoadMore] = useState(true);
  // Last loaded page
  const moviePage = useRef(1);
  // Total Results
  const [totalResults, setTotalResults] = useState(false);

  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    if (query) {
      document.title = `${query} - Search - ${appTitle}`
      window.scrollTo(0, 0)
    }
  }, [query])
  
  const fetchMovies = useCallback(async (page) => {
    const res = await fetch(`${endpointSearchMovies}?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await res.json();
    const selectedMovies = data.results;
    if (page === 1) {
      setResultsList(selectedMovies)
      // Set total results
      setTotalResults(data.total_results);
    } else {
      setResultsList(movieList => [...movieList, ...selectedMovies]);
    }
    // If the total page limit has been reached set the canLoadMore flag
    if (page >= data.total_pages) {
      setCanLoadMore(false)
    }
  }, [query])

  // Handle loadMore button
  const handleLoadMore = () => {
    fetchMovies(++moviePage.current);
  }

  // Re-fetch movies if the query changes - this will also occur on page load
  useEffect(() => {
    moviePage.current = 1;
    fetchMovies(moviePage.current)
    setCanLoadMore(true)
  }, [fetchMovies, query])

  return (
      <section className="page page-search">
        <h2>Search Results</h2>
        <h3 className="search-query">{totalResults} results for "{query}"</h3>
        {resultsList && <MovieContainer movieList={resultsList} />}
        {canLoadMore && <button 
          onClick={handleLoadMore}
          className="btn load-more-btn"
        >
          Load more <span className="screen-reader-text">movies</span>
        </button>}
      </section>
  );

};

export default PageSearch;