import Head from "next/head";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [movie, setMovie] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [moviePage, setMoviePage] = useState(1);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    searchMovie(searchValue);
  }, [searchValue]);

  useEffect(() => {
    fetchMovie(1);
  }, []);

  const searchMovie = async (searchValue) => {
    if (searchValue) {
      const url = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
      );
      const SearchResults = await url.json();
      setMovie(SearchResults.results);
      setFiltered(SearchResults.results);
      setActiveGenre(4);
    }
  };

  const handleLoadMore = () => {
    if (activeGenre === 0) {
      fetchMovie(moviePage + 1);
    } else if (activeGenre === 1) {
      fetchTopRated(moviePage + 1);
    } else if (activeGenre === 2) {
      fetchUpcoming(moviePage + 1);
    } else if (activeGenre === 3) {
      fetchNowPlaying(moviePage + 1);
    }
    setMoviePage(moviePage + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (activeGenre === 0) {
      fetchMovie(moviePage - 1);
    } else if (activeGenre === 1) {
      fetchTopRated(moviePage - 1);
    } else if (activeGenre === 2) {
      fetchUpcoming(moviePage - 1);
    } else if (activeGenre === 3) {
      fetchNowPlaying(moviePage - 1);
    }
    setMoviePage(moviePage - 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setMoviePage(1);
  }, [activeGenre]);

  const fetchMovie = async (page) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    );
    const movies = await data.json();
    setMovie(movies.results);
    setFiltered(movies.results);
    setActiveGenre(0);
    if (page >= movies.total_pages) {
      setCanLoadMore(false);
    }
  };

  const fetchTopRated = async (page) => {
    const topData = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const topMovies = await topData.json();
    setMovie(topMovies.results);
    setFiltered(topMovies.results);
    setActiveGenre(1);
    if (page >= topMovies.total_pages) {
      setCanLoadMore(false);
    }
  };

  const fetchUpcoming = async (page) => {
    const upcomingData = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const upcomingMovies = await upcomingData.json();
    setMovie(upcomingMovies.results);
    setFiltered(upcomingMovies.results);
    setActiveGenre(2);
    if (page >= upcomingMovies.total_pages) {
      setCanLoadMore(false);
    }
  };

  const fetchNowPlaying = async (page) => {
    const nowPlayingData = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const nowPlayingMovies = await nowPlayingData.json();
    setMovie(nowPlayingMovies.results);
    setFiltered(nowPlayingMovies.results);
    setActiveGenre(3);
    if (page >= nowPlayingMovies.total_pages) {
      setCanLoadMore(false);
    }
  };

  return (
    <div>
      <Head>
        <title>DUNE | Movie App</title>
        <meta name="description" content="React Movie app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="mx-12 my-6 md:my-12 text-center">
        <div className="flex flex-col md:flex-row justify-between mb-8 md:mt-20 mt-56">
          <div className="flex flex-col sm:flex-row md:ml-[-16px] mx-auto">
            <motion.button
              initial={{ y: -100, opacity: 0.7 }}
              animate={{ y: 0, opacity: 0.7 }}
              whileInView={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fetchMovie(1)}
              className={activeGenre === 0 ? "active" : ""}
            >
              Popular
            </motion.button>

            <motion.button
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              whileInView={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fetchTopRated(1)}
              className={activeGenre === 1 ? "active" : ""}
            >
              Top Rated
            </motion.button>

            <motion.button
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              whileInView={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fetchUpcoming(1)}
              className={activeGenre === 2 ? "active" : ""}
            >
              Upcoming
            </motion.button>

            <motion.button
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              whileInView={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fetchNowPlaying(1)}
              className={activeGenre === 3 ? "active" : ""}
            >
              Now Playing
            </motion.button>
          </div>
          <div className="grid-cols-4">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Type to search..."
            ></input>
          </div>
        </div>
        <motion.div layout className="popular-movies">
          <AnimatePresence>
            {filtered.map((movie) => {
              return <Movie key={movie.id} movie={movie} />;
            })}
          </AnimatePresence>
        </motion.div>
        <div className="mt-8">
          {moviePage >= 2 && (
            <button className="w-32" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {moviePage}
          {canLoadMore && (
            <button className="w-32" onClick={handleLoadMore}>
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
