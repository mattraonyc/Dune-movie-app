import { motion } from "framer-motion";
import Home from "../pages";

const FilterBtns = () => {
  return (
    <div className="flex flex-col sm:flex-row mb-4">
      <motion.button
        initial={{ y: -100, opacity: 0.7 }}
        animate={{ y: 0, opacity: 0.7 }}
        whileInView={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={fetchMovie}
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
        onClick={fetchTopRated}
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
        onClick={fetchUpcoming}
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
        onClick={fetchNowPlaying}
        className={activeGenre === 3 ? "active" : ""}
      >
        Now Playing
      </motion.button>
    </div>
  );
};

export default FilterBtns;
