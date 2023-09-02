import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');

  const setSearch = (text) => {
    setSearchText(text);
  };

  return (
    <SearchContext.Provider value={{ searchText, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
