import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import SuperheroInfo from "./SuperheroInfo";

const mockSuperhero: Superhero = {
  id: "1",
  nickname: "The Flash",
  real_name: "Barry Allen",
  origin_description: "A forensic scientist with super speed.",
  superpowers: "Superhuman speed, accelerated healing",
  catch_phrase: "My name is Barry Allen, and I am the fastest man alive.",
  images: [
    { id: "img-1", url: "https://example.com/flash.jpg", superheroId: "1" },
  ],
};

describe("SuperheroInfo", () => {
  it("should render superhero information correctly when an image is present", () => {
    render(<SuperheroInfo hero={mockSuperhero} onEdit={jest.fn()} />);

    expect(
      screen.getByRole("heading", { name: /the flash/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Barry Allen")).toBeInTheDocument();
    expect(
      screen.getByText("A forensic scientist with super speed.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Superhuman speed, accelerated healing")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '"My name is Barry Allen, and I am the fastest man alive."'
      )
    ).toBeInTheDocument();

    const image = screen.getByRole("img", { name: "The Flash" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockSuperhero.images[0].url);
  });

  it("should render a placeholder when no image is available", () => {
    const heroWithoutImage = { ...mockSuperhero, images: [] };
    render(<SuperheroInfo hero={heroWithoutImage} onEdit={jest.fn()} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    expect(screen.getByText("No main image available")).toBeInTheDocument();
  });

  it("should call the onEdit handler when the Edit button is clicked", () => {
    const mockOnEdit = jest.fn();
    render(<SuperheroInfo hero={mockSuperhero} onEdit={mockOnEdit} />);

    const editButton = screen.getByRole("button", { name: /edit superhero/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });
});
