import React, {useState} from 'react';

import Header from '../components/Header';
import {FilterBar, Gallery} from '../components/SetList';
import {GoddessStory} from '../models/GoddessStory';

const SetList = () => {
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Header>
        <FilterBar onSearch={onSearch} />
      </Header>

      {/* <Result data={searchResult} /> */}
    </>
  );
};

export default SetList;
