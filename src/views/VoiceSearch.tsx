import React, {useState} from 'react';

import {ScreenProps} from '../app/navigation/types';
import CardDetails from '../components/CardDetails';
import Header from '../components/Header';
import {SearchBar} from '../components/VoiceSearch';
import {GoddessStory} from '../models/GoddessStory';

const VoiceSearch = (props: ScreenProps<'SetList'>) => {
  const {navigation} = props;
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Header navigation={navigation}>
        <SearchBar onSearch={onSearch} />
      </Header>
      <CardDetails data={searchResult} />
    </>
  );
};
export default VoiceSearch;
