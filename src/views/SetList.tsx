import React, {useCallback, useState} from 'react';

import {ScreenProps} from '../app/navigation';
import Header from '../components/Header';
import {FilterBar, Gallery} from '../components/SetList';
import {GoddessStory} from '../models/GoddessStory';

const data: GoddessStory[] = require('../app/data.json');

const SetList = (props: ScreenProps<'SetList'>) => {
  const {navigation} = props;

  const sortData = (data: GoddessStory[], order: 'asc' | 'desc') => {
    if (order === 'asc') {
      return data.sort(
        (a, b) =>
          a.SetNumber.localeCompare(b.SetNumber) ||
          b.Rarity.localeCompare(a.Rarity) ||
          Number(a.CardNumber) - Number(b.CardNumber),
      );
    } else {
      return data.sort(
        (a, b) =>
          a.SetNumber.localeCompare(b.SetNumber) ||
          b.Rarity.localeCompare(a.Rarity) ||
          Number(b.CardNumber) - Number(a.CardNumber),
      );
    }
  };

  const onSearch = useCallback((value: GoddessStory) => {
    const filter = {...value};
    Object.keys(filter).forEach((key) => {
      if (!filter[key]) {
        delete filter[key];
      }
    });
    const filteredData = data.filter((item) => {
      for (const key in filter) {
        if (filter[key]) {
          if (key === 'CharacterName') {
            if (!item[key].toLowerCase().includes(filter[key].toLowerCase()))
              return false;
          } else if (item[key] != filter[key]) return false;
        }
      }
      return true;
    });
    setGalleryData(sortData(filteredData, 'asc'));
  }, []);

  const [galleryData, setGalleryData] = useState<GoddessStory[]>(
    sortData(data, 'asc'),
  );
  return (
    <>
      <Header navigation={navigation}>
        <FilterBar onSearch={onSearch} />
      </Header>

      <Gallery data={galleryData} />
    </>
  );
};

export default SetList;
