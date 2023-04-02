import React, {useState} from 'react';

import {useGSL} from '../app/hooks/useGSL';
import {ScreenProps} from '../app/navigation/types';
import Header from '../components/Header';
import {FilterBar, Gallery} from '../components/SetList';
import {GSLCard} from '../models/GSLCard';

const SenpaiGoddessHaven = (props: ScreenProps<'SenpaiGoddessHaven'>) => {
  const {navigation} = props;
  const {data, setNumbers, rarities, series} = useGSL(
    '/data/senpai-goddess-haven.json',
  );

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
          title={'Senpai Goddess Haven'}
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

export default SenpaiGoddessHaven;
