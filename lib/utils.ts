import { Edge, Node } from '@xyflow/react';

import { ICharacter } from '@/types/characters.interface';
import { IFilm } from '@/types/films.interface';
import { IStarship } from '@/types/starships.interface';
import { SEARCH_PARAMS } from '@/lib/constants';

export function updateSearchParams({
  searchParams,
  key,
  value,
}: {
  searchParams: URLSearchParams;
  key: string;
  value: string | null;
}): string {
  const params = new URLSearchParams(searchParams);

  if (key === SEARCH_PARAMS.SEARCH) {
    params.delete(SEARCH_PARAMS.PAGE);
  }
  if (key === SEARCH_PARAMS.PAGE && value === '1') {
    params.delete(SEARCH_PARAMS.PAGE);
  } else if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  return `?${params.toString()}`;
}

export function createGraph(
  character: ICharacter,
  films: IFilm[],
  starships: IStarship[],
): { initialNodes: Node[]; initialEdges: Edge[] } {
  const offset = 200;

  const characterNode = createCharacterNode(
    character.name,
    films.length,
    offset,
  );
  const characterFilmsNodes = createFilmNodes(films, offset);
  const starshipsNodes = createStarshipNodes(starships, offset);
  const filmsEdges = createCharacterFilmEdges(character.name, films);
  const starshipEdges = createFilmStarshipEdges(films, starships);

  const initialNodes = [
    characterNode,
    ...characterFilmsNodes,
    ...starshipsNodes,
  ];

  const initialEdges = [...filmsEdges, ...starshipEdges];

  return { initialNodes, initialEdges };
}

export function createCharacterNode(
  name: string,
  totalFilmNodes: number,
  offset: number,
): Node {
  const nodeWidth = 156;

  return {
    id: name,
    data: { label: name },
    position: { x: (totalFilmNodes * offset) / 2 - nodeWidth / 2, y: 0 }, // centered horizontally
  };
}

export function createFilmNodes(films: IFilm[], offset: number): Node[] {
  return films.map((film, index) => ({
    id: film.title,
    data: { label: film.title },
    position: { x: index * offset, y: offset },
  }));
}

export function createStarshipNodes(
  starships: IStarship[],
  offset: number,
): Node[] {
  return starships.map((starship, index) => ({
    id: starship.name,
    data: { label: starship.name },
    position: { x: index * offset, y: offset * 2 },
  }));
}

export function createCharacterFilmEdges(
  characterName: string,
  films: IFilm[],
): Edge[] {
  return films.map((film) => ({
    id: `${characterName}-${film.title}`,
    source: characterName,
    target: film.title,
  }));
}

export function createFilmStarshipEdges(
  films: IFilm[],
  starships: IStarship[],
): Edge[] {
  const starshipMap = new Map<number, IStarship>();

  starships.forEach((starship) => {
    starshipMap.set(starship.id, starship);
  });

  const edges: Edge[] = [];

  films.forEach((film) => {
    film.starships.forEach((starshipId) => {
      const starship = starshipMap.get(starshipId);
      if (starship) {
        edges.push({
          id: `${film.title}-${starship.name}`,
          source: film.title,
          target: starship.name,
        });
      }
    });
  });

  return edges;
}
