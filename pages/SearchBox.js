import { useEffect, useState } from "react";

const SearchBox = () => {
  return (
    <div className="grid-cols-4">
      <input
        onChange={(e) => {
          e.preventDefault();
          setSearchValue(e.target.value);
        }}
        placeholder="Type to search..."
      ></input>
    </div>
  );
};

export default SearchBox;
