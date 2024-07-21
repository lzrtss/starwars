import axios from '@/services/axios-instance';
import { getCharacters } from '@/services/api';
import { mockCharactersResponse } from '@/__mocks__/characters.mock';
import { ERROR_MESSAGES } from '@/lib/constants';

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
