import useSWR from 'swr';

import {GSLCard} from '../../models/GSLCard';
import {api} from '../services';

export const useGSL = () => {
  const {data, isLoading} = useSWR<{
    cards: GSLCard[];
    set_no: string[];
    rarity: string[];
    series: string[];
  }>('/data/goddess-story.json', api.get);

  return {
    isLoading,
    data: data?.cards,
    setNumbers: data?.set_no,
    rarities: data?.rarity,
    series: data?.series,
  };
};
