import axios from './axios-instance';
import { ICharacter, ICharactersResponse } from '@/types/characters.interface';
import { IStarship } from '@/types/starships.interface';
import { IFilm } from '@/types/films.interface';
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

export async function getCharacterById(id: string): Promise<ICharacter> {
  try {
    const response = await axios.get(`/people/${id}`);
    return response.data;
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_CHARACTER_FAIL, error);
    throw error;
  }
}

export async function getFilmsByCharacter(id: string): Promise<IFilm[]> {
  try {
    const response = await axios.get(`/films`, { params: { characters: id } });
    return response.data.results;
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_FILMS_FAIL, error);
    throw error;
  }
}

export async function getStarshipsByCharacter(
  id: string,
): Promise<IStarship[]> {
  try {
    const response = await axios.get(`/starships`, { params: { pilots: id } });
    return response.data.results;
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_STARSHIPS_FAIL, error);
    throw error;
  }
}

