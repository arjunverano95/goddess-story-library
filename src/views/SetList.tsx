import React, {useState} from 'react';

import {ScreenProps} from '../app/navigation';
import Header from '../components/Header';
import {FilterBar, Gallery} from '../components/SetList';
import {GoddessStory} from '../models/GoddessStory';

const SetList = (props: ScreenProps<'SetList'>) => {
  const {navigation} = props;
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Header navigation={navigation}>
        <FilterBar onSearch={onSearch} />
      </Header>

      {/* <Result data={searchResult} /> */}
    </>
  );
};

export default SetList;
