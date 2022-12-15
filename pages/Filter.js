import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Filter({ setActiveGenre, activeGenre, setFiltered, movie }) {
  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(movie);
      return;
    }
    const filtered = movie.filter((movie) =>
      movie.genre_ids.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre]);

  return (
    <div className="flex flex-col sm:flex-row mb-8 sm:justify-between items-center">
      <div className="filter-container flex flex-col sm:flex-row gap-1 ">
        <motion.button
          initial={{ y: -100, opacity: 0.7 }}
          animate={{ y: 0, opacity: 0.7 }}
          whileInView={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveGenre(0)}
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
        >
          Top Rated
        </motion.button>

        <motion.button
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          whileInView={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveGenre(28)}
          className={activeGenre === 28 ? "active" : ""}
        >
          Action
        </motion.button>
      </div>
      {/* 
        <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <motion.button
            initial={{y: -100}}
            animate={{y: 0}}
            whileInView={{opacity: 0.7}}
            whileHover={{opacity: 1}}
            whileTap={{scale: 0.9}}
            type="submit"
            className="bg-[#323232]"
            >Search</motion.button>
        </form> */}
    </div>
  );
}

export default Filter;
