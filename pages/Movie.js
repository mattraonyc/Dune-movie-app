import { motion, useVisualElementContext } from "framer-motion";
import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Link from "next/link";

function Movie({ movie }) {
  const mouseEnter = () =>
    document.getElementById(`${movie.id}`).classList.remove("hide");
  const mouseLeave = () =>
    document.getElementById(`${movie.id}`).classList.add("hide");
  const isLiked = false;
  const like = () => !isLiked;
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      layout
    >
      <h2 className="font-bold">{movie.title}</h2>
      <motion.div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className="relative max-w-[350px] min-w-[100px] min-h-[300px] max-h-[600px]"
      >
        <div>
          {movie.poster_path === null ? (
            <h2 className="text-2xl font-bold">no poster...</h2>
          ) : (
            <img src={`${BASE_URL}${movie.poster_path}`} />
          )}
        </div>
        <div
          className="absolute top-0 h-[100%] w-[100%] p-6 hide bg-[rgba(0,0,0,0.8)] text-start overflow-auto"
          id={movie.id}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2>
                {movie.vote_average}
                <span> ({movie.vote_count} votes)</span>
              </h2>
              <h2>{movie.release_date}</h2>
            </div>
            <motion.div className="cursor-pointer" onClick={like}>
              <FcLikePlaceholder className="object-fill w-9 h-9" />
            </motion.div>
          </div>
          <h3>{movie.overview}</h3>
          <Link href={`/movie/${movie.id}`}>More Info</Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Movie;
