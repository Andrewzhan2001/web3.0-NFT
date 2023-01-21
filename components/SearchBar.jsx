import React, { useState, useEffect } from 'react';

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }) => {
  const [search, setSearch] = useState('');
  const [toggle, settoggle] = useState(false);
  // mimic the search state but it will reload less frequently
  const [debounceSearch, setDebounceSearch] = useState(search);

  useEffect(() => {
    // so search will not reload too often
    const timer = setTimeout(() => {
      setSearch(debounceSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debounceSearch]);

  useEffect(() => {
    // if we type anything in search
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  
  

  return (
    <>
      <div className="flex-1 px-4 py-3 bg-white border rounded-md flexCenter dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2">
        <i className="fa-solid fa-magnifying-glass fa-xl" />
        <input
          type="text"
          placeholder="Search item here"
          className="w-full mx-4 text-xs font-normal bg-white outline-none dark:bg-nft-black-2 font-poppins dark:text-white text-nft-black-1"
          onChange={(e) => setDebounceSearch(e.target.value)}
          value={debounceSearch}
        />
      </div>
      <div onClick={() => settoggle((prevState) => !prevState)} className="relative px-4 py-3 ml-4 bg-white border rounded-md cursor-pointer flexBetween sm:ml-0 sm:mt-2 min-w-190 dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2">
        <p className="text-xs font-normal font-poppins dark:text-white text-nft-black-1">{activeSelect}</p>
        <i className="pb-3 fa-solid fa-xl fa-sort-down" />
        {toggle && (
        <div className="absolute left-0 right-0 z-10 w-full px-4 py-1 mt-1 bg-white border rounded-md top-full dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2">
          {['Recently Added', 'Price (low to high)', 'Price (high to low)'].map((item) => (
            <p
              className="my-3 text-xs font-normal cursor-pointer font-poppins dark:text-white text-nft-black-1"
              onClick={() => setActiveSelect(item)}
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
