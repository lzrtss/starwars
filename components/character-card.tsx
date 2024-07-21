import Image from 'next/image';

interface CharacterCardProps {
  name: string;
  image: string;
}

export default function CharacterCard({ name, image }: CharacterCardProps) {
  console.log(image);
  return (
    <article className="relative h-[412px] w-[300px] md:h-[302px] md:w-[220px] mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-900 bg-neutral-800 text-white hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-300 ease-in-out group">
      <Image
        role="character-image"
        alt={name}
        src={image}
        height={302}
        width={220}
        priority
        className="w-full h-full object-cover"
      />
      <h3 className="absolute bottom-0 left-0 right-0 px-2 py-3 text-center text-xl font-bold bg-black/90 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        {name}
      </h3>
    </article>
  );
}
