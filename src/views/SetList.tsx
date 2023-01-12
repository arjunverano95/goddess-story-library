import React, {useState} from 'react';
import Header from '../components/Header';
import {Form, Result} from '../components/SetList';

import {GoddessStory} from '../models/GoddessStory';

const SetList = () => {
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Header>
        <Form onSearch={onSearch} />
      </Header>

      {/* <Result data={searchResult} /> */}
    </>
  );
};

export default SetList;
