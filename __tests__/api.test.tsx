import axios from '@/services/axios-instance';
import {
  getCharacterById,
  getCharacters,
  getFilmsByCharacter,
  getStarshipsByCharacter,
} from '@/services/api';
import { ERROR_MESSAGES } from '@/lib/constants';
import {
  mockCharacter,
  mockCharactersResponse,
} from '@/__mocks__/characters.mock';
import { mockFilmsByCharacter } from '@/__mocks__/films.mock';
import { mockStarshipsByCharacter } from '@/__mocks__/starships.mock';

jest.mock('@/services/axios-instance');

describe('getCharacters', () => {
  it('fetches characters successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockCharactersResponse,
    });

    const result = await getCharacters();

    expect(result).toEqual(mockCharactersResponse);
    expect(axios.get).toHaveBeenCalledWith('/people', {
      params: new URLSearchParams('page=1'),
    });
  });

  it('fetches characters with search query', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockCharactersResponse,
    });

    const searchQuery = 'Obi-Wan';
    const result = await getCharacters('1', searchQuery);

    expect(result).toEqual(mockCharactersResponse);
    expect(axios.get).toHaveBeenCalledWith('/people', {
      params: new URLSearchParams(`page=1&search=${searchQuery}`),
    });
  });

  it('throws an error when the request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error(ERROR_MESSAGES.FETCH_CHARACTERS_FAIL),
    );

    await expect(getCharacters()).rejects.toThrow(
      ERROR_MESSAGES.FETCH_CHARACTERS_FAIL,
    );
    expect(axios.get).toHaveBeenCalledWith('/people', {
      params: new URLSearchParams('page=1'),
    });
  });
});

describe('getCharacterById', () => {
  it('fetches a character successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockCharacter,
    });

    const result = await getCharacterById('10');

    expect(result).toEqual(mockCharacter);
    expect(axios.get).toHaveBeenCalledWith('/people/10');
  });

  it('throws an error when the request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error(ERROR_MESSAGES.FETCH_CHARACTER_FAIL),
    );

    await expect(getCharacterById('10')).rejects.toThrow(
      ERROR_MESSAGES.FETCH_CHARACTER_FAIL,
    );
    expect(axios.get).toHaveBeenCalledWith('/people/10');
  });
});

describe('getFilmsByCharacter', () => {
  const characterId = '10';

  it('fetches films successfully for a given character', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { results: mockFilmsByCharacter },
    });

    const result = await getFilmsByCharacter(characterId);

    expect(result).toEqual(mockFilmsByCharacter);
    expect(axios.get).toHaveBeenCalledWith('/films', {
      params: { characters: characterId },
    });
  });

  it('throws an error when the request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error(ERROR_MESSAGES.FETCH_FILMS_FAIL),
    );

    await expect(getFilmsByCharacter(characterId)).rejects.toThrow(
      ERROR_MESSAGES.FETCH_FILMS_FAIL,
    );
    expect(axios.get).toHaveBeenCalledWith('/films', {
      params: { characters: characterId },
    });
  });
});

describe('getStarshipsByCharacter', () => {
  const characterId = '10';

  it('fetches starships successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { results: mockStarshipsByCharacter },
    });

    const result = await getStarshipsByCharacter(characterId);

    expect(result).toEqual(mockStarshipsByCharacter);
    expect(axios.get).toHaveBeenCalledWith('/starships', {
      params: { pilots: characterId },
    });
  });

  it('throws an error when the request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error(ERROR_MESSAGES.FETCH_STARSHIPS_FAIL),
    );

    await expect(getStarshipsByCharacter(characterId)).rejects.toThrow(
      ERROR_MESSAGES.FETCH_STARSHIPS_FAIL,
    );
    expect(axios.get).toHaveBeenCalledWith('/starships', {
      params: { pilots: characterId },
    });
  });
});
