import React, {useMemo, useState} from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';

import {useCards, useRarities, useSeries, useSets} from '../hooks';
import {GSLCard} from '../models/GSLCard';
import {CardFilters} from '../services/api';
import Header from './Header';
import {FilterBar, Gallery} from './SetList';
import WebFooter from './WebFooter';

interface BaseScreenProps {
  collection: string;
  title: string;
}

const BaseScreen = (props: BaseScreenProps) => {
  const {collection, title} = props;

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
  const [page, setPage] = useState(1);
  const [limit] = useState(50); // Default page size

  // Convert GSLCard filter to API filters
  const apiFilters: CardFilters = useMemo(() => {
    const filters: CardFilters = {
      page,
      limit,
      order: sort,
    };

    if (filter.CharacterName) filters.q = filter.CharacterName;
    if (filter.SeriesName) filters.series = filter.SeriesName;
    if (filter.Rarity) filters.rarity = filter.Rarity;
    if (filter.SetNumber) filters.set_number = filter.SetNumber;

    return filters;
  }, [filter, page, limit, sort]);

  const {data, isLoading, pagination, loadMore, hasMorePages} = useCards({
    collection,
    filters: apiFilters,
    enableInfiniteScroll: true,
  });
  const {setNumbers} = useSets(collection);
  const {rarities} = useRarities(collection);
  const {series} = useSeries(collection);

  const onFilter = (value: GSLCard) => {
    setFilterData(value);
    setPage(1); // Reset to first page when filtering
  };

  const onSort = (value: 'asc' | 'desc') => {
    setSortValue(value);
    setPage(1); // Reset to first page when sorting
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
          onSort={onSort}
        />
      </Header>

      <Gallery
        data={data || []}
        filter={filter}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        loadMore={loadMore}
        hasMorePages={hasMorePages}
        enableVirtualization={true}
        enableAnimations={true}
        cardAspectRatio={1}
      />
      <WebFooter />
    </Animated.View>
  );
};

export default BaseScreen;
