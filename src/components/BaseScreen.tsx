import React, {useState} from 'react';

import {useGSL} from '../hooks/useGSL';
import Header from './Header';
import {FilterBar, Gallery} from './SetList';
import {GSLCard} from '../models/GSLCard';

interface BaseScreenProps {
  dataUrl: string;
  title: string;
}

const BaseScreen = (props: BaseScreenProps) => {
  const {dataUrl, title} = props;
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
      <Header>
        <FilterBar
          title={title}
          sort={sort}
          filter={filter}
          formData={{
            setNumbers: setNumbers || [],
            rarities: rarities || [],
            series: series || [],
          }}
          onFilter={onFilter}
          onSort={(value) => {
            setSortValue(value);
          }}
        />
      </Header>

      <Gallery data={data || []} filter={filter} sort={sort} />
    </>
  );
};

export default BaseScreen;
