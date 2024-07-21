import Link from 'next/link';

import CharacterCard from '@/components/character-card';
// import MotionOpacity from '@/components/motion-opacity';
import { ICharacter } from '@/types/characters.interface';
import MotionOpacity from './motion-opacity';

interface CharacterListProps {
  characters: ICharacter[];
}

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {characters?.map((character, index) => (
        <li key={character.id}>
          <Link href={`/characters/${character.id}`} role="character-link">
            <MotionOpacity delay={index * 0.1}>
              <CharacterCard
                name={character.name}
                image={`${process.env.NEXT_PUBLIC_API_CHARACTER_IMAGE_URL}/${character.id}.jpg`}
              />
            </MotionOpacity>
          </Link>
        </li>
      ))}
    </ul>
  );
}
