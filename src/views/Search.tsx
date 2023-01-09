import {useState} from 'react';
import {Form, Result} from '../components/Search';

import {GoddessStory} from '../models/GoddessStory';

const Search = () => {
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Form onSearch={onSearch} />
      <Result data={searchResult} />
    </>
  );
};
export default Search;
