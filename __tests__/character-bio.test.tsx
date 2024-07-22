import { render, screen } from '@testing-library/react';

import CharacterBio from '@/components/character-bio';
import { ICharacter } from '@/types/characters.interface';

// Mock the Image component from next/image
jest.mock('next/image', () => (props: any) => <img {...props} />);

describe('CharacterBio', () => {
  const mockCharacter = {
    id: 10,
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    hair_color: 'auburn, white',
    skin_color: 'fair',
    eye_color: 'blue-gray',
    birth_year: '57BBY',
    gender: 'male',
  };

  it('renders the character image correctly', () => {
    render(<CharacterBio character={mockCharacter as ICharacter} />);

    const image = screen.getByAltText(mockCharacter.name);
    expect(image).toHaveAttribute(
      'src',
      `${process.env.NEXT_PUBLIC_API_CHARACTER_IMAGE_URL}/${mockCharacter.id}.jpg`,
    );
    expect(image).toHaveAttribute('alt', mockCharacter.name);
    expect(image).toHaveAttribute('width', '255');
    expect(image).toHaveAttribute('height', '350');
  });

  it('renders the character name correctly', () => {
    render(<CharacterBio character={mockCharacter as ICharacter} />);

    const name = screen.getByText(mockCharacter.name);
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass('text-3xl');
    expect(name).toHaveClass('font-bold');
  });
});
