import {useState} from 'react';

import {GoddessStory} from '../models/GoddessStory';
import Search from '../components/Search';
import SearchResult from '../components/SearchResult';

const LibraryView = () => {
  const [searchResult, setSearchResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setSearchResult(value);
  };
  return (
    <>
      <Search onSearch={onSearch} />
      <SearchResult data={searchResult} />
    </>
  );
};
export default LibraryView;
