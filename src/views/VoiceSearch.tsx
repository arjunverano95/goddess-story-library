import React, {useState} from 'react';

import CardDetails from '../components/CardDetails';
import Header from '../components/Header';
import {SearchBar} from '../components/VoiceSearch';
import {GoddessStory} from '../models/GoddessStory';

const VoiceSearch = () => {
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Header>
        <SearchBar onSearch={onSearch} />
      </Header>
      <CardDetails data={searchResult} />
    </>
  );
};
export default VoiceSearch;
