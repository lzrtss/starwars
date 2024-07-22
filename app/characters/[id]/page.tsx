import { Metadata } from 'next';

import GoBackButton from '@/components/go-back-button';
import CharacterBio from '@/components/character-bio';
import CharacterGraph from '@/components/character-graph';
import Container from '@/components/container';
import {
  getCharacterById,
  getFilmsByCharacter,
  getStarshipsByCharacter,
} from '@/services/api';
import { createGraph } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const character = await getCharacterById(id);

  return {
    title: `Star Wars | ${character.name}`,
    description: `Discover all about ${character.name} from the Star Wars universe: biography, list of films, and starships. Explore the complete story of the character in the Star Wars app!`,
  };
}

export default async function Page({ params: { id } }: PageProps) {
  const character = await getCharacterById(id);
  const films = await getFilmsByCharacter(id);
  const starships = await getStarshipsByCharacter(id);

  const { initialNodes, initialEdges } = createGraph(
    character,
    films,
    starships,
  );

  return (
    <>
      <header>
        <Container>
          <GoBackButton />
        </Container>
      </header>

      <main>
        <Container className="flex flex-col gap-16">
          <CharacterBio character={character} />
          <div className="w-full h-[1px] bg-neutral-800" />
          <CharacterGraph
            initialEdges={initialEdges}
            initialNodes={initialNodes}
          />
        </Container>
      </main>
    </>
  );
}
