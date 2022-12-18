import { useState, useRef } from "react";
import { FaSearch as SearchIcon, FaTimes as ClearIcon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { closeNav } from "../features/navOpen/navOpenSlice"


function SearchBar({ tabIndex }) {
  const [ searchQuery, setSearchQuery ] = useState("");

  const searchInputRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const clearSearch = () => {
    setSearchQuery("");
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchInputRef.current.blur();
    if ( searchQuery ) {
      navigate(`/search/${searchQuery}`)
      clearSearch();
      dispatch(closeNav());
    }
  }

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearchClear = (e) => {
    e.preventDefault();
    clearSearch();
  }

  return (
    <form 
      className="searchbar" 
      onSubmit={handleSearchSubmit}
    >
      <input 
        type="search" 
        name="query" 
        id="site-search" 
        aria-label="Search"
        className="search-input"
        placeholder="Search for a movie..."
        autoComplete="off"
        value={searchQuery}
        onChange={handleSearchInput}
        ref={searchInputRef}
        tabIndex={tabIndex}
      />
      {searchQuery && 
      <button 
        type="reset"
        className="clear-btn"
        onClick={handleSearchClear}
        tabIndex={tabIndex}
      >
        <ClearIcon />
        <span className="screen-reader-text">Clear Search Query</span>
      </button>}
      <button 
        type="submit"
        className="search-btn"
        tabIndex={tabIndex}
      >
        <SearchIcon className="search-icon"/>
        <span className="screen-reader-text">Search</span>
      </button>
      <input type="submit" hidden />
    </form>
  )
}

export default SearchBar