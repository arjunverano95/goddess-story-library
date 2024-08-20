// https://lh3.googleusercontent.com/d/1nHNpNAjifPtSG7xF8e1zA01KrJJY7w9f

import useSWR from 'swr';

import {GSLCard} from '../../models/GSLCard';
import {api} from '../services';

export const useGSL = (url: string) => {
  const {data, isLoading} = useSWR<{
    cards: GSLCard[];
    set_no: string[];
    rarity: string[];
    series: string[];
  }>(url, api.get);

  return {
    isLoading,
    data: data?.cards,
    setNumbers: data?.set_no,
    rarities: data?.rarity,
    series: data?.series,
  };
};
