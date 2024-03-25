"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value.toLocaleLowerCase());
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/recipes/${searchValue}`);
  }

  useEffect(() => {
    setSearchValue("");
  }, [pathname]);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-b-slate-200 h-10 relative flex items-center"
    >
      <input
        name="search"
        value={searchValue}
        onChange={handleSearch}
        type="text"
        placeholder="Search for a recipe"
        className="h-full pl-6 w-full focus:outline-my_red"
      />
      <button
        type="submit"
        disabled={searchValue.length < 3}
        className={`absolute right-0 h-10 px-2  flex justify-center items-center gap-2 text-white ${
          searchValue.length < 3 ? "bg-gray-400" : "bg-my_red"
        } `}
      >
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
    </form>
  );
};

export default SearchBar;
