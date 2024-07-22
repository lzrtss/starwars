import { Metadata } from 'next';

import CharacterList from '@/components/character-list';
import Container from '@/components/container';
import Hero from '@/components/hero';
import Pagination from '@/components/pagination';
import SearchBar from '@/components/search-bar';
import { getCharacters } from '@/services/api';
import { PAGINATION, SEARCH, TITLES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Star Wars | Meet All Characters',
  description:
    'Explore the complete list of Star Wars heroes. Get detailed profiles of characters from the beloved saga. Dive into the Star Wars universe!',
};

interface HomeProps {
  searchParams: { page: string; search: string };
}

export default async function Home({
  searchParams: { page, search },
}: HomeProps) {
  const data = await getCharacters(page, search);
  const { count, results: characters } = data;

  const totalPages = Math.ceil(count / PAGINATION.LIMIT_PER_PAGE);
  const showHero = !search && !page;

  return (
    <>
      <main>
        <Container>
          <SearchBar className="w-full mt-5 mb-10" />

          {showHero ? <Hero className="mb-5" /> : null}

          <section className="mb-5">
            <div className="mb-10">
              <h1 className="text-2xl font-bold">
                {search ? SEARCH.RESULTS : TITLES.HOME}
              </h1>
            </div>

            {characters?.length ? (
              <CharacterList characters={characters} />
            ) : (
              <p className="text-medium">{SEARCH.NO_RESULTS}</p>
            )}
          </section>
        </Container>
      </main>

      {characters?.length ? (
        <Pagination currentPage={page} totalPages={totalPages} />
      ) : null}
    </>
  );
}
