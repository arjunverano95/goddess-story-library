import React, {useState} from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';

import {useGSL} from '../hooks/useGSL';
import {GSLCard} from '../models/GSLCard';
import Header from './Header';
import {FilterBar, Gallery} from './SetList';
import WebFooter from './WebFooter';

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
    <Animated.View style={{flex: 1}} entering={FadeIn.duration(800).delay(200)}>
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
      <WebFooter />
    </Animated.View>
  );
};

export default BaseScreen;
