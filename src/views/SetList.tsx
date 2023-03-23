import React, {useState} from 'react';

import {ScreenProps} from '../app/navigation/types';
import Header from '../components/Header';
import {FilterBar, Gallery} from '../components/SetList';
import {GoddessStory} from '../models/GoddessStory';

const SetList = (props: ScreenProps<'GoddessStory'>) => {
  const {navigation} = props;

  const [filter, setFilterData] = useState<GoddessStory>({
    ID: '',
    Code: '',
    SetNumber: '',
    CardNumber: '',
    CharacterName: '',
    SeriesName: '',
    Rarity: '',
    ImageUrl: '',
    HasImage: '',
  });
  const [sort, setSortValue] = useState<'asc' | 'desc'>('asc');
  const onFilter = (value: GoddessStory) => {
    setFilterData(value);
  };

  return (
    <>
      <Header navigation={navigation}>
        <FilterBar
          sort={sort}
          filter={filter}
          onFilter={onFilter}
          onSort={(value) => {
            setSortValue(value);
          }}
        />
      </Header>

      <Gallery filter={filter} sort={sort} />
    </>
  );
};

export default SetList;
