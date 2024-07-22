import { render, screen } from '@testing-library/react';

import CharacterList from '@/components/character-list';
import { mockCharacters } from '@/__mocks__/characters.mock';

// Mock environment variable
process.env.NEXT_PUBLIC_API_CHARACTER_IMAGE_URL = 'https://example.com/images';

jest.mock(
  '@/components/motion-opacity',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div>{children}</div>,
);

describe('CharacterList', () => {
  it('renders a list of characters', () => {
    render(<CharacterList characters={mockCharacters} />);

    mockCharacters.forEach((character) => {
      const characterElement = screen.getByText(character.name);
      expect(characterElement).toBeInTheDocument();
    });
  });

  it('renders links with correct "href" attributes', () => {
    render(<CharacterList characters={mockCharacters} />);

    const linkElements = screen.getAllByRole('character-link');

    linkElements.forEach((linkElement, index) => {
      expect(linkElement).toHaveAttribute(
        'href',
        `/characters/${mockCharacters[index].id}`,
      );
    });
  });
});
