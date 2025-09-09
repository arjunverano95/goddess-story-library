import {GSLCard} from '../models/GSLCard';
import {ApiCard} from '../services/api';

/**
 * Converts API card format to GSLCard format for compatibility
 */
export const mapApiCardToGSLCard = (apiCard: ApiCard): GSLCard => ({
  ID: apiCard.card_id || '',
  Code: apiCard.code || '',
  SetNumber: apiCard.set_number || '',
  CardNumber: apiCard.card_number || '',
  CharacterName: apiCard.character_name || '',
  SeriesName: apiCard.series_name || '',
  Rarity: apiCard.rarity || '',
  ImageUrl: apiCard.image_url || '',
  HasImage: apiCard.has_image || '',
});

/**
 * Converts array of API cards to GSLCard format
 */
export const mapApiCardsToGSLCards = (apiCards: ApiCard[]): GSLCard[] =>
  apiCards.map(mapApiCardToGSLCard);
