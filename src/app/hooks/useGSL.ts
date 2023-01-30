import useSWR from 'swr';

import {GoddessStory} from '../../models/GoddessStory';
import {api} from '../services';

export const useGSL = () => {
  const {data, isLoading} = useSWR<{
    goddess_story: GoddessStory[];
    set_no: string[];
    rarity: string[];
    series: string[];
  }>('/data/gsl.json', api.get);

  return {
    isLoading,
    data: data?.goddess_story,
    setNumbers: data?.set_no,
    rarities: data?.rarity,
    series: data?.series,
  };
};
