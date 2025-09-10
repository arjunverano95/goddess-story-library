import axios, {AxiosResponse} from 'axios';

import {API_BASE_URL, CARD_LISTING} from '../constants';

// API client for direct API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const responseBody = (response: AxiosResponse) => response.data;

// API interfaces
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
  // Cards endpoints - direct API calls only
  getCards: async (
    collection: string,
    filters: CardFilters = {},
  ): Promise<CardsResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    const url = `/${collection}/cards${queryString ? `?${queryString}` : ''}`;

    const response = (await apiClient
      .get(url)
      .then(responseBody)) as CardsResponse;

    return response;
  },

  // Series endpoints - direct API calls only
  getSeries: async (collection: string): Promise<string[]> => {
    const data = await apiClient
      .get(`/${collection}/series`)
      .then(responseBody);

    const series = Array.isArray(data) ? data.map((item) => item.name) : [];
    return series;
  },

  // Rarity endpoints - direct API calls only
  getRarities: async (collection: string): Promise<string[]> => {
    const data = await apiClient
      .get(`/${collection}/rarity`)
      .then(responseBody);

    const rarities = Array.isArray(data) ? data.map((item) => item.name) : [];
    return rarities;
  },

  // Set endpoints - direct API calls only
  getSets: async (collection: string): Promise<string[]> => {
    const data = await apiClient.get(`/${collection}/set`).then(responseBody);

    const sets = Array.isArray(data) ? data.map((item) => item.name) : [];
    return sets;
  },

  // Collection identifiers
  listings: CARD_LISTING,
};
