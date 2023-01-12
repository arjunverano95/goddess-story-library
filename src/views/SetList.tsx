import React, {useState} from 'react';
import {Form, Result} from '../components/SetList';

import {GoddessStory} from '../models/GoddessStory';

const SetList = () => {
  const [searchResult, setResult] = useState<GoddessStory>(undefined);
  const onSearch = (value: GoddessStory) => {
    setResult(value);
  };
  return (
    <>
      <Form onSearch={onSearch} />
      {/* <Result data={searchResult} /> */}
    </>
  );
};

export default SetList;
