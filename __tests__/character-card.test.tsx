import { render, screen } from '@testing-library/react';

import CharacterCard from '@/components/character-card';

// Mock environment variable
process.env.NEXT_PUBLIC_API_CHARACTER_IMAGE_URL = 'https://example.com/images';

describe('CharacterCard', () => {
  const name = 'Obi-Wan Kenobi';
  const imageSrc = `${process.env.NEXT_PUBLIC_API_CHARACTER_IMAGE_URL}/10.jpg`;

  it('renders correctly with given name and image', () => {
    render(<CharacterCard name={name} image={imageSrc} />);

    const imageElement = screen.getByRole('character-image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', name);

    const nameElement = screen.getByText(name);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveClass('text-xl font-bold');
  });
});
