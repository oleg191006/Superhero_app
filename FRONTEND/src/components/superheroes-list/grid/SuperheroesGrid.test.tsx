import { render, screen, fireEvent } from "@testing-library/react";
import SuperheroesGrid from "./SuperheroesGrid";

import "@testing-library/jest-dom";
import type { Superhero } from "@app-types/superhero/superhero.interface";

jest.mock("../../superhero-card/SuperheroCard.tsx", () => ({
  __esModule: true,
  default: ({
    hero,
    onDelete,
  }: {
    hero: Superhero;
    onDelete: (id: string) => void;
  }) => (
    <div data-testid={`superhero-card-${hero.id}`}>
      <span>{hero.nickname}</span>
      <button onClick={() => onDelete(hero.id)}>Mock Delete</button>
    </div>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

const mockHeroes: Superhero[] = [
  {
    id: "1",
    nickname: "Testman",
    real_name: "John Doe",
    origin_description: "A test superhero",
    superpowers: "Testing, debugging",
    catch_phrase: "I am the best",
    images: [],
  },
  {
    id: "2",
    nickname: "Mockwoman",
    real_name: "Jane Doe",
    origin_description: "A mock superhero",
    superpowers: "Mocking, testing",
    catch_phrase: "I am a mock",
    images: [],
  },
];

describe("SuperheroesGrid", () => {
  it("should render a grid of SuperheroCard components when heroes are provided", () => {
    const onDeleteMock = jest.fn();
    render(<SuperheroesGrid heroes={mockHeroes} onDeleteHero={onDeleteMock} />);

    expect(screen.getByText("Testman")).toBeInTheDocument();
    expect(screen.getByText("Mockwoman")).toBeInTheDocument();

    const cards = screen.getAllByTestId(/superhero-card/i);
    expect(cards).toHaveLength(mockHeroes.length);
  });

  it("should call onDeleteHero with the correct ID when a card's delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    render(<SuperheroesGrid heroes={mockHeroes} onDeleteHero={onDeleteMock} />);

    const deleteButtons = screen.getAllByRole("button", {
      name: /mock delete/i,
    });

    fireEvent.click(deleteButtons[0]);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });

  it("should render a 'No superheroes found' message when the heroes array is empty", () => {
    const onDeleteMock = jest.fn();
    render(<SuperheroesGrid heroes={[]} onDeleteHero={onDeleteMock} />);

    const noHeroesMessage = screen.getByText("No superheroes found.");
    expect(noHeroesMessage).toBeInTheDocument();
  });
});
