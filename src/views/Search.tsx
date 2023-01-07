import {useState} from 'react';

import {GoddessStory} from '../models/GoddessStory';
import SearchForm from '../components/Search/Form';
import SearchResult from '../components/Search/Result';

const Search = () => {
  const [searchResult, setSearchResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setSearchResult(value);
  };
  return (
    <>
      <SearchForm onSearch={onSearch} />
      <SearchResult data={searchResult} />
    </>
  );
};
export default Search;
