import axios from './axios-instance';
import { ICharactersResponse } from '@/types/characters.interface';
import { ERROR_MESSAGES, SEARCH_PARAMS } from '@/lib/constants';

export async function getCharacters(
  page: string = '1',
  search?: string,
): Promise<ICharactersResponse> {
  const params = new URLSearchParams();

  if (page.trim()) {
    params.append(SEARCH_PARAMS.PAGE, page);
  }

  if (search?.trim()) {
    params.append(SEARCH_PARAMS.SEARCH, search);
  }

  try {
    const response = await axios.get('/people', { params });
    return response.data;
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_CHARACTERS_FAIL, error);
    throw error;
  }
}
