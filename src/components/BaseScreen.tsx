import React, {useState} from 'react';

import {useGSL} from '../app/hooks/useGSL';
import Header from './Header';
import {FilterBar, Gallery} from './SetList';
import {GSLCard} from '../models/GSLCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseScreen = (props: {navigation: any; dataUrl: string}) => {
  const {navigation, dataUrl} = props;
  const {data, setNumbers, rarities, series} = useGSL(dataUrl);

  const [filter, setFilterData] = useState<GSLCard>({
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
  const onFilter = (value: GSLCard) => {
    setFilterData(value);
  };

  return (
    <>
      <Header navigation={navigation}>
        <FilterBar
          title={'Goddess Story'}
          sort={sort}
          filter={filter}
          formData={{setNumbers, rarities, series}}
          onFilter={onFilter}
          onSort={(value) => {
            setSortValue(value);
          }}
        />
      </Header>

      <Gallery data={data} filter={filter} sort={sort} />
    </>
  );
};

export default BaseScreen;
