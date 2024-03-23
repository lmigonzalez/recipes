import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-white border-b-slate-200 h-10 relative flex items-center">
      <input
        type="text"
        placeholder="Search for a recipe"
        className="h-full pl-6 w-full focus:outline-my_red"
      />
      <button className="absolute right-0 h-10 px-2 bg-my_red flex justify-center items-center gap-2 text-white ">
        Search
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
