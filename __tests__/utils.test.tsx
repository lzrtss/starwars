import {
  createCharacterFilmEdges,
  createCharacterNode,
  createFilmNodes,
  createFilmStarshipEdges,
  createGraph,
  createStarshipNodes,
  updateSearchParams,
} from '@/lib/utils';
import { SEARCH_PARAMS } from '@/lib/constants';
import { mockFilms, mockFilmsByCharacter } from '@/__mocks__/films.mock';
import {
  mockStarships,
  mockStarshipsByCharacter,
} from '@/__mocks__/starships.mock';
import { mockCharacter } from '@/__mocks__/characters.mock';
import { Edge } from '@xyflow/react';
import { IStarship } from '@/types/starships.interface';
import { expectedEdges } from '@/__mocks__/graph.mock';

describe('updateSearchParams', () => {
  it('should delete the page param if search param is updated', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.SEARCH,
      value: 'Darth Vader',
    });

    expect(result).toBe('?search=Darth+Vader');
  });

  it('should delete the page param if page is set to 1', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: '1',
    });

    expect(result).toBe('?search=Luke');
  });

  it('should set the param if value is provided', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: '3',
    });

    expect(result).toBe('?page=3&search=Luke');
  });

  it('should delete the param if value is null', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: null,
    });

    expect(result).toBe('?search=Luke');
  });

  it('should delete the param if value is empty string', () => {
    const searchParams = new URLSearchParams('?page=2&search=Luke');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.PAGE,
      value: '',
    });

    expect(result).toBe('?search=Luke');
  });

  it('should handle no initial params correctly', () => {
    const searchParams = new URLSearchParams('');
    const result = updateSearchParams({
      searchParams,
      key: SEARCH_PARAMS.SEARCH,
      value: 'Darth Vader',
    });

    expect(result).toBe('?search=Darth+Vader');
  });
});

describe('createCharacterNode', () => {
  it('creates a node with the correct properties', () => {
    const name = 'Obi-Wan Kenobi';
    const totalFilmNodes = 5;
    const offset = 200;

    const expectedPositionX = (totalFilmNodes * offset) / 2 - 156 / 2;
    const expectedNode = {
      id: name,
      data: { label: name },
      position: { x: expectedPositionX, y: 0 },
    };

    const node = createCharacterNode(name, totalFilmNodes, offset);

    expect(node).toEqual(expectedNode);
  });
});

describe('createFilmNodes', () => {
  it('creates an array of film nodes with correct properties', () => {
    const offset = 100;
    const expectedNodes = mockFilms.map((film, index) => ({
      id: film.title,
      data: { label: film.title },
      position: { x: index * offset, y: offset },
    }));

    const nodes = createFilmNodes(mockFilms, offset);

    expect(nodes).toEqual(expectedNodes);
  });
});

describe('createStarshipNodes', () => {
  it('creates an array of starship nodes with correct properties', () => {
    const offset = 100;
    const expectedNodes = mockStarships.map((starship, index) => ({
      id: starship.name,
      data: { label: starship.name },
      position: { x: index * offset, y: offset * 2 },
    }));

    const nodes = createStarshipNodes(mockStarships, offset);

    expect(nodes).toEqual(expectedNodes);
  });
});

describe('createCharacterFilmEdges', () => {
  it('creates edges with correct properties', () => {
    const characterName = 'Luke Skywalker';
    const expectedEdges = mockFilms.map((film) => ({
      id: `${characterName}-${film.title}`,
      source: characterName,
      target: film.title,
    }));

    const edges = createCharacterFilmEdges(characterName, mockFilms);

    expect(edges).toEqual(expectedEdges);
  });

  it('creates edges correctly when only one film is provided', () => {
    const characterName = 'Obi-Wan Kenobi';
    const singleFilm = [mockFilms[0]];
    const expectedEdge = {
      id: `${characterName}-${singleFilm[0].title}`,
      source: characterName,
      target: singleFilm[0].title,
    };

    const edges = createCharacterFilmEdges(characterName, singleFilm);

    expect(edges).toEqual([expectedEdge]);
  });
});

describe('createFilmStarshipEdges', () => {
  it('creates edges with correct properties', () => {
    const edges = createFilmStarshipEdges(
      mockFilmsByCharacter,
      mockStarshipsByCharacter,
    );

    expect(edges).toEqual(expectedEdges);
  });
});
