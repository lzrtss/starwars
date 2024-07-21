import Image from 'next/image';

import { ICharacter } from '@/types/characters.interface';
import { CHARACTER_DETAILS } from '@/lib/constants';

interface CharacterBioProps {
  character: ICharacter;
}

type CharacterDetailsKeys = keyof typeof CHARACTER_DETAILS;

export default function CharacterBio({ character }: CharacterBioProps) {
  return (
    <section className="flex flex-col items-center md:flex-row gap-10 md:gap-12">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_CHARACTER_IMAGE_URL}/${character.id}.jpg`}
          alt={character.name}
          width={255}
          height={350}
          priority
          className="w-[255px] h-[350px]"
        />
      </div>

      <div>
        <h1 className="mb-4 text-3xl font-bold">{character.name}</h1>

        <ul className="flex flex-col gap-3">
          {Object.keys(CHARACTER_DETAILS).map((key) => (
            <li key={key} className="flex gap-2 text-lg">
              <span className="text-neutral-400">
                {CHARACTER_DETAILS[key as CharacterDetailsKeys]}:
              </span>
              <span className="text-white">
                {character[key as CharacterDetailsKeys]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
