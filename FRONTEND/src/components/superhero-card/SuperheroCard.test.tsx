import { render, screen, fireEvent } from "@testing-library/react";
import SuperheroCard from "./SuperheroCard";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const mockSuperhero: Superhero = {
  id: "1",
  nickname: "Testman",
  real_name: "John Doe",
  origin_description: "A test superhero",
  superpowers: "Testing, debugging",
  catch_phrase: "I am the best",
  images: [
    { id: "img-1", url: "https://test.com/image.jpg", superheroId: "1" },
  ],
};

describe("SuperheroCard", () => {
  it("should render superhero nickname and image", () => {
    render(<SuperheroCard hero={mockSuperhero} />);

    expect(screen.getByText(mockSuperhero.nickname)).toBeInTheDocument();

    const image = screen.getByRole("img", { name: mockSuperhero.nickname });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockSuperhero.images[0].url);
  });

  it("should link to the correct details page", () => {
    render(<SuperheroCard hero={mockSuperhero} />);

    const detailsButton = screen.getByRole("link", { name: /details/i });
    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveAttribute(
      "href",
      `/heroes/${mockSuperhero.id}`
    );
  });

  it("should render the delete button when onDelete is provided", () => {
    const handleDelete = jest.fn();
    render(<SuperheroCard hero={mockSuperhero} onDelete={handleDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not render the delete button when onDelete is not provided", () => {
    render(<SuperheroCard hero={mockSuperhero} />);

    const deleteButton = screen.queryByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
  });

  it("should call the onDelete handler when the delete button is clicked", () => {
    const handleDelete = jest.fn();
    render(<SuperheroCard hero={mockSuperhero} onDelete={handleDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockSuperhero.id);
  });
});
