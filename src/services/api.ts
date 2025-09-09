import axios, {AxiosResponse} from 'axios';

import {API_BASE_URL, CARD_LISTING} from '../constants';

// New API for dynamic data
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const responseBody = (response: AxiosResponse) => response.data;

// New API methods for card collections
export interface CardFilters {
  page?: number;
  limit?: number;
  q?: string;
  series?: string;
  rarity?: string;
  set_number?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiCard {
  id: number;
  card_id: string;
  code: string;
  character_name: string;
  series_name: string;
  rarity: string;
  image_url: string;
  has_image: string;
  set_number: string;
  card_number: string;
  created_at: string;
  updated_at: string;
}

export interface CardsResponse {
  data: ApiCard[];
  pagination: PaginationInfo;
}

export const api = {
  // Cards endpoints
  getCards: (collection: string, filters: CardFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    const url = `/${collection}/cards${queryString ? `?${queryString}` : ''}`;
    return apiClient.get(url).then(responseBody) as Promise<CardsResponse>;
  },

  // Series endpoints
  getSeries: (collection: string) =>
    apiClient
      .get(`/${collection}/series`)
      .then(responseBody)
      .then((data) =>
        Array.isArray(data) ? data.map((item) => item.name) : [],
      ) as Promise<string[]>,

  // Rarity endpoints
  getRarities: (collection: string) =>
    apiClient
      .get(`/${collection}/rarity`)
      .then(responseBody)
      .then((data) =>
        Array.isArray(data) ? data.map((item) => item.name) : [],
      ) as Promise<string[]>,

  // Set endpoints
  getSets: (collection: string) =>
    apiClient
      .get(`/${collection}/set`)
      .then(responseBody)
      .then((data) =>
        Array.isArray(data) ? data.map((item) => item.name) : [],
      ) as Promise<string[]>,

  // Collection identifiers
  listings: CARD_LISTING,
};
